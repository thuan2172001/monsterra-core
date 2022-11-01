import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import core from './core';
import { EventType, CallbackEvent } from './core';

function Player(props, ref) {
  const [isReady, setIsReady] = useState(false);
  let canvasRef = useRef();
  let containerRef = useRef();
  useImperativeHandle(ref, () => ({
    setData,
    start, stop,
    pause, resume, setSpeed, setFrame, setVolume, getScreenshot, getCameraInfo
  }));
  function checkPlayer() {
    if (!isReady) {
      throw new Error('player_is_not_ready');
    }
  }
  function getScreenshot(mode, data, frame, camInfo = null) {
    checkPlayer();
    core.callUnity(EventType.GetScreenshot, { mode, data, frame, camInfo });
  }
  function getCameraInfo() {
    checkPlayer();
    core.callUnity(EventType.GetCameraInfo, {});
  }
  function setSpeed(speed) {
    checkPlayer();
    core.callUnity(EventType.SetSpeed, { value: speed });
  }
  function setFrame(frame) {
    checkPlayer();
    core.callUnity(EventType.SetFrame, { value: frame });
  }
  function setData(mode, data, frame) {
    console.log('setdata', { mode, frame })
    checkPlayer();
    core.callUnity(EventType.SetData, { mode, data, frame });
  }
  function setVolume(vol) {
    checkPlayer();
    core.callUnity(EventType.SetVolume, { value: vol })
  }
  function start() {
    checkPlayer();
    core.callUnity(EventType.Start, {});
  }
  function stop() {
    checkPlayer();
    core.callUnity(EventType.Stop, {});
  }
  function pause() {
    checkPlayer();
    core.callUnity(EventType.Pause, {});
  }
  function resume() {
    checkPlayer();
    core.callUnity(EventType.Resume, {});
  }
  useEffect(() => {
    function processUnityEvent(data) {
      let { type, payload } = data.detail;
      switch (type) {
        case CallbackEvent.OnReady://on ready
          if (props.onReady) {
            props.onReady(payload);
          }
          setIsReady(true);
          break;

        case CallbackEvent.OnStart:
          if (props.onStart) {
            props.onStart(payload);
          }
          break;
        case CallbackEvent.OnStop:
          if (props.onStart) {
            props.OnStop(payload);
          }
          break;
        case CallbackEvent.OnPlay:
          if (props.onPlay) {
            props.onPlay(payload);
          }
          break;
        case CallbackEvent.OnPause:
          if (props.OnPause) {
            props.OnPause(payload);
          }
          break;
        case CallbackEvent.OnResume:
          if (props.OnResume) {
            props.OnResume(payload);
          }
          break;
        case CallbackEvent.OnEnd:
          if (props.OnEnd) {
            props.OnEnd(payload);
          }
          break;
        case CallbackEvent.OnFrameChange:
          if (props.onFrameChange) {
            props.onFrameChange(payload);
          }
          break;
        case CallbackEvent.OnDataLoaded:
          if (props.onDataLoaded) {
            props.onDataLoaded(payload);
          }
          break;
        case CallbackEvent.OnSetFrame:
          if (props.OnSetFrame) {
            props.OnSetFrame(payload);
          }
          break;
        case CallbackEvent.OnSetSpeed:
          if (props.OnSetSpeed) {
            props.OnSetSpeed(payload);
          }
          break;
        case CallbackEvent.OnCapture:
          console.log('event on capture');
          if (props.OnCapture) {
            props.OnCapture(payload);
          }
          break;
        case CallbackEvent.OnCameraInfo:
          console.log('event on get camera info');
          if (props.OnCameraInfo) {
            props.OnCameraInfo(payload);
          }
          break;
      }
    }
    document.addEventListener('unity-event-callback', processUnityEvent)
    if (!(canvasRef?.current && containerRef?.current)) {
      return;
    }
    window.initUnity(
      containerRef.current, canvasRef.current
    );
    return () => {
      document.removeEventListener('unity-event-callback', processUnityEvent);
    }
  }, [canvasRef, containerRef])
  return (
    <div>
      <div id="unity-container" className="unity-desktop" ref={containerRef}>
        <canvas id="unity-canvas" width="960" height="600" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default forwardRef(Player);
