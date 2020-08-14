const { quotes } = require("./data");

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};

const updateElement = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

const deleteQuote = (quoteIndex) => {
  if(quoteIndex){
    quotes.slice(quoteIndex, 1)
    } else {
      return `Quote not found`;
    }
  };

module.exports = {
  getRandomElement,
  getIndexById,
  updateElement,
  deleteQuote
};
