// import data from './gifts.json' with {type: "json"};

async function getData(page, sort, limit) {
    let url = "src/gifts.json";
    if (page !== "home") {
        url = "../src/gifts.json";
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        renderItems(data, page, sort, limit);

    } catch (error) {
        console.error(error.message);
    }
}

function getRandomNum(max, limit) {
    const randomNumbers = new Set();
    while (randomNumbers.size < limit) {
        const randomNumber = Math.floor(Math.random() * max); 
        randomNumbers.add(randomNumber); 
    }
    return [...randomNumbers];
}

function prepareData (data, limit, sort, name) {
    let dataPrepared = [];
    const dataLength = data.length;
    let randomNum;
    let count = 0;
    if (!limit) {
        limit = dataLength;
    }

    switch(sort) {
        case "random":
            randomNum = getRandomNum(dataLength, limit);
            for (let i = 0; i < limit; i++ ) {
                dataPrepared.push(data[randomNum[i]]);
            }
            break;

        case "work":
            count = 0;

            for (let i = 0; i < dataLength; i++ ) {
                if (data[i].category === 'For Work') {  
                    count++;
                    if (count <= limit) {
                        dataPrepared.push(data[i]);
                    } else {
                        break;
                    }
                }
            }
            break;

        case "health":
            count = 0;

            for (let i = 0; i < dataLength; i++ ) {
                if (data[i].category === 'For Health') {  
                    count++;
                    if (count <= limit) {
                        dataPrepared.push(data[i]);
                    } else {
                        break;
                    }
                }
            }
            break;

        case "harmony":
            count = 0;

            for (let i = 0; i < dataLength; i++ ) {
                if (data[i].category === 'For Harmony') {  
                    count++;
                    if (count <= limit) {
                        dataPrepared.push(data[i]);
                    } else {
                        break;
                    }
                }
            }
            break;

        default:
            randomNum = getRandomNum(dataLength, limit);
            for (let i = 0; i < dataLength; i++ ) {
                    dataPrepared.push(data[randomNum[i]]);
            }
    }

    return dataPrepared;
}

function prepareHTML(data, page) {
    let path = "img";
    if (page !== 'home') {
        path = "../img";
    }
    const splitText = data.category.split(" ");
    const category = splitText[1].toLowerCase();

    const htmlTemplate = 
    `
        <div class="gifts-card-img">
            <img src="${path}/gifts-items/gift-for-${category}.png" alt="gift picture" >
        </div>
        <div class="gifts-card-text gifts-card-text-${category}">
            <h4>${data.category}</h4>
            <h3>${data.name}</h3>
        </div>
    `;

    return htmlTemplate;
}

function htmlModal(data, page) {
    let path = "img";
    if (page !== 'home') {
        path = "../img";
    }
    const splitText = data.category.split(" ");
    const category = splitText[1].toLowerCase();
    const snowflakeImg = `<img src="${path}/gifts-items/snowflake-modal.svg" class="modal-snowflake">`;
    const snowflakeImgEmpty = `<img src="${path}/gifts-items/snowflake-modal.svg" class="modal-snowflake-empty">`;
    const htmlTemplate = 
    `   
        <div class="gifts-modal-item">
            <div class="gifts-card-img">
            <span class="closeBtn" id="modal-close-btn">
                <svg width="40" height="40" viewBox="0 0 40 40" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10L10 30"></path>
                <path d="M10 10L30 30"></path>
                </svg>
            </span>
            <img src="${path}/gifts-items/gift-for-${category}.png" alt="gift picture" >
            </div>
            <div class="gifts-card-text gifts-card-text-${category}">
                <h4>${data.category}</h4>
                <h3>${data.name}</h3>
                <p>${data.description}</p>
            </div>
            <div class="gifts-modal-powers-container">
                <h4>Adds superpowers to:</h4>
                <div>
                    <div class="gifts-modal-powers">
                        <p>Live</p>
                        <p>${data.superpowers.live}</p>
                        <span>
                            ${snowflakeImg.repeat(data.superpowers.live / 100)}
                            ${snowflakeImgEmpty.repeat(5 - (data.superpowers.live / 100))}
                        </span>
                    </div>
                    <div class="gifts-modal-powers">
                        <p>Create</p>
                        <p>${data.superpowers.create}</p>
                        <span>
                            ${snowflakeImg.repeat(data.superpowers.create / 100)}
                            ${snowflakeImgEmpty.repeat(5 - (data.superpowers.create / 100))}
                        </span>         
                    </div>
                    <div class="gifts-modal-powers">
                        <p>Love</p>
                        <p>${data.superpowers.love}</p>
                        <span>
                            ${snowflakeImg.repeat(data.superpowers.love / 100)}
                            ${snowflakeImgEmpty.repeat(5 - (data.superpowers.love / 100))}
                        </span>                    
                    </div>
                    <div class="gifts-modal-powers">
                        <p>Dream</p>
                        <p>${data.superpowers.dream}</p>
                        <span>
                            ${snowflakeImg.repeat(data.superpowers.dream / 100)}
                            ${snowflakeImgEmpty.repeat(5 - (data.superpowers.dream / 100))}
                        </span>                    
                    </div>
                </div>
            </div>
        </div>
    `;

    return htmlTemplate;
}


function renderItems(data, page, sort, limit) {
    const preparedData = prepareData(data, limit, sort);

    const itemsContainer = document.querySelector(".gifts-cards");

    for (let i = 0; i < preparedData.length; i++) {
        const newItem = document.createElement("div");
        newItem.classList.add("gifts-cards-item");
        newItem.innerHTML = prepareHTML(preparedData[i], page);
        itemsContainer.append(newItem);

        newItem.onclick = () => {
            renderModal(preparedData[i], page);
        }
    }    

}

function renderModal(data, page) {
    const main = document.querySelector(".main-container");

    const newModal = document.createElement("div");
    newModal.classList.add("gifts-modal");
    newModal.innerHTML = htmlModal(data, page);
    main.append(newModal);

    // remove scrollbar
    htmlDocument.setAttribute("style", "overflow: hidden");

    const modalItem = document.querySelector(".gifts-modal-item");
    
    let modalClose = true;
    modalItem.onmouseover = () => {
        modalClose = false;
    }
    modalItem.onmouseout = () => {
        modalClose = true;
    }
    newModal.onclick = () => {
        if (modalClose === true) {
            newModal.remove();
            htmlDocument.removeAttribute("style", "overflow: hidden");
        } 
    }

    // Close Button 
    let closeBtn = document.getElementById("modal-close-btn");
    
    closeBtn.onclick = () => {
        newModal.remove();
        htmlDocument.removeAttribute("style", "overflow: hidden");

    }

}
