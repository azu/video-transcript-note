// LICENSE : MIT
"use strict";
const React = require("react");
import App from "./App";
import AppContextLocator from "./AppContextLocator";
// store
import AppStoreGroup from "./js/store/AppStoreGroup";
// context
import AppContext  from "./js/framework/Context";
import Dispatcher from "./js/framework/Dispatcher";
import ContextLogger from "./js/util/ContextLogger";
// instances
const dispatcher = new Dispatcher();
const appStoreGroup = new AppStoreGroup(dispatcher);
// context connect dispatch with stores
const appContext = new AppContext({
    dispatcher,
    store: appStoreGroup
});
if (process.env.NODE_ENV === `development`) {
    const logMap = {};
    dispatcher.onWillExecuteEachUseCase(useCase => {
        const startTimeStamp = performance.now();
        console.groupCollapsed(useCase.name, startTimeStamp);
        logMap[useCase.name] = startTimeStamp;
        console.log(`${useCase.name} will execute`);
    });
    dispatcher.onDispatch(payload => {
        ContextLogger.logDispatch(payload);
    });
    appContext.onChange((stores) => {
        ContextLogger.logOnChange(stores);
    });
    dispatcher.onDidExecuteEachUseCase(useCase => {
        const startTimeStamp = logMap[useCase.name];
        const takenTime = performance.now() - startTimeStamp;
        console.log(`${useCase.name} did executed`);
        console.info("Take time(ms): " + takenTime);
        console.groupEnd(useCase.name);
    });
}
// Singleton
AppContextLocator.context = appContext;
export default class BootStrap extends React.Component {
    render() {
        return <App appContext={appContext}/>;
    }
}
React.render(<BootStrap />, document.body);
