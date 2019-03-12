const URL = '/coffee.json';

let orderList = [];

function accumulateList(actualData) {
    orderList = [
        // ...orderList,
        ...Object.values(actualData)
    ];
    storeOrders(orderList);
}

fetch(URL)
    .then(function (response) {
        return response.json();
    })
    .then(accumulateList);

    const storageKey = "orders";

function storeOrders(arrayOfOrders) {
    const jsonOrders = JSON.stringify(arrayOfOrders);
    localStorage.setItem(storageKey, jsonOrders);
}

function loadOrders() {
    const jsonOrders = localStorage.getItem(storageKey);
    const arrayOfOrders = JSON.parse(jsonOrders);
    return arrayOfOrders;
}

function drawOrderToDetail(orderObject){
    const detail = document.querySelector('[data-detail');
    detail.textContent = "";

    const idDiv = document.createElement('div');
    const cofeeDiv = document.createElement('div');
    const emailDiv = document.createElement('div');

    idDiv.textContent = `ID: ${orderObject._id}`;
    cofeeDiv.textContent = `Cofee: ${orderObject.coffee}`;
    emailDiv.textContent = `Email: ${orderObject.emailAddress}`;

    detail.appendChild(idDiv);
    detail.appendChild(cofeeDiv);
    detail.appendChild(emailDiv);  
}

function drawSingleOrderToList(orderObject) {
    const email = orderObject.emailAddress;
    const anchorElement = document.createElement('a');
    anchorElement.textContent = email;
    anchorElement.addEventListener('click', function(){ 
        drawOrderToDetail(orderObject);
    });
    
    const emailList = document.createElement('li');
    emailList.appendChild(anchorElement);

    const listArea = document.querySelector('[data-list]');
    listArea.appendChild(emailList);
}

function drawListOfOrders() {
    orderList.forEach(drawSingleOrderToList);
}

function sortByEmail(obj1, obj2) {
    const letter1 = obj1.emailAddress[0].toLowerCase();
    const letter2 = obj2.emailAddress[0].toLowerCase();

    if (letter1 < letter2) {
        return -1;
    } else if (letter2 < letter1) {
        return 1;
    }
    return 0;
}

function main() {
    let ordersInLocalStorage = loadOrders();
    if (ordersInLocalStorage) {
        orderList = [
            ...ordersInLocalStorage.sort(sortByEmail)
        ];
        drawListOfOrders();
    }

}

main();