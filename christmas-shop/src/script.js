/*
    EVENTS
*/

// Nav menu
const htmlDocument = document.querySelector("html");
const navBurgerMenu = document.querySelector(".header-nav-burger");
const navBurgerMenuLogo = document.querySelector(".header-nav-burger-logo");
const navContainer = document.querySelector(".header-nav-container");
const navContainerLinks = document.querySelectorAll(".header-nav-container a");

navContainerLinks.forEach((item) => {
    item.onclick = (event) => {
        
        if (navContainer.getAttribute("display") == "true") {
            event.preventDefault();
            navContainer.setAttribute("display", "false");
            navBurgerMenuLogo.classList.remove("header-nav-burger-active");
            navContainer.removeAttribute("style");
            htmlDocument.removeAttribute("style");
            setTimeout(() => {
                console.log("Go")
                window.location.href = event.target.href;
            }, 600);
        }
    }
});


navBurgerMenu.onclick = () => {
    if (navContainer.getAttribute("display") == "false") {
        navContainer.setAttribute("display", "true");
        navBurgerMenuLogo.classList.add("header-nav-burger-active");
        navContainer.setAttribute("style", "transform: translateX(-100%);");
        htmlDocument.setAttribute("style", "overflow-y: hidden");
    } else {
        navContainer.setAttribute("display", "false");
        navBurgerMenuLogo.classList.remove("header-nav-burger-active");

        navContainer.setAttribute("style", "transform: translateX(100%);");
        navContainer.removeAttribute("style");
        htmlDocument.removeAttribute("style");
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        navContainer.removeAttribute("style");
        navContainer.setAttribute("display", "false");
        navBurgerMenuLogo.classList.remove("header-nav-burger-active");
        htmlDocument.removeAttribute("style");
    }
    
});