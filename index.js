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
        coinList(result.data)
        marketCap(result.data)
        dailyVolume(result.data)
        searchCoins()
        biggestChange(result.data)
    })
    .catch(error => console.log('error', error));
    
}
// fetch pricedata for id specific coins 
// grabs the last 24 elements of the array, each worth one hour
function getPriceHistory(id) {
    fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=h1`)
    .then(response => response.json())
    //add a function that sends out each data set to grab usdValues and makes a new array
    .then(data => buildPriceArray(data.data.slice(-24), id))
}

// takes in new array of priceHistoyy objects and gets price history into a new array
function buildPriceArray(pricreObj, nameValue) {
    let priceArray = []
    pricreObj.forEach(element => {
        priceArray.push(element.priceUsd)
    })
    // changes the color of the line based on day open price
    let colorVal = '(0,0,0)'
    if (parseFloat(priceArray[0]) < parseFloat(priceArray[23])) {
        colorVal = 'rgb(51,255,51)'
    }
    else if (parseFloat(priceArray[0]) > parseFloat(priceArray[23])){
        colorVal = 'rgb(255,0,0)'
    }
    buildGraph(nameValue, priceArray, colorVal)
}

// takes in array of price history and assigns it to the data points needed for the graph?
function buildGraph(currencyName, priceHistory, color) {
    let chart = document.createElement('canvas')
    chart.setAttribute('id', 'lineChart')
    chart.setAttribute('height', '400')
    chart.setAttribute('width', '600')
    let lineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            datasets: [{
              label: `${currencyName} 24hr price mocement`,
              data: priceHistory,
              fill: false,
              borderColor: color,
              tension: 0.1
            }]
          }
    })
    let coinCard = document.querySelector(`#${currencyName}`)
    coinCard.appendChild(chart)
}

