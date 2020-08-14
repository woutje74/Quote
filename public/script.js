const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');
const updateQuoteButton = document.getElementById('update-quote');


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

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `
        <div id="${quote.id}" value="${quote.id}">${quote.id}
          <div id="quote${quote.id}">
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>
            <div><button id="update-quote">Update Quote</button></div>
            <div><button id="delete-quote" onclick="deleteQuoteFunction(${quote.id})">Delete Quote</button></div>
          </div>
        </div>`;
      quoteContainer.appendChild(newQuote)
    });
    /*const deleteQuoteDirect = document.getElementById('delete-quote');
    deleteQuoteDirect.addEventListener('click', deleteQuoteFunction);*/
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

const deleteQuoteFunction = (quoteId) => {
  /*const quoteId = document.getElementById('quote-id').value;*/
  console.log(`Looking for ${quoteId}`);
  fetch(`api/quotes?id=${quoteId}`, {method: 'DELETE'})
  .then(response => response.text())
  .then(() => {
    const newMessage = document.getElementById(`${quoteId}`);
    const oldChild = document.getElementById(`quote${quoteId}`);
    newMessage.innerHTML = `
    <h3>Your quote was deleted!</h3>`;
    newMessage.removeChild(oldChild);
    })
  .catch(error => console.log('error', error));
};


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



