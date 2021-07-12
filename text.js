const url = 'http://localhost:3000/allCountries'

function fetchData() {
    fetch(url)
    .then(req => req.json())
    .then(data => data.forEach((e) => displayCounrtyNames(e)))
}
fetchData()

function displayCounrtyNames(countryObject) {
    const allCountries = document.querySelector('#countries')
    let newDiv = document.createElement('div')
    newDiv.setAttribute('class' ,`${countryObject.country}`) 
    let newCounrty = document.createElement('h3')
    newCounrty.textContent = countryObject.country
    let newUl = document.createElement('ul')
    newUl.setAttribute('id', 'country info')
    let capital = document.createElement('li')
    capital.textContent = `Capital: ${countryObject['capital_city']}`
    let population = document.createElement('li')
    population.textContent = `population: ${countryObject.population}`
    let lifeExpectancy = document.createElement('li')
    lifeExpectancy.textContent = `life expectancy: ${countryObject['life_expectancy']} years`
    let location = document.createElement('li')
    location.textContent = `Geographic Location: ${countryObject.location}`
    allCountries.append(newDiv)
    newDiv.appendChild(newCounrty)
    newDiv.appendChild(newUl)
    newDiv.appendChild(capital)
    newDiv.appendChild(population)
    newDiv.appendChild(lifeExpectancy)
    newDiv.appendChild(location)
}

function displayButtons(){
    const btnDiv = document.querySelector('#sort-buttons')
    const btn1 = document.createElement('button')
}