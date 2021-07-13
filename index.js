// function initialization 
getCoins()

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
// fetch data from API as object
function getCoins() {
    fetch("https://api.coincap.io/v2/assets", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result.data)
        displayCoins(result.data)
    })
    .catch(error => console.log('error', error));
    
}

// display single coin by array function
function displayCoins(coinArray) {
    coinArray.forEach(element => {
    let cards = document.querySelector('#cards-container')
    let oneCard = document.createElement('div')
    let coinPrice = parseFloat(Number(element['priceUsd'])).toFixed(2)
    let chartDiv = document.createElement('div')
    chartDiv.innerHTML = ""
    oneCard.setAttribute('id', `${element[`symbol`]}`)
    oneCard.setAttribute('class', 'coin-card')
    let text = document.createElement('h1')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${coinPrice}`
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    oneCard.appendChild(chartDiv)
    });
}
