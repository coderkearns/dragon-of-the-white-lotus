const express = require('express');
const app = express();

app.use(express.json());

// Get quotes.json as JSON
app.locals.quotes = require('./quotes.json');

// GET / - Return the number of quotes in the JSON file
// => { status: "success", count: 20 }
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        count: app.locals.quotes.length
    });
});

// GET /quotes - Return all quotes in the JSON file
// => { status: "success", quotes: [ ... ] }
app.get('/quotes', (req, res) => {
    res.json({
        status: 'success',
        quotes: app.locals.quotes
    });
});

// GET /quotes/random - Return a random quote
// => { status: "success", quote: <quote>, id: <quote_id> }
app.get('/quotes/random', (req, res) => {
    const quote = app.locals.quotes[Math.floor(Math.random() * app.locals.quotes.length)];
    res.json({
        status: 'success',
        quote: quote.quote,
        id: quote.id
    });
})

// GET /quotes/:id - Return the quote with the given id
// => { status: "success", quote: <quote>, id: <quote_id> }
app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.json({
            status: 'error',
            message: 'Invalid ID'
        });
        return
    }
    const quote = app.locals.quotes.find(q => q.id === id);
    if (!quote) {
        res.json({
            status: 'error',
            message: 'Quote not found'
        });
        return
    }
    res.json({
        status: 'success',
        quote: quote.quote,
        id
    });
})

module.exports = app;