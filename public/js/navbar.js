//const anime = require("animejs");

const leftNav = document.querySelectorAll(".leftnav");
const rightNav = document.querySelectorAll(".rightnav");
const mainBody = document.querySelectorAll(".main-body");
const titleBar = document.querySelectorAll(".title-bar");

// --------- moveDuration sets how long all animations take in milliseconds
const moveDuration = 600;

const mainLoadTL = anime.timeline({
  easing: "easeOutSine",
  duration: moveDuration,
  direction: "reverse"
});

mainLoadTL.add({
  targets: rightNav,
  translateX: 200,
  //direction: "reverse",
  easing: "easeInSine"
});

mainLoadTL.add({
  targets: leftNav,
  translateX: -200,
  //direction: "reverse",
  easing: "easeInSine"
});

mainLoadTL.add({
  targets: titleBar,
  translateY: -160,
  //direction: "reverse",
  easing: "easeInSine"
});

anime({
  targets: mainBody,
  translateY: 300,
  direction: "reverse",
  duration: moveDuration/2,
  opacity: 0,
  easing: "easeInSine"
});

// anime({
//   targets: ".path",
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: "easeInOutSine",
//   delay: function(el, i) {
//     return i * 250;
//   },
//   direction: "alternate",
//   loop: true
// });

// document
//   .querySelector(".login-form")
//   .addEventListener("submit", loginFormHandler);