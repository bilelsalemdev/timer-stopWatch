let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let lap = document.querySelector(".lap");
let laps = document.querySelector(".laps");
let reset = document.querySelector(".reset");
let nav = document.querySelector("nav");
let claerAll = document.querySelector(".clearAll");
let chrono = document.querySelector(".chrono");
let mins = 0;
let secs = 0;
let msecs = 0;
let displayMsecs = 0;
let displaySecs = 0;
let displayMins = 0;
let started = false;
let st = "stopped";
let interval = null;
let count = 0;
let countDown;
function startWatch() {
  msecs++;
  if (msecs > 99) {
    secs++;
    msecs = 0;
    if (secs > 59) {
      mins++;
      secs = 0;
    }
  }

  if (msecs < 10) {
    displayMsecs = "0" + msecs.toString();
  } else if (msecs >= 10) {
    displayMsecs = msecs.toString();
  }
  if (secs < 10) {
    displaySecs = "0" + secs.toString();
  } else {
    displaySecs = secs.toString();
  }
  if (mins < 10) {
    displayMins = "0" + mins.toString();
  } else {
    displayMins = mins.toString();
  }
  nav.innerHTML = displayMins + ":" + displaySecs + ":" + displayMsecs;
}
start.addEventListener("click", (e) => {
  interval = setInterval(startWatch, 10);
  started = true;
  e.preventDefault();
});
stop.addEventListener("click", () => {
  if (started) {
    if (st === "stopped") {
      stop.innerHTML = "resume";
      clearInterval(interval);
      st = "resume";
    } else if (st === "resume") {
      stop.innerHTML = "stop";
      interval = setInterval(startWatch, 10);
      st = "stopped";
    }
  }
});
lap.addEventListener("click", () => {
  if (mins != 0 || secs != 0 || msecs != 0) {
    let div = document.createElement("div");
    div.innerHTML = `${displayMins} : ${displaySecs} : ${displayMsecs}`;
    laps.appendChild(div);
    count += 1;
  }
});
reset.addEventListener("click", () => {
  clearInterval(interval);
  nav.innerHTML = "00:00:00";
});
claerAll.addEventListener("click", () => {
  laps.innerHTML = "";
  count = 0;
});
function chronoTimer() {
  if (chrono.innerText === "Chrono") {
    chrono.innerHTML = "Timer";
    let seconds = window.prompt("enter the time in seconds :");
    laps.innerHTML = "";
    clearInterval(interval);
    nav.innerHTML = "00:00:00";
    function displayTime(seconds) {
      displayHours = Math.floor(seconds / 3600);
      displayMins = Math.floor((seconds % 3600) / 60);
      displaySecs = Math.floor(seconds % 60);

      nav.innerHTML = `${displayHours < 10 ? "0" : ""}${displayHours}:${
        displayMins < 10 ? "0" : ""
      }${displayMins}:${displaySecs < 10 ? "0" : ""}${displaySecs}`;
    }

    function endTime() {
      nav.innerHTML = "TIME OUT";
    }
    countDown = setInterval(function () {
      seconds--;
      displayTime(seconds);
      if (seconds <= 0) {
        endTime();
        clearInterval(countDown);
      }
    }, 1000);
  } else if (chrono.innerText === "Timer") {
    chrono.innerHTML = "Chrono";
    nav.innerHTML = "00:00:00";
    clearInterval(countDown);
    displayMsecs = 0;
    displaySecs = 0;
    displayMins = 0;
    displayHours = 0;
  }
}
chrono.addEventListener("click", chronoTimer);
if (count >= 6) {
  document.getElementsByClassName("laps").style.overflow = "scroll";
}