// display single coin by array function
function displayCoins(coinArray) {
    coinArray.forEach(element => {
    let cards = document.querySelector('#cards-container')
    let oneCard = document.createElement('div')
    let coinPrice = parseFloat(Number(element['priceUsd'])).toFixed(2)
    let text = document.createElement('h2')
    let clicky = document.createElement('button')
    
    text.setAttribute('id', 'card-header')
    oneCard.setAttribute('id', `${element[`id`]}`) //
    text.setAttribute('id', 'card-title')
    clicky.textContent = 'info'
    clicky.setAttribute("class", "button is-small is-link")
    oneCard.setAttribute('class', 'coin-card')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${Number(coinPrice).toLocaleString('en-US')} | `
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    text.appendChild(clicky)
    
    let sendName = element['id']
    cardExpand(clicky, sendName ,element)
    getPriceHistory(element.id)
    });
}

// Card Expansion toggle Event Listener
function cardExpand(buttonElement, coinName, coinArr) {
    let evenThenDisplay = 1 
    buttonElement.addEventListener('click', () => {
        evenThenDisplay += 1
        // to display the new content
        if ((evenThenDisplay % 2) == 0) {
            buttonElement.textContent = 'collapse'
            addCardContent(coinName, coinArr)
        }
        // to remove the new content
        else if ((evenThenDisplay % 2) != 0) {
            buttonElement.textContent = 'info'
            let className = `.${coinName}-info`
            removeCardContent(className)
        }
    })
}

// adds card content after button is clicked
function addCardContent(coinName, coinArray) {
    let divSelect = document.querySelector(`#${coinArray.id}`)
    let divNewdiv = document.createElement('div')
    let divMarketInfo = document.createElement('div')
    let marketCap = document.createElement('p')
    let volume24Hr = document.createElement('p')
    let circSuply = document.createElement('p')
    let comments = document.createElement('div')
    let testComment = document.createElement('p')
    let commentsForm = document.createElement('form')
    let commentSubmit = document.createElement('button')
    let commentInput = document.createElement('input')
    let commentHead = document.createElement('p')
    let lineChart = document.createElement('canvas')
       
    divMarketInfo.setAttribute('class', `${coinName}-info-expanded`)
    divMarketInfo.setAttribute('id', `dropdown-info`)

    divNewdiv.setAttribute('class', `${coinName}-info`)
    divNewdiv.setAttribute('id', 'card-expanded')
    comments.setAttribute('id', 'comments')
    commentInput.setAttribute('placeholder', 'comment')
    commentInput.setAttribute('id', 'commentInput')
    commentsForm.setAttribute('id', 'comment-form')
    marketCap.textContent = "Market cap: $" + parseFloat(Number(coinArray.marketCapUsd).toFixed(2)).toLocaleString('en-US')
    volume24Hr.textContent = '24 hour volume: $' + parseFloat(Number(coinArray.volumeUsd24Hr).toFixed(2)).toLocaleString('en-US')
    circSuply.textContent = 'circulating supply: ' + parseFloat(Number(coinArray.supply).toFixed(2)).toLocaleString('en-US')
    marketCap.setAttribute('id', 'coin-data')
    volume24Hr.setAttribute('id', 'coin-data')
    circSuply.setAttribute('id', 'coin-data')
    testComment.textContent = `${coinArray.name} is in an ACTUAL trashcan today`
    commentSubmit.textContent = 'send'
    commentHead.textContent = 'Comments'
    commentHead.style = 'font-weight: bold; text-align: center;'
    lineChart.setAttribute('id', 'lineChart')
    lineChart.setAttribute('height', '400')
    lineChart.setAttribute('width', '400')

    divSelect.appendChild(divNewdiv)
    divNewdiv.appendChild(divMarketInfo)
    divMarketInfo.appendChild(marketCap)
    divMarketInfo.appendChild(volume24Hr)
    divMarketInfo.appendChild(circSuply)
    divNewdiv.appendChild(comments)
    comments.appendChild(commentHead)
    
    divNewdiv.appendChild(commentsForm)
    commentsForm.appendChild(commentInput)
    commentsForm.appendChild(commentSubmit)

    newComments(commentsForm, commentInput, comments)
}

// removes card content after button is clicked
function removeCardContent(newClassName) {
    // console.log(newClassName)
    document.querySelector(newClassName).remove()
}

// adds new comments
function newComments(form, input, commentSection, time) {
    form.addEventListener('submit',(e) => {
        e.preventDefault()
        const newComment = document.createElement('p')
        newComment.setAttribute('id', 'new-comment')
        newComment.textContent = input.value
        let time = document.createElement('aside')
        let currentDate = new Date();
        
        time.style = 'float:right; text-align: right'
        time.textContent = currentDate.getHours() + ":" + currentDate.getMinutes();
        commentSection.appendChild(newComment)
        newComment.appendChild(time)
    })
}

//goes into
function sortPriceHistory() {
    let price24Hrs = []
    document.querySelectorAll('.coin-card').forEach(e => {
        debugger
        price24Hrs.push(e.id
    )})
    //console.log(price24Hrs)
    price24Hrs.forEach(e => {
        //console.log(e)
        getPriceHistory(e)
        //for each priceUsd into a new array
    })
    
}

// render list of coins
function coinList(coinArray){
    coinArray.forEach(coinObj => {
        let name = coinObj.name
        let symbol = coinObj.symbol
        let rank = coinObj.rank
        let coinFlux = parseFloat(coinObj.changePercent24Hr).toFixed(1)
        let list = document.querySelector('#rankedList')
        let listCoin = document.createElement('tr')
        if ((rank % 2) === 0){
            listCoin.setAttribute('id', 'evenRank')
        }else {
            listCoin.setAttribute('id', 'oddRank')
        }
        if (coinFlux > 0){
            listCoin.setAttribute('class', 'positive')
        } else {
            listCoin.setAttribute('class', 'negative')
        }
        listCoin.innerHTML = `<td class = 'rank'>${rank}</td>
                              <td class = 'name'>${name}</td>
                              <td class = 'symbol'>${symbol}</td>
                              <td class = 'flux'>${coinFlux}</td>
                              <td class = 'link'><a href = '#${coinObj.id}' class = 'button is-small is-link is-rounded' >Go To Coin</a></td>`
        list.appendChild(listCoin)
    })
}

// calculate market cap and render to page
function marketCap (coinArray){
   let coinCap = coinArray.map((coinObj) => parseFloat(coinObj.marketCapUsd))
   let totalCap = coinCap.reduce((cap,coin) => cap + coin, 0)
   let market = document.querySelector('#marketCap')
   market.textContent = `Market Cap: $${Number(totalCap.toFixed(2)).toLocaleString('en-US')}`
}

// calculate daily movment and render to page
function dailyVolume(coinArray){
    let coinVolume = coinArray.map((coinObj) => parseFloat(coinObj.volumeUsd24Hr) )
    let totalDailyVolume = coinVolume.reduce((volume, coin) => volume + coin, 0)
    let volume = document.querySelector('#dailyVolume')
    volume.textContent = `24Hr Volume: $${Number(totalDailyVolume.toFixed(2)).toLocaleString('en-US')}`
    // console.log(totalDailyVolume)
}
// search function
function searchCoins(){
    let searchArray = []
    document.querySelector('#search').addEventListener('submit', (e) => {
        e.preventDefault()
        let searchValue = e.target[0].value
        let coinsArray = document.querySelectorAll('.coin-card').forEach(element => searchArray.push(element.id))
        let lowerCaseSearch = searchValue.toLowerCase()
        let splitSearch = lowerCaseSearch.split(' ')
        let searchTerm = splitSearch.join('-')
        let searchResult = searchArray.includes(searchTerm)
        if (searchResult === true){
            let foundCard = document.querySelector(`#${searchTerm}`)
            foundCard.scrollIntoView()
        } else {
            alert("Coin not found.")
        } 
    })
}
function biggestChange(coinArray){
    let changeArray = coinArray.map(coinObj =>{
        const container = {}
        container.name = coinObj.name
        container.change = coinObj.changePercent24Hr
        return container
    })
    let biggestGrowth = Math.max.apply(Math,changeArray.map(o => o.change))
    let biggestLoss = Math.min.apply(Math,changeArray.map(o => o.change))
    let biggestGrowthCoin = changeArray.find(o => o.change == biggestGrowth)
    let biggestLossCoin = changeArray.find(o => o.change == biggestLoss)
    let DOMGains = document.querySelector('.biggestGains')
    let DOMLosses = document.querySelector('.biggestLosses')
    DOMGains.innerHTML = `Biggest Daily Gains: ${biggestGrowthCoin.name} @ <span id = 'gains'>${parseFloat(biggestGrowthCoin.change).toFixed(2)}</span>`
    DOMLosses.innerHTML = `Biggest Daily Losses: ${biggestLossCoin.name} @ <span id = 'losses'>${parseFloat(biggestLossCoin.change).toFixed(2)}</span`
}