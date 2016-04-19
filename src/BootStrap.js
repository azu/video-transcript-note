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
dispatcher.onError(payload => {
    ContextLogger.logError(payload);
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
// Singleton
AppContextLocator.context = appContext;
export default class BootStrap extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = AppContextLocator.context.getState();
    }

    componentDidMount() {
        const context = AppContextLocator.context;
        // when change store, update component
        const onChangeHandler = () => {
            return requestAnimationFrame(() => {
                this.setState(context.getState());
            })
        };
        context.onChange(onChangeHandler);
    }

    render() {
        return <App {...this.state}/>;
    }
}
React.render(<BootStrap />, document.body);
