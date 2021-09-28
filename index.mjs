import Axios from "axios"
import Cheerio from "cheerio"  // like jQuery
import Express from "express"

const PORT = 8000
// URl to scrape
const URL = 'http://www.theguardian.com/uk'

const getURL = async () => {

    const response = await Axios(URL)
    
    try {
        const html = response.data
        const $ = Cheerio.load(html)
        const articles = []

        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({title, url})
        })

        console.log(articles);

    } catch (error) {
        console.log(error);
    }
        
} 
getURL()

const app = Express()
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`))
