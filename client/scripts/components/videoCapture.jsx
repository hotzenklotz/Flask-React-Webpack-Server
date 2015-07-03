import React from "react";
import Component from "./baseComponent.jsx";
import RecordRTC from "recordRTC";
import VideoActions from "../actions/videoActions"

class VideoCapture extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isRecording : false,
      videoURL : null
    }

    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;

  }

  handleClick() {

    if (this.state.isRecording == false) {

      const options = {
       type: "video",
       video: {
        width: 320,
        height: 240
       },
       canvas: {
          width: 320,
          height: 240
       }
      };

      navigator.getUserMedia(
        {video : true},
        (mediaStream) => {
          this.recordRTC = RecordRTC(mediaStream, options)
          this.recordRTC.startRecording();
          this.updateState({isRecording : {$set : true}})
        },
        (error) =>
          console.error(error)
      );


    } else {

      this.recordRTC.stopRecording((videoURL) => {

        this.updateState({videoURL : {$set : videoURL}})
        this.updateState({isRecording : {$set : false}})
        this.refs.daVideo.getDOMNode().src = videoURL;

        const recordedBlob = this.recordRTC.getBlob();
        VideoActions.uploadVideo(recordedBlob);

        // Stop video stream?
      });
    }
  }

  render() {

    const buttonText = this.state.isRecording ? "Stop Webcam" : "Start Webcam"

    return (
      <div>
        <a className="waves-effect waves-light btn" onClick={this.handleClick.bind(this)}> {buttonText} <i className="material-icons right">videocam</i></a>
        <video ref="daVideo"/>
      </div>
    )

  }

};


export default VideoCapture;



