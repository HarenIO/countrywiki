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

app.post('/countries', (req, res) => {
  const foundCountry = countries.find((country) => country.country === req.body.country)
/*   const data = JSON.stringify(foundCountry)
 */  res.json(foundCountry)
})


app.listen(5050, () => console.log('Server listening on port 5050'))