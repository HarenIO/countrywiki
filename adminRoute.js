const express = require('express')
const adminRoute = express.Router()
const db = require('./db')
const adminKey = 'secretkey'
const countries = db.countries

adminRoute.post('/add', (req, res) => {

  const { key, country, population, capital, language } = req.query

  if (key !== adminKey) {
    res.status(401).end('Incorrect key')
    return
  }

  if (!country || !population || !capital || !language) {
    res.status(400).end('Invalid request: Missing queries')
    return
  }

  if (isNaN(Number(population)) || Number(population) < 0) {
    res.status(400).end('Invalid population')
  }

  if (country.length > 50 || capital.length > 50 || language.length > 50) {
    res.status(400).end('Input too long')
  }

  const existingCountry = countries.find((country) => country.country === country)
  if (existingCountry) {
    res.status(409).end('Country already exists')
  }

  const newCountry = {
    country: country,
    population: Number(population),
    capital: capital,
    language: language
  }
  countries.push(newCountry)
  console.log(countries)
  res.status(201).send('Country created')
})



adminRoute.post('/delete', (req, res) => {
  const {key, country} = req.query
  
  if(key !== adminKey){
    res.status(401).end('Incorrect key')
  }

  if(!country){
    res.status(400).end('Invalid request: Missing country')
  }

  const existingCountry = countries.findIndex((c) => c.country === country)
  if(existingCountry === -1){
    res.status(404).end('Country not found')
    console.log(countries)
    return
  }

  countries.splice(existingCountry, 1)
  res.status(200).end('Country deleted')

  console.log(countries)

})


adminRoute.post('/edit', (req, res) => {
  const { key, country, population, capital, language } = req.query

  if (key !== adminKey) {
    res.status(401).end('Incorrect key')
    return
  }

  if (!country || !population || !capital || !language) {
    res.status(400).end('Invalid request: Missing queries')
    return
  }

  if (isNaN(Number(population)) || Number(population) < 0) {
    res.status(400).end('Invalid population')
  }

  if (country.length > 50 || capital.length > 50 || language.length > 50) {
    res.status(400).end('Input too long')
  }

  const existingCountry = countries.find((c) => c.country === country)
  if(!existingCountry){
    res.status(404).end('Country not found')
    console.log(countries)
    return
  }
  existingCountry.population = Number(population)
  existingCountry.capital = capital
  existingCountry.language = language
  res.status(200).send('Country successfully edited')
  console.log(countries)
})

module.exports.adminRoute = adminRoute