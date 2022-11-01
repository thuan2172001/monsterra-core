function callUnity(type, payload) {
  if (!window.unityGame) {
    return;
  }
  console.log('call unity', { type, payload })
  window.unityGame.SendMessage('MonsPlayer', 'CallUnity', JSON.stringify({ type, payload }));
}
export const REPLAY_MODE = {
  ADVENTURE: 0,
  BATTLE_FRONT: 1,
  BOSS_CHALLENGE: 2,
  AREA: 3,
  NONE: 4
}
export const EventType = {
  SetData: 0,
  Stop: 1,
  Start: 2,
  Pause: 3,
  Resume: 4,
  SetFrame: 5,
  SetSpeed: 6,
  SetVolume: 7,
  GetScreenshot: 8,
  GetCameraInfo: 9,
}

export const CallbackEvent = {
  OnReady: 0,
  OnStart: 1,
  OnStop: 2,
  OnPause: 3,
  OnResume: 4,
  OnEnd: 5,
  OnFrameChange: 6,
  OnDataLoaded: 7,
  OnError: 8,
  OnSetFrame: 9,
  OnSetSpeed: 10,
  OnCapture: 11,
  OnCameraInfo: 12
}
const core = { callUnity };
export default core;