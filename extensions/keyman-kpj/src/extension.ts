// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from 'node:path';
import { existsSync } from 'node:fs';
import * as vscode from 'vscode';

let kpjPromise: Thenable<vscode.Task[]> | undefined = undefined;

interface KpjTaskDefinition extends vscode.TaskDefinition {
	// empty for now
}

async function getKpjTasks(): Promise<vscode.Task[]> {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	const result: vscode.Task[] = [];
	if (!workspaceFolders || workspaceFolders.length === 0) {
		return result;
	}
	for (const workspaceFolder of workspaceFolders) {
		const folderString = workspaceFolder.uri.fsPath;
		if (!folderString) {
			console.log(`Not folstr`);
			continue;
		}
		const dir = path.basename(folderString);
		const kpjFile = path.join(folderString, `${dir}.kpj`);
		if (!existsSync(kpjFile)) {
			console.log(`Not exist ${kpjFile}`);
			continue;
		} else {
			console.log(`=> ${kpjFile}`);
		}
		const task = new vscode.Task({type: 'kpj'}, workspaceFolder, dir, 'kpj',
				new vscode.ShellExecution(`npx -y @keymanapp/kmc build file ${kpjFile}`));
		task.group = vscode.TaskGroup.Build;
		console.dir({task});
		result.push(task);
	}
	return result;
}
let kpjTaskProvider : vscode.Disposable | undefined;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let NEXT_TERM_ID = 1;

	// console.log("Terminals: " + (<any>vscode.window).terminals.length);

	// vscode.window.onDidOpenTerminal(terminal => {
	// 	console.log("Terminal opened. Total count: " + (<any>vscode.window).terminals.length);
	// });
	// vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
	// 	vscode.window.showInformationMessage(`onDidOpenTerminal, name: ${terminal.name}`);
	// });

	// // vscode.window.onDidChangeActiveTerminal
	// vscode.window.onDidChangeActiveTerminal(e => {
	// 	console.log(`Active terminal changed, name=${e ? e.name : 'undefined'}`);
	// });

	kpjTaskProvider = vscode.tasks.registerTaskProvider('kpj', {
		provideTasks() {
			return (kpjPromise = kpjPromise ?? getKpjTasks());
		},
		resolveTask(_task: vscode.Task) : vscode.Task | undefined {
			const task = _task.definition.task;
			if (task) {
				const definition: KpjTaskDefinition = <any>_task.definition;
				return new vscode.Task(
					definition,
					_task.scope ?? vscode.TaskScope.Workspace,
					definition.type, // for now, se don't have another name to use
					'kpj',
					new vscode.ShellExecution(`npx -y @keymanapp/kmc build`) // nothing from the definition for now
				);
			}
		}
	});

	console.log('Congratulations, your extension "keyman-kpj" is now active!');

	const disposable = vscode.commands.registerCommand('keyman.compileProject', () => {
		// const terminal = vscode.window.createTerminal(`Keyman Compile #${NEXT_TERM_ID++}`);
		// terminal.show();
		// terminal.sendText("echo 'Sent text immediately after creating'", true);
		vscode.window.showInformationMessage('Compiled Project from Keyman Project File Editor!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (kpjTaskProvider) {
		kpjTaskProvider.dispose();
	}
	console.log(`Keyman: goodbye!`);
}

// function ensureTerminalExists(): boolean {
// 	if ((<any>vscode.window).terminals.length === 0) {
// 		vscode.window.showErrorMessage('No active terminals');
// 		return false;
// 	}
// 	return true;
// }
