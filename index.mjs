import Axios from "axios"
import Cheerio from "cheerio"  // like jQuery
import Express from "express"

const PORT = 8000

// URl to scrape
const URL = 'http://www.theguardian.com/uk'

const getAndParseUrlsMarkup = async () => {
    
    try {
        const response = await Axios(URL)
        const html = response.data
        const $ = Cheerio.load(html)
        const articles = []  // we're saving multiple html elements here

        //  forEach(element) w/class of "fc-item__title" we grab text/title and a url
        $('.fc-item__title', html).each(function() {  // can't use arrow-function because of 'this' keyword
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({title, url})
        })

        console.log(articles);

    } catch (error) {
        console.log(error);
    }
        
}
getAndParseUrlsMarkup()

const app = Express()
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`))
