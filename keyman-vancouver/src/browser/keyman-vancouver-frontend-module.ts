/**
 * Generated using theia-extension-generator
 */
import { KeymanVancouverCommandContribution, KeymanVancouverMenuContribution } from './keyman-vancouver-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
// import { KeymanVancouverGettingStarted } from './keyman-vancouver-widget';
// import { WidgetFactory } from '@theia/core/lib/browser';
// import { GettingStartedWidget } from '@theia/getting-started/lib/browser/getting-started-widget';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(KeymanVancouverCommandContribution);
    bind(MenuContribution).to(KeymanVancouverMenuContribution);

    // bind(KeymanVancouverGettingStarted).toSelf();
    // bind(WidgetFactory).toDynamicValue(ctx => ({
    //     id: GettingStartedWidget.ID,
    //     createWidget: () => ctx.container.get<KeymanVancouverGettingStarted>(KeymanVancouverGettingStarted)
    // })).inSingletonScope();


});
