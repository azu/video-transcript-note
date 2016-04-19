import React from "react"
import {rubyTranslate} from "../ruby-translator/ruby-translator"
import VideoState from "../js/store/video/VideoState";
export default class VideoTranscript extends React.Component {
    render() {
        /**
         * @type {VideoState}
         */
        const videoState = this.props.videoState;
        const transcript = {
            __html: rubyTranslate(videoState.currentTranscript).innerHTML
        };
        return <div className="VideoTranscript">
            <div dangerouslySetInnerHTML={transcript}></div>
        </div>
    }
}
VideoTranscript.propTypes = {
    videoState: React.PropTypes.instanceOf(VideoState).isRequired
};