const express = require('express')
const adminRoute = express.Router()
const db = require('./db')
const adminKey = 'secretkey'
const countries = db.countries

adminRoute.post('/add', (req, res) => {

  const { key, country, population, capital, language } = req.body

  if (key !== adminKey) {
    return res.status(401).end('Incorrect key')
  }

  if (!country || !population || !capital || !language) {
    return res.status(400).end('Invalid request: Missing queries')

  }

  if (isNaN(Number(population)) || Number(population) < 0) {
    return res.status(400).end('Invalid population')
  }

  if (country.length > 50 || capital.length > 50 || language.length > 50) {
    return res.status(400).end('Input too long')
  }

  const existingCountry = countries.find((c) => c.country.toLowerCase() === country.toLowerCase())
  if (existingCountry) {
    return res.status(409).end('Country already exists')
  }

  const newCountry = {
    country: country,
    population: Number(population),
    capital: capital,
    language: language
  }
  countries.push(newCountry)
  return res.status(201).send('Country created')
})



adminRoute.delete('/delete', (req, res) => {
  const { key, country } = req.query

  if (key !== adminKey) {
    return res.status(401).end('Incorrect key')
  }

  if (!country || typeof country !== 'string') {
    return res.status(400).end('Invalid request: Missing country')
  }

  const existingCountry = countries.findIndex((c) => c.country.toLowerCase() === country.toLowerCase())
  if (existingCountry === -1) {
    return res.status(404).end('Country not found')

  }

  countries.splice(existingCountry, 1)
  return res.status(200).end('Country deleted')
})


adminRoute.put('/edit', (req, res) => {

  const { key, country, population, capital, language } = req.body

  if (key !== adminKey) {
    res.status(401).end('Incorrect key')
    return
  }

  if (!country || !population || !capital || !language) {
    return res.status(400).end('Invalid request: Missing queries')
  }

  if (isNaN(Number(population)) || Number(population) < 0) {
    return res.status(400).end('Invalid population')
  }

  if (country.length > 50 || capital.length > 50 || language.length > 50) {
    return res.status(400).end('Input too long')
  }

  const existingCountry = countries.find((c) => c.country.toLowerCase() === country.toLowerCase())
  if (!existingCountry) {
    return res.status(404).end('Country not found')

  }
  existingCountry.population = Number(population)
  existingCountry.capital = capital
  existingCountry.language = language
  return res.status(200).send('Country successfully edited')
})

module.exports.adminRoute = adminRoute