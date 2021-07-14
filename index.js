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
    oneCard.setAttribute('id', `${element[`id`]}`) //
    clicky.textContent = 'info'
    oneCard.setAttribute('class', 'coin-card')
    text.textContent = `#${element['rank']} | ${element[`name`]} | $${coinPrice} | `
    cards.appendChild(oneCard)
    oneCard.appendChild(text)
    text.appendChild(clicky)
    oneCard.appendChild(chartDiv)
    
    let sendName = element['id']
    cardExpand(clicky, sendName ,element)
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
    let marketCap = document.createElement('p')
    let volume24Hr = document.createElement('p')
    let circSuply = document.createElement('p')
    let comments = document.createElement('div')
    let testComment = document.createElement('p')
    let commentsForm = document.createElement('form')  // form needs event listener
    let commentSubmit = document.createElement('button')
    let commentInput = document.createElement('input')
    let commentHead = document.createElement('p')
    
    divNewdiv.setAttribute('class', `${coinName}-info`)
    divNewdiv.setAttribute('id', 'card-expanded')
    comments.setAttribute('id', 'comments')
    marketCap.textContent = "$" + parseFloat(Number(coinArray.marketCapUsd).toFixed(2))
    volume24Hr.textContent = '$' + parseFloat(Number(coinArray.volumeUsd24Hr).toFixed(2))
    circSuply.textContent = '$' + parseFloat(Number(coinArray.supply).toFixed(2))
    testComment.textContent = `${coinArray.name} is in an ACTUAL trashcan today`
    commentInput.setAttribute('placeholder', 'comment')
    commentInput.setAttribute('id', 'commentInput')
    commentSubmit.textContent = 'send'
    commentHead.textContent = 'Comments'
    commentHead.style = 'font-weight: bold; text-align: center;'

    divSelect.appendChild(divNewdiv)
    divNewdiv.appendChild(marketCap)
    divNewdiv.appendChild(volume24Hr)
    divNewdiv.appendChild(circSuply)
    divNewdiv.appendChild(comments)
    comments.appendChild(commentHead)
    comments.appendChild(testComment)
    divNewdiv.appendChild(commentsForm)
    commentsForm.appendChild(commentInput)
    commentsForm.appendChild(commentSubmit)

    newComments(commentsForm, commentInput, comments)
}
// removes card content after button is clicked
function removeCardContent(newClassName) {
    console.log(newClassName)
    document.querySelector(newClassName).remove()

}

// adds new comments
function newComments(form, input, commentSection) {
    form.addEventListener('submit',(e) => {
        e.preventDefault()
        console.log(input.value)
        const newComment = document.createElement('p')
        newComment.textContent = input.value

        commentSection.appendChild(newComment)
    })

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