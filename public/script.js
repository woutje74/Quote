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
            <textarea id="quote-text${quote.id}" value="${quote.quote}" rows="3" cols="50">${quote.quote}</textarea>
            <div id="attribution${quote.id}" value="${quote.person}">- ${quote.person}</div>
            <div><button id="update-quote" onclick="updateQuoteFunction(${quote.id})">Update Quote</button>
            <button id="delete-quote" onclick="deleteQuoteFunction(${quote.id})">Delete Quote</button></div>            
            <div></div>
          </div>
        </div>`;
      quoteContainer.appendChild(newQuote)
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

const deleteQuoteFunction = (quoteId) => {
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

const updateQuoteFunction = (quoteId) => {
  const updatedQuote = document.getElementById(`quote-text${quoteId}`).value;
  const updatedPerson = document.getElementById(`attribution${quoteId}`).value;
  fetch(`/api/quotes?id=${quoteId}&quote=${updatedQuote}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then((response) => {
    const newMessage = document.getElementById(`${quoteId}`);
    newMessage.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text">${response.quote}</div>
    <div class="attribution">- ${response.person}</div>
    `
    })
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



