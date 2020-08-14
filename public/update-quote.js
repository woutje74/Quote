const fetchQuoteByIdButton = document.getElementById('fetch-by-id');
const updateQuoteButton = document.getElementById('update-quote');
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
      <label for="quote">Quote text:</label>
      <input id="quote" value="${quote.quote}">
      <label for="person">Person:</label>
      <input id="person" value="${quote.person}">
      `;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
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


updateQuoteButton.addEventListener('click', () => {
  const quoteId = document.getElementById('quoteId').value;
  const updatedQuote = document.getElementById('quote').value;
  const author = document.getElementById('person').value;

  fetch(`/api/quotes?id=${quoteId}&quote=${updatedQuote}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text">${updatedQuote}</div>
    <div class="attribution">- ${author}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newQuote);
    })
    .then(resetQuotes()
    );
});