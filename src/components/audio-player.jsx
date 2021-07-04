import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image'
import Slider from 'react-input-slider';

function AudioPlayer(props) {
    const [index, setIndex] = useState(0);
    const [listLen, setListLen] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [progressPercent, setProgressPercent] = useState(.0);
    const [volume, setVolume] = useState(0.3);

    const playerRef = useRef();
    const progressContainer = useRef();

    // update audio player
    useEffect(() => {
        if (playing) {
            playerRef.current.play()
        } else {
            playerRef.current.pause()
        }
    }, [playing]);

    // update audio list
    useEffect(() => {
        setListLen(props.data == null ? 0 : props.data.length)
    }, [props]);

    // update volume
    useEffect(() => {
        playerRef.current.volume = volume
    }, [volume]);


    // toggle play state
    const togglePlay = () => {
        setPlaying(!playing);
    };

    // next/prev button
    const changeSong = (next) => {
        let nextIndex = next ? index + 1 : index - 1;
        if (nextIndex < 0) {
            nextIndex = listLen - 1;
        } else if (nextIndex > listLen - 1) {
            nextIndex = 0;
        }
        setIndex(nextIndex);
        setPlaying(true);
    }

    function convertTime(time) {
        if (time == null || isNaN(time)) {
            return '00:00'
        }
        let mins = Math.floor(time / 60);
        if (mins < 10) {
            mins = '0' + String(mins);
        }
        let secs = Math.floor(time % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }
        return mins + ':' + secs;
    }

    return (
        <div className={"music-container " + (playing ? 'play' : '')}>
            <div className={"music-info"}>
                <h4>{props.data[index].title}</h4>
                <div className={"bar-container progress-container"} ref={progressContainer} onClick={e => {
                    playerRef.current.currentTime = (e.nativeEvent.offsetX / progressContainer.current.clientWidth) * playerRef.current.duration
                }}>
                    <div className={"bar"} style={{width: progressPercent + '%'}}/>
                </div>
            </div>

            <audio src={props.data[index].audio}
                   ref={playerRef}
                   autoPlay={playing}
                   onTimeUpdate={e => setProgressPercent(100 * e.target.currentTime / e.target.duration)}
                   onEnded={() => changeSong(true)}/>

            <div className={"img-container"}>
                <div className={"img-cover-frame"}>
                    <Image className={"cover"} src={props.data[index].cover} alt="music-cover" layout={"fill"}
                           objectFit={"cover"}/>
                </div>
            </div>

            <div className={"navigation"}>
                <button className={"action-btn"}>
                    <i className={"fas fa-backward"} onClick={() => changeSong(false)}/>
                </button>
                <button className={"action-btn action-btn-big"} onClick={togglePlay}>
                    <i className={"fas " + (playing ? 'fa-pause' : 'fa-play')}/>
                </button>
                <button className={"action-btn"}>
                    <i className={"fas fa-forward"} onClick={() => changeSong(true)}/>
                </button>
                <Slider
                    styles={{active: {backgroundColor: '#fe8daa'}, track:{width: 80, margin:10}}}
                    disabled={playerRef.current == null}
                    axis="x"
                    x={volume}
                    xmax={1.0}
                    xstep={0.02}
                    onChange={({ x }) => setVolume(x)} />
                <h4>{playerRef.current == null ? "00:00/00:00" : convertTime(playerRef.current.currentTime) + ':' + convertTime(playerRef.current.duration)}</h4>
            </div>
        </div>
    );
}

export default AudioPlayer;