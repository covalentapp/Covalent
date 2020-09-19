import React, { Component } from 'react';
import VideoRecorder from 'react-video-recorder';
import styles from '../styles/Video.module.css';

/*
Known issues:
- Can't record on Safari (desktop)
- Can't play back on Safari (all) unless WebM can be converted to mp4
Add:
- Add customizations for button and loading screen
- Render button that needs to be pressed to upload file
- Add props for all the places where there are individual IDs
*/

class GameVideoRecorder extends Component {
    render () {
        return (
            <div className={styles.recorder}>
                <VideoRecorder
                isOnInitially={true}
                timeLimit={7000}
                onRecordingComplete={videoBlob => {
                    // Show button to upload file to S3
                }}
                />
            </div>
        )
    }
}

class VideoPlayback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    componentDidMount() {
        // Get video file from S#
    }

    render () {
        if (this.state.file) {
            return (
                <div className={styles.videoContainer}>
                    <video className={styles.video} autoPlay loop>
                        <source src={this.state.file} type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            )
        } else {
            return (
                <p>Loading...</p>
            )
        }




    }
}

export { GameVideoRecorder, VideoPlayback };