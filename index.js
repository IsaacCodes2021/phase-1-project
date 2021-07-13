

function  getData(){
    fetch("https://api.coincap.io/v2/assets/")
    .then(resp => resp.json())
    .then(json => json.data)
}
getData()

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
})
