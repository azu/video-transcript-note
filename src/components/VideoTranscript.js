import React from "react"
import {rubyTranslate} from "../ruby-translator/ruby-translator"
export default class VideoTranscript extends React.Component {
    render() {
        var transcript = {
            __html: rubyTranslate(this.props.transcript).innerHTML
        };
        return <div className="VideoTranscript">
            <div dangerouslySetInnerHTML={transcript}></div>
        </div>
    }
}