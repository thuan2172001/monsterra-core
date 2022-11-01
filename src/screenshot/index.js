import { useEffect, useRef, useState } from "react"
import api from "./api"
import { REPLAY_MODE } from '../player/core';
import Player from '../player';
export default function Screenshot() {
  const playerRef = useRef();
  const [state, setState] = useState('');
  const [request, setRequest] = useState(null);
  const [img, setImg] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (img && request) {
      async function uploadImage() {
        console.log('upload image');
        await api.put('/mons-game/update-thumbnail', { id: request._id, data: img })
        getNextRequest();
      }
      uploadImage();
    }
  }, [img]);
  useEffect(() => {
    if (request) {
      async function processRequest() {
        let rs = await getFrame(request._id);
        getScreenshot(rs, 0);
      }
      processRequest();
    }

  }, [request])
  useEffect(() => {
    if (ready) {
      getNextRequest();
    }
  }, [ready])
  async function getRequestThumbnail() {
    let rs = await api.get('/mons-game/get-missing-thumbail');
    return rs.data;
  }
  async function getFrame(id) {
    let rs = await api.get(`/mons-game/get-rawdata/${id}`);
    return rs.data;
  }
  async function getNextRequest() {
    let request = null;
    try {
      request = await getRequestThumbnail();
    } catch (error) {
      console.error(error);
    }
    if (request) {
      setRequest(request);
    } else {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      })
      getNextRequest();
    }
  }
  async function getScreenshot(data, frame, camInfo = null) {
    // camInfo is information of camera. Get through CallbackEvent OnCameraInfo 
    return new Promise((resolve, reject) => {
      playerRef.current.getScreenshot(REPLAY_MODE.BATTLE_FRONT, data, frame, camInfo);
    })
  }
  return <div>
    <p>Screenshot</p>
    <Player ref={playerRef}
      onReady={payload => { setReady(true) }}
      OnCapture={payload => {
        setImg('data:image/png;base64,' + payload[0]);
      }}
      OnCameraInfo={payload => {
        console.log('OnCameraInfo', payload);
      }}
    />
  </div>
}