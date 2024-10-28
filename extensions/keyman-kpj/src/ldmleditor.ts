import * as vscode from 'vscode';

interface LdmlDocumentDelegate {
	getFileData(): Promise<Uint8Array>;
}

class LdmlDocument implements vscode.CustomDocument {
    constructor(public uri: vscode.Uri, public backupId: string | undefined, public delegate: LdmlDocumentDelegate) {

    }

    static create(uri: vscode.Uri, backupId: string | undefined, delegate: LdmlDocumentDelegate): LdmlDocument | PromiseLike<LdmlDocument> {
        return new LdmlDocument(uri, backupId, delegate);
    }

    private _onDidChangeDocument = new vscode.EventEmitter<{
        /* TODO */
	}>();

    public readonly onDidChangeContent = this._onDidChangeDocument.event;

    private _onDidDispose = new vscode.EventEmitter<{
        /* TODO */
	}>();

    public readonly onDidDispose = this._onDidDispose.event;

    dispose(): void {
        [this._onDidChangeDocument,
            this._onDidDispose].forEach(e => e.dispose());
        /* TODO others */
    }
}

export class LdmlEditorProvider implements vscode.CustomEditorProvider<LdmlDocument> {
    private static readonly viewType = 'keyman.ldml'; // sync w/ package.json

    constructor(private readonly context: vscode.ExtensionContext) { }
	static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new LdmlEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(LdmlEditorProvider.viewType, provider);
        return providerRegistration;
	}

	private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<LdmlDocument>>();
	public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

    async saveCustomDocument(document: LdmlDocument, cancellation: vscode.CancellationToken): Promise<void> {
        /* TODO */
        return;
    }
    async saveCustomDocumentAs(document: LdmlDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Promise<void> {
        /* TODO */
        return;
    }
    async revertCustomDocument(document: LdmlDocument, cancellation: vscode.CancellationToken): Promise<void> {
        /* TODO */
        return;
    }
    async backupCustomDocument(document: LdmlDocument, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Promise<vscode.CustomDocumentBackup> {
        throw new Error('Method not implemented.');
    }
    async openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken): Promise<LdmlDocument> {
        const document : LdmlDocument = await LdmlDocument.create(uri, openContext.backupId, {
            getFileData: async() => {
                return new Uint8Array(); // TODO
            }
        });

        const listeners: vscode.Disposable[] = [];

        // listeners.push(document.onDidChange(e => {
		// 	// Tell VS Code that the document has been edited by the use.
		// 	this._onDidChangeCustomDocument.fire({
		// 		document,
		// 		...e,
		// 	});
		// }));

        listeners.push(document.onDidChangeContent(e => {
            // TODO
        }));

        document.onDidDispose(() => listeners.forEach(e => e.dispose()));

        return document;

    }
    async resolveCustomEditor(document: LdmlDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): Promise<void> {
        webviewPanel.webview.html = `
            <h1>Hello, World!</h1>
        `;
    }
}
