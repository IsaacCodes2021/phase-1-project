//this is a comment

function  getData(){
    fetch("api.coincap.io/v2/assets/")
    .then(resp => resp.json())
    .then(data => console.log(data))
}

getData()