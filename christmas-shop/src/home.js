// import { renderModal } from "./items.js";
/*
    SLIDER
*/

const sliderContainer = document.querySelector(".slider-main");
const sliderLeftBtn = document.querySelector("#slider-left-btn");
const sliderRightBtn = document.querySelector("#slider-right-btn");

let sliderElementPos = 0;

const sliderShift = function () {
    // Calculate the number of shifts based on the screen size
    const shiftNum = window.innerWidth >= 768 ? 3 : 6;
    const shiftValue = (sliderContainer.scrollWidth - sliderContainer.offsetWidth) / shiftNum; 
    const shiftArr = [Math.round(shiftValue), shiftNum];
    return shiftArr;
}

// Slider scroll (direction arg: -1 is right direction, +1 is left direction)
const sliderScroll = function (direction, value) {
    sliderElementPos += (direction * value[0]);

    // Disable slider buttons at the end and begining
    if ( (Math.abs(sliderElementPos) / value[0]) === value[1] ) {
        sliderRightBtn.setAttribute("disabled", "");
    } else {
        sliderRightBtn.removeAttribute("disabled");
    }
    if ( Math.abs(sliderElementPos) < value[0] ) {
        sliderLeftBtn.setAttribute("disabled", "");
    } else {
        sliderLeftBtn.removeAttribute("disabled");
    }
    
    sliderContainer.style.transition = `transform ${value[0]}ms`;
    sliderContainer.style.transform = `translateX(${sliderElementPos}px)`;
}

// Slider Events
sliderRightBtn.onclick = () => {
    sliderScroll(-1, sliderShift());
}
sliderLeftBtn.onclick = () => {
    sliderScroll(1, sliderShift());
}

window.addEventListener("resize", () => {
    if (sliderElementPos !== 0) {
        sliderContainer.style.transform = `translateX(0px)`;
        sliderLeftBtn.setAttribute("disabled", "");
        sliderRightBtn.removeAttribute("disabled");
        sliderElementPos = 0;
    }
})

// CTA Timer

// Set the date to the next New Year (UTC +0)
const currentYear = new Date().getUTCFullYear();
const countDownDate = new Date(Date.UTC(currentYear + 1, 0, 1, 0, 0, 0));
const daysElement = document.getElementById("timer-days");
const hoursElement = document.getElementById("timer-hours");
const minutesElement = document.getElementById("timer-minutes");
const secondsElement = document.getElementById("timer-seconds");

var x = setInterval(function() {

  const now = new Date().getTime();
  const distance = countDownDate - now;
    
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result
  daysElement.innerHTML = days;
  hoursElement.innerHTML = hours;
  minutesElement.innerHTML = minutes;
  secondsElement.innerHTML = seconds; 

  if (distance < 0) {
    clearInterval(x);
    daysElement.innerHTML = 0;
    hoursElement.innerHTML = 0;
    minutesElement.innerHTML = 0;
    secondsElement.innerHTML = 0; 
  }
}, 1000);