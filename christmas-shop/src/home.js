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
    const shiftArr = [shiftValue, shiftNum];
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

// Set the date to the next New Year
const year = new Date().getFullYear();
const countDownDate = new Date(`Jan 1, ${year+1} 0:00:00`).getTime();
const daysElement = document.getElementById("timer-days");
const hoursElement = document.getElementById("timer-hours");
const minutesElement = document.getElementById("timer-minutes");
const secondsElement = document.getElementById("timer-seconds");

var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = countDownDate - now;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
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