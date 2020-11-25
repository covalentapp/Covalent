import React, { Component } from "react";
import VideoRecorder from "react-video-recorder";
import LoadingView from "./VideoRecorder/loading-view.js";
import UnsupportedView from "./VideoRecorder/unsupported-view.js";
import ErrorView from "./VideoRecorder/error-view.js";
import styles from "../styles/Video.module.css";

/*
Known issues:
- Can't record on Safari (desktop)
- Can't play back on Safari (all) unless WebM can be converted to mp4
*/

class GameVideoRecorder extends Component {
  render() {
    return (
      <div className={styles.recorder}>
        <VideoRecorder
          isOnInitially={true}
          timeLimit={10000}
          onRecordingComplete={this.props.onRecordingComplete}
          renderLoadingView={() => <LoadingView />}
          renderUnsupportedView={() => <UnsupportedView />}
          renderErrorView={() => <ErrorView />}
          showReplayControls={true}
        />
      </div>
    );
  }
}

class VideoPlayback extends Component {
  render() {
    return (
      <div>
        {this.props.video && (
          <video className={styles.videoContainer} loop autoPlay controls>
            <source src={this.props.video} type="video/webm"></source>
            Your browser does not support the video tag.
          </video>
        )}
        {!this.props.video && (
          <div className={styles.videoContainer}>
            <h2 className={styles.loadingText}>Loading video...</h2>
          </div>
        )}
      </div>
    );
  }
}

export { GameVideoRecorder, VideoPlayback };
