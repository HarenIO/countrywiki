const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db')
const { adminRoute } = require('./adminRoute.js')

const countries = db.countries

app.use(express.json())
app.use(cors())
app.use('/admin', adminRoute)


app.get('/getcountries', (req, res) => {
  res.json(db)
})

app.get('/countries', (req, res) => {

  const { country } = req.query

  if (!country || typeof country !== 'string') {
    return res.status(400).end('Invalid country')
  }

  const foundCountry = countries.find((c) => c.country === country)
  if (!foundCountry) {
    return res.status(404).end('Country not found')
  }
  res.json(foundCountry)
})


app.listen(5050, () => console.log('Server listening on port 5050'))