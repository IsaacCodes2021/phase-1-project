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
    let text = document.createElement('h1')
    let clicky = document.createElement('button')
    // chartDiv.innerHTML =`<!-- TradingView Widget BEGIN -->
    // <div class="tradingview-widget-container">
    //   <div id="tradingview_f089c"></div>
    //   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
    //   <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    //   <script type="text/javascript">
    //   new TradingView.widget(
    //   {
    //   "autosize": true,
    //   "symbol": "NASDAQ:AAPL",
    //   "interval": "15",
    //   "timezone": "Etc/UTC",
    //   "theme": "light",
    //   "style": "2",
    //   "locale": "en",
    //   "toolbar_bg": "#f1f3f6",
    //   "enable_publishing": false,
    //   "hide_top_toolbar": true,
    //   "container_id": "tradingview_f089c"
    // }
    //   );
    //   </script>
    // </div>
    // <!-- TradingView Widget END -->`
    //chartDiv.setAttribute('class', 'chart-container')
    oneCard.setAttribute('id', `${element[`name`]}`)
    clicky.textContent = 'info'
    oneCard.setAttribute('class', 'coin-card')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${coinPrice} | `
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    text.appendChild(clicky)
    oneCard.appendChild(chartDiv)

    cardExpand(clicky)
    });
}

// Card Expansion toggle Event Listener
function cardExpand(buttonElement) {
    let evenThenDisplay = 1 
    buttonElement.addEventListener('click', () => {
        evenThenDisplay += 1
        //to display the new content
        if ((evenThenDisplay % 2) == 0) {
            console.log(evenThenDisplay + ' even')
            addCardContent()
        }
        //to remove the new content
        else if ((evenThenDisplay % 2) != 0) {
            console.log(evenThenDisplay + ' odd')
            removeCardContent()
        }
    })
}

function addCardContent() {
    //let newDiv = document.querySelector('')
}

function removeCardContent() {

}

// render list of coins
function coinList(coinArray){
    coinArray.forEach(coinObj => {
        let name = coinObj.name
        let symbol = coinObj.symbol
        let rank = coinObj.rank
        let list = document.querySelector('#rankedList')
        let listCoin = document.createElement('li')
        listCoin.textContent = `${rank} | ${name} | ${symbol}`
        list.appendChild(listCoin)
    })
}

// calculate market cap and render to page
function marketCap (coinArray){
   let coinCap = coinArray.map((coinObj) => parseInt(coinObj.marketCapUsd))
   let totalCap = coinCap.reduce((cap,coin) => cap + coin, 0) 
   let market = document.querySelector('#marketCap')
   market.textContent = `Market Cap: ${totalCap}`
}

// calculate daily movment and render to page
function dailyVolume(coinArray){
    let coinVolume = coinArray.map((coinObj) => parseInt(coinObj.volumeUsd24Hr) )
    let totalDailyVolume = coinVolume.reduce((volume, coin) => volume + coin, 0)
    let volume = document.querySelector('#dailyVolume')
    volume.textContent = `24Hr Volume: ${totalDailyVolume}`
    console.log(totalDailyVolume)
}