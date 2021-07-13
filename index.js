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
    chartDiv.innerHTML = `<!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container" style = "height: 363px">
      <div id="tradingview_537d0"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
      new TradingView.widget(
      {
      "width": 400,
      "height": 363,
      "symbol": "NASDAQ:AAPL",
      "interval": "15",
      "timezone": "America/Los_Angeles",
      "theme": "dark",
      "style": "2",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "container_id": "tradingview_537d0"
    }
      );
      </script>
    </div>
    <!-- TradingView Widget END -->`
    chartDiv.setAttribute('class', 'chart-container')
    oneCard.setAttribute('id', `${element[`name`]}`)
    oneCard.setAttribute('class', 'coin-card')
    let text = document.createElement('h1')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${coinPrice}`
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    oneCard.appendChild(chartDiv)
    });
}

// render list of coins
function coinList(coinArray){
    coinArray.forEach(coinObj => {
        let name = coinObj.name
        let symbol = coinObj.symbol
        let rank = coinObj.rank
        let list = document.querySelector('#rankedList')
        let listCoin = document.createElement('li')
        listCoin.textContent = `${rank} ${name} ${symbol}`
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