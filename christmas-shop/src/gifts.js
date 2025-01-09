import {renderItems} from "./items.js";

//  EVENS ON GIFTS TABS
const giftsTabs = document.querySelectorAll(".gifts-tabs span");

for (let i=0; i < giftsTabs.length; i++) {
    let id = giftsTabs[i].getAttribute('id');
    let splitId = id.split("-");
    let category = splitId[2];

    giftsTabs[i].onclick = () => {
        activeTab(id);
        removeItems();
        renderItems('gifts', category);
    }

}

function activeTab(id) {
    for (let i=0; i < giftsTabs.length; i++) {
        if (giftsTabs[i].getAttribute('id') === id) {
            giftsTabs[i].classList.add("gift-tab-active");
        } else {
            giftsTabs[i].classList.remove("gift-tab-active");
        }
    }
}

function removeItems() {
    const giftsCards = document.querySelectorAll(".gifts-cards-item");
    giftsCards.forEach((item) => {
        item.remove();
    });
}


/*
    Scrool Up Button
*/ 
  const scrollUpBtn = document.querySelector(".scrollUpBtn");
  scrollUpBtn.onclick = () => {
    window.scrollTo(0, 0)
  };

  window.addEventListener("scroll", () => {
    if (htmlDocument.scrollTop >= 300 && window.innerWidth <= 768) {
        scrollUpBtn.style.display = "flex";
    }
    if (htmlDocument.scrollTop === 0) {
        scrollUpBtn.style.display = "none";
    }
  }
);