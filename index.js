const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8000

const app = express()

const url = "https://www.yelp.com/search?cflt=restaurants&find_loc=Austin%2C+TX"

axios(url)
.then(res => {
    const html= res.data
    const $ = cheerio.load(html)
    const articles = []

    $('.css-kagwww', html).each(function(){
       const title = $(this).text()
       const site = $(this).find('a').attr('href')
       articles.push({
           title,
           site
       })
    })
    console.log(articles)
}).catch(error => console.log(error))


app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))

