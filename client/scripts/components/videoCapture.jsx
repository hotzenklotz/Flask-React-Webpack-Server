import React from "react";
import Component from "./baseComponent.jsx";
import RecordRTC from "recordRTC";
import VideoActions from "../actions/videoActions"

class VideoCapture extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isRecording : false,
      videoURL : null,
      videoOptions : {
        type: "video",
        video: {
        width: 320,
        height: 240
       },
       canvas: {
          width: 320,
          height: 240
       }
      }
    };

    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;

  }

  handleClick() {

    if (this.state.isRecording == false) {

      navigator.getUserMedia(
        {video : true},
        (mediaStream) => {

          this.mediaStream = mediaStream;
          this.refs.daVideo.getDOMNode().src = window.URL.createObjectURL(mediaStream);
          // this.refs.daVideo.getDOMNode().style = `width: $(options.video.width); height: $(options.video.height)px`;

          this.recordRTC = RecordRTC(mediaStream, this.state.videoOptions)
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
        this.mediaStream.stop();
      });
    }
  }

  render() {

    const buttonText = this.state.isRecording ? "Stop Webcam" : "Start Webcam";
    const videoStyle = {
      width : this.state.videoOptions.video.width,
      height : this.state.videoOptions.video.height
    };

    return (
      <div>
        <a className="waves-effect waves-light btn" onClick={this.handleClick.bind(this)}> {buttonText} <i className="material-icons right">videocam</i></a>
        <video ref="daVideo" autoPlay loop controls muted style={videoStyle}/>
      </div>
    )

  }

};


export default VideoCapture;



