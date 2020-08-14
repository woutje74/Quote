const { quotes } = require("./data");

const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');
const updateQuoteButton = document.getElementById('update-quote');
const deleteQuoteButton = document.getElementById('delete-quote');  


const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderMessage = response => {
  quoteContainer.innerHTML = `<p>Quote has been succesfully deleted.</p>
  <p>QuoteId: ${response.id}</p>` 
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div><div id="quote-id"> ${quote.id}</div><div class="quote-text">${quote.quote}</div></div>
      <div class="attribution">- ${quote.person}</div>
      <div><button id="update-quote">Update Quote</button></div>
      <div><button id="delete-quote">Delete Quote</button></div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}



fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

deleteQuoteButton.addEventListener('click', () => {
  const quoteId = document.getElementById('quote.id').value;
  fetch(`api/quotes?id=${quoteId}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then( response => {
     renderMessage(response);
  })
});