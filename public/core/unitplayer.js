
const EventType = {
  SetData: 0,
  Stop: 1,
  Start: 2
}

const CallbackEvent = {
  OnReady: 0,
  OnStart: 1,
  OnEnd: 2,
  OnFrameChange: 3,
  OnPlay: 4,
  OnError: 5,
  OnDataLoaded: 6
}
var container = null;
var canvas = null;
var unityGame;
let ratio = 1280 / 720;
function unityCallback(type, payload) {
  let ev = new CustomEvent('unity-event-callback', { detail: { type, payload } });
  document.dispatchEvent(ev)
}
function callUnity(type, payload) {
  unityGame.SendMessage('MonsPlayer', 'CallUnity', JSON.stringify({ type, payload }));
}
function resize() {
  if (!canvas) {
    return;
  }
  console.log({ canvas })
  canvas.style.width = `${getGameSize().width}px`;
  canvas.style.height = `${getGameSize().height}px`;
}
window.addEventListener("resize", resize);
function getGameSize() {
  let width = window.innerWidth,
    height = window.innerHeight;
  if (width / height > ratio) {
    width = Math.floor(height * ratio);
  } else {
    height = Math.floor(width / ratio);
  }
  return { width, height };
}
function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length
      ? "block"
      : "none";
  }
  var div = document.createElement("div");
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == "error") div.style = "background: red; padding: 10px;";
  else {
    if (type == "warning") div.style = "background: yellow; padding: 10px;";
    setTimeout(function () {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

function initUnity(_container, _canvas) {
  container = _container;
  canvas = _canvas;
  var loaderUrl = 'core/1c545332af8d46a03de13097c17364f5.js';
  var config = {
    dataUrl: 'core/7297552937bf8cdbb39b3fedbc56dedb.data.unityweb',
    frameworkUrl: 'core/a14dd37e6693c9932a705c180c6d0fee.js.unityweb',
    codeUrl: 'core/8da3b28d2ebaea7442729363f82804c9.wasm.unityweb',
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Monsterra",
    productName: "Monterra",
    productVersion: "1.0.0",
    showBanner: unityShowBanner,
  };
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    container.className = "unity-mobile";
    config.devicePixelRatio = 1;
    unityShowBanner("WebGL builds are not supported on mobile devices.");
  } else {
    resize();
  }

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      // progressBarFull.style.width = 100 * progress + "%";
      // var customBar = document.querySelector("#custom-bar");
      // var barText = document.querySelector("#bar-text");
      // if (customBar && barText) {
      //   progress = Math.min(95, Math.round(100 * progress));
      //   customBar.style.width = progress + "%";
      //   barText.innerText = Math.min(95, Math.round(progress)) + "%";
      // }
    })
      .then((unityInstance) => {
        unityGame = unityInstance;
        // const interval = setInterval(() => {
        //   if (window.isLoadSuccess()) {
        //     unityGame = unityInstance;
        //     // var myProgress = document.querySelector("#myProgress");
        //     // if (myProgress) {
        //     //   var customBar = document.querySelector("#custom-bar");
        //     //   var barText = document.querySelector("#bar-text");
        //     //   customBar.style.width = "95%";
        //     //   barText.innerText = "95%";
        //     //   setTimeout(() => {
        //     //     customBar.style.width = "100%";
        //     //     barText.innerText = "100%";
        //     //     myProgress.style.display = "none";
        //     //   }, 3000);
        //     // }
        //     // loadingBar.style.display = "none";
        //     // fullscreenButton.onclick = () => {
        //     //   unityInstance.SetFullscreen(1);
        //     // };
        //   }
        // }, 3000);
      })
      .catch((message) => {
        console.log(message);
      });
  };
  document.body.appendChild(script);
}
