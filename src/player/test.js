import { useEffect, useRef, useState } from 'react';
import Player from './index';
import { REPLAY_MODE, EventType } from './core';
function TestPlayer() {
  const playerRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    console.log('thumbnailchanged', thumbnail)
  }, [thumbnail])
  useEffect(() => {
    console.log('playerref', playerRef)
  }, [playerRef])
  async function setData(frame) {
    let rs = await fetch('core/sample.txt');
    let text = await rs.json();
    playerRef.current.setData(REPLAY_MODE.BATTLE_FRONT, text, frame);
  }
  function start() {
    playerRef.current.start();
  }
  function stop() {
    playerRef.current.stop();
  }
  function pause() {
    playerRef.current.pause();
  }
  function resume() {
    playerRef.current.resume();
  }
  function _setFrame(frame) {
    playerRef.current.setFrame(Number(frame));
  }
  function _setSpeed(speed) {
    playerRef.current.setSpeed(Number(speed));
  }
  function _setSpeed(speed) {
    playerRef.current.setSpeed(Number(speed));
  }
  function _setVol() {
    playerRef.current.setVolume(0.3);
  }
  async function _getScreenshot(frame) {
    let rs = await fetch('core/sample.txt');
    let text = await rs.json();
    playerRef.current.getScreenshot(REPLAY_MODE.BATTLE_FRONT, text, frame);
  }
  return <div>
    <Player ref={playerRef}
      onReady={payload => { console.log('onReady ', payload) }}
      onStart={payload => { console.log('onStart ', payload) }}
      OnStop={payload => { console.log('OnStop ', payload) }}
      OnPause={payload => { console.log('OnPause ', payload) }}
      OnResume={payload => { console.log('OnResume ', payload) }}
      OnEnd={payload => { console.log('OnEnd ', payload) }}
      onFrameChange={payload => { console.log('onFrameChange ', payload) }}
      onDataLoaded={payload => { console.log('onDataLoaded ', payload) }}
      OnSetFrame={payload => { console.log('OnSetFrame ', payload) }}
      OnSetSpeed={payload => { console.log('OnSetSpeed ', payload) }}
      OnCapture={payload => {
        console.log('OnCapture', payload);
        setThumbnail('data:image/png;base64,' + payload);
      }}
    />
    <button onClick={() => { setData(0) }}>Set Data frame 0</button>
    <button onClick={() => { setData(100) }}>Set Data frame 100</button>
    <button onClick={start}>start</button>
    <button onClick={stop}>stop</button>
    <button onClick={pause}>pause</button>
    <button onClick={resume}>resume</button><br />



    <button onClick={() => { _setSpeed(1) }}>setSpeed x1</button><button onClick={() => { _setSpeed(2) }}>setSpeed x2</button><br />



    <button onClick={() => { _setFrame(50) }}>setFrame 50</button>
    <button onClick={() => { _setVol() }}>Set volume to 0.3</button><br />
    <button onClick={() => { _getScreenshot(10) }}>Get thumbnail at frame 0</button>
    <button onClick={() => { _getScreenshot(10) }}>Get thumbnail at frame 150</button>
    <p>Thumbnail</p>
    <input type='text' />
    <img src={thumbnail} />
  </div>
}

export default TestPlayer;
