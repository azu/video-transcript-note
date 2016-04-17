// LICENSE : MIT
"use strict";
const React = require("react");
import App from "./App";
export default class BootStrap extends React.Component {
    render() {
        return <App />;
    }
}
React.render(<BootStrap />, document.body);
