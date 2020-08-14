const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById, updateElement } = require('./utils');


let idCounter = 13;

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    console.log(randomQuote.quote);
    res.send({quote: randomQuote});
})


app.get('/api/quotes', (req, res, next) => {
    const author = req.query.person;
    const idQuery = req.query.id;
    if(idQuery){
    console.log(idQuery)
    const filtered = quotes.filter((quote) => quote.id == idQuery
    );
    console.log(filtered);
    res.send({quotes: filtered});
    } else if (author) {
        console.log(author)
    const filtered = quotes.filter((quote) => quote.person == author
    );
    console.log(filtered);
    res.send({quotes: filtered});
    } else {
    res.send({quotes});
    }
})

app.put('/api/quotes', (req, res, next) => {
    const updateIndex = getIndexById(req.query.id, quotes)
    const updatedQuote = req.query;
    if(updateIndex !== -1 && !req.query.person){
            updateElement(req.query.id, updatedQuote, quotes);
            res.send(quotes[updateIndex]);
          } else {
            res.status(404).send('Query update not allowed');
          }
})


app.post('/api/quotes', (req, res, next) => {
    const newQuote = {
        "id": null,
        "quote": null,
        "person": null
    }
    newQuote.id = (idCounter + 1);
    newQuote.quote = req.query.quote;
    newQuote.person = req.query.person;
    if(newQuote.quote && newQuote.person){
        quotes.push(newQuote);
        idCounter++;
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
})

app.delete('/api/quotes', (req, res, next) => {
    const quoteIndex = getIndexById(req.query.id, quotes);
    console.log(`Index of ${req.query.id} = ${quoteIndex}`);
  if (quoteIndex !== -1) {
    quotes.splice(quoteIndex, 1);
    res.status(204).send(quotes[quoteIndex]);
  } else {
    res.status(404).send();
  }
})

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})
