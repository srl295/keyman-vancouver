import { MessageService } from "@theia/core";
import { ReactWidget } from "@theia/core/lib/browser";
import { inject, injectable, postConstruct } from "@theia/core/shared/inversify";
import { ReactNode } from 'react';
import React = require("react");

@injectable()
export class KeymanVancouverGettingStarted extends ReactWidget {
    static readonly ID = 'KeymanVancouver.GettingStartedWidget';
    static readonly LABEL = 'Getting Started with Keyman Vancouver';
    @postConstruct()
    protected async init(): Promise <void> {
        this.id = KeymanVancouverGettingStarted.ID;
        this.title.caption = this.title.label = KeymanVancouverGettingStarted.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize';
        this.update();
    }

    protected render(): ReactNode {
        const header = `Just testing here`;
        return <div id='widget-container'>
            <i>{header}</i>
                {/* <AlertMessage type='INFO' header={header} /> */}
                <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
          </div>
    }

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    protected displayMessage(): void {
        this.messageService.info(`Congrats, MyWiget OK!`);
    }

};
