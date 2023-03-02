const select = document.querySelector('select')
const countryInfo = document.querySelector('#country-info')
const updateInfoBtn = document.querySelector('#update-info')

let countries = []


const getCountries = async () => {
  const res = await fetch('http://localhost:5050/getcountries')
  const data = await res.json()
  countries = data.countries

  for (let country of countries) {
    const option = document.createElement('option')
    option.innerText = country.country
    select.appendChild(option)
  }
}
getCountries()

const clearSelect = () => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
}

const clearCountryInfo = () => {
  while (countryInfo.firstChild) {
    countryInfo.removeChild(countryInfo.firstChild);
  }
}



updateInfoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  clearSelect()
  getCountries()
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  // console.log(countries)
  const country = {
    country: select.value
  }
  const data = JSON.stringify(country)
  fetch('http://localhost:5050/countries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
    .then(res => res.json()
      .then(data => {
        clearCountryInfo()
        const country = document.createElement('p')
        country.innerText = `Country: ${data.country}`
        const population = document.createElement('p')
        population.innerText = `Population: ${data.population}`
        const capital = document.createElement('p')
        capital.innerText = `Capital: ${data.capital}`
        const language = document.createElement('p')
        language.innerText = `Language: ${data.language}`
        countryInfo.appendChild(country)
        countryInfo.appendChild(population)
        countryInfo.appendChild(capital)
        countryInfo.appendChild(language)
      }))

})