function handleMouse() {
  if (new Date().getTime() - lastTouchTime < 500) return;
  document.body.classList.add("has-hover");

  document.removeEventListener("mousemove", handleMouse);
  hasHover = false;
}

function handleTouch() {
  lastTouchTime = new Date().getTime();
  document.body.classList.remove("has-hover");

  if (!hasHover) {
    document.addEventListener("mousemove", handleMouse);
    hasHover = true;
  }
}

let lastTouchTime = 0;
let hasHover = true;
document.addEventListener("touchstart", handleTouch);
document.addEventListener("mousemove", handleMouse);

export {};
