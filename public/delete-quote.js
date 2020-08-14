const fetchQuoteByIdButton = document.getElementById('fetch-by-id');
const deleteQuoteButton = document.getElementById('delete-quote');
const newQuoteContainer = document.getElementById('new-quote');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `
      <div id="quote-id">${quote.id}</div>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      `;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

const renderMessage = () => {
    quoteContainer.innerHTML = `<p>Quote has been succesfully deleted.</p>` 
  }

fetchQuoteByIdButton.addEventListener('click', () => {
    const quoteId = document.getElementById('quoteId').value;
    fetch(`/api/quotes?id=${quoteId}`)
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
    const quoteId = document.getElementById('quoteId').value;
    fetch(`api/quotes?id=${quoteId}`, {method: 'DELETE'})
    .then(response => response.text())
    .then(() => {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = `
      <h3>Your quote was deleted!</h3>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `
      newQuoteContainer.appendChild(newMessage);
      })
    .then(resetQuotes())
    .catch(error => console.log('error', error));
  });
