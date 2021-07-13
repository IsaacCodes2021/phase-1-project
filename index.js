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
    chartDiv.innerHTML = 
    `<!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
      <div id="tradingview_fead9"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/${element['symbol']}/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
      new TradingView.widget(
      {
      "autosize": true,
      "symbol": "${element['symbol']}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "container_id": "tradingview_fead9"
    }
      );
      </script>
    </div>
    <!-- TradingView Widget END -->`
    oneCard.setAttribute('id', `${element[`symbol`]}`)
    oneCard.setAttribute('class', 'coinCard')
    let text = document.createElement('h1')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${coinPrice}`
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    oneCard.appendChild(chartDiv)
    });
}
