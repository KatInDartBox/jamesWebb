const elmSmokeWrapper = document.getElementById("smoke");
const elmFlameWrapper = document.getElementById("flame");
const elmCountDown = document.querySelector(".countDown");
const elmLaunchBtn = document.querySelector(".button");
const elmRocketWrapper = document.getElementById("rocket");

// setStyle(elmSmokeWrapper, { visibility: "hidden" });

setChildrenStyle(elmSmokeWrapper, { visibility: "hidden" });
setChildrenStyle(elmFlameWrapper, { visibility: "hidden" });
setStyle(elmCountDown, { visibility: "hidden" });

elmLaunchBtn.addEventListener("click", handleCountDown);

/**
 *
 * @param {HTMLElement} elm
 * @param {Object.<string,string>} styleObj
 */
function setStyle(elm, styleObj) {
  if (!elm) return;
  for (const [key, value] of Object.entries(styleObj)) {
    elm.style[key] = value;
  }
}

/**
 *
 * @param {HTMLElement} elm
 * @param {Object.<string,string>} styleObj
 */
function setChildrenStyle(elm, styleObj) {
  const children = elm.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    setStyle(child, styleObj);
  }
}

function handleCountDown() {
  let counter = 3;
  setStyle(elmCountDown, { visibility: "initial" });
  elmLaunchBtn.setAttribute("disabled", "1");

  let timer = setInterval(() => {
    if (counter <= -1) {
      clearInterval(timer);
      setStyle(elmCountDown, { visibility: "hidden" });
      elmCountDown.innerText = 3;
      // elmLaunchBtn.removeAttribute("disabled");

      handleAddSmoke();
      return;
    }

    elmCountDown.innerText = counter < 10 ? `0${counter}` : counter;
    counter--;
  }, 1000);
}

function handleAddSmoke() {
  // setStyle(elmSmokeWrapper, { visibility: "initial" });
  const smokes = elmSmokeWrapper.children;
  let smokeCounter = smokes.length;
  let timer = setInterval(() => {
    if (smokeCounter <= -1) {
      clearInterval(timer);
      handleInitFlame();
      // setStyle(elmSmokeWrapper, { visibility: "hidden" });
    }

    const smoke = smokes[smokeCounter];
    if (smoke) {
      setStyle(smoke, { visibility: "initial" });
      smoke.classList.add("smoke");
    }
    smokeCounter--;
  }, 330);
}

function handleInitFlame() {
  const flames = elmFlameWrapper.children;
  let counter = flames.length;
  let timer = setInterval(() => {
    if (counter <= -1) {
      clearInterval(timer);
      handleLaunchRocket();
      // setStyle(elmSmokeWrapper, { visibility: "hidden" });
    }

    const flame = flames[counter];
    if (flame) {
      setStyle(flame, { visibility: "initial" });
      flame.classList.add("flame");
    }
    counter--;
  }, 330);
}

function handleLaunchRocket() {
  elmRocketWrapper.classList.add("rocketWrapper");
  setTimeout(() => {
    window.location.reload();
  }, 15000);
}
