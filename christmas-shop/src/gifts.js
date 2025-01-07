
//  EVENS ON GIFTS TABS
const giftsTabs = document.querySelectorAll(".gifts-tabs span");

// const giftsTabAll = document.querySelector("#gifts-tab-all");
// const giftsTabWork = document.querySelector("#gifts-tab-work");
// const giftsTabHealth = document.querySelector("#gifts-tab-health");
// const giftsTabHarmony = document.querySelector("#gifts-tab-harmony");


for (let i=0; i < giftsTabs.length; i++) {
    let id = giftsTabs[i].getAttribute('id');
    let splitId = id.split("-");
    let category = splitId[2];

    giftsTabs[i].onclick = () => {
        activeTab(id);
        removeItems();
        getData('gifts', category)
    }

}

function activeTab(id) {
    console.log(id);
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
