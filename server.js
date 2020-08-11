const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, filterItems } = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    console.log(randomQuote.quote);
    res.send({quote: randomQuote});
})


app.get('/api/quotes', (req, res, next) => {
    const authorQuery = req.query.person;
    if(authorQuery){
    console.log(authorQuery)
    const filtered = quotes.filter((quote) => quote.person == authorQuery
    );
    console.log(filtered);
    res.send({quotes: filtered});
    } else {
    res.send({quotes});
    }
})
app.put('/api/quotes', (req, res, next) => {
    

})


app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query;
    if(newQuote.quote && newQuote.person){
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
})


app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})
