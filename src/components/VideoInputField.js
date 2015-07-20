// LICENSE : MIT
"use strict";
import React from "react"
export default class VideoInputField extends React.Component {
    static get propTypes() {
        return {
            handleSubmit: React.PropTypes.func
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var videoURL = React.findDOMNode(this.refs.videoURL).value.trim();
        if (this.props.handleSubmit) {
            this.props.handleSubmit(videoURL);
        }
    }

    render() {
        return <div className="VideoInputField">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>動画URL</label>
                <input type="text" className="VideoInputField-input" ref="videoURL"
                    placeholder="file://path/to/video.mp4"/>
                <input type="submit" value="Load"/>
            </form>
        </div>;
    }
}