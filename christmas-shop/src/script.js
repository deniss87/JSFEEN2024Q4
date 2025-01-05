/*
    EVENTS
*/

// Nav menu
const htmlDocument = document.querySelector("html");
const navBurgerMenu = document.querySelector(".header-nav-burger");
const navBurgerMenuLogo = document.querySelector(".header-nav-burger-logo");
const navContainer = document.querySelector(".header-nav-container");

navBurgerMenu.onclick = () => {
    if (navContainer.getAttribute("display") == "false") {
        navContainer.setAttribute("display", "true");
        navBurgerMenuLogo.classList.add("header-nav-burger-active");
        navContainer.style.display="flex";
        htmlDocument.setAttribute("style", "overflow-y: hidden");
    } else {
        navContainer.setAttribute("display", "false");
        navBurgerMenuLogo.classList.remove("header-nav-burger-active");
        navContainer.style.display="none";
        htmlDocument.removeAttribute("style");
    }
}


/*
    Scrool Up Button
*/ 
  const scrollUpBtn = document.querySelector(".scrollUpBtn");
  scrollUpBtn.onclick = () => {
    window.scrollTo(0, 0)
  };

  window.addEventListener("scroll", () => {
    if (htmlDocument.scrollTop >= 100 && window.innerWidth <= 768) {
        scrollUpBtn.style.display = "flex";
    }
    if (htmlDocument.scrollTop === 0) {
        scrollUpBtn.style.display = "none";
    }
  }
);