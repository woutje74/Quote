const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const filterItems = (arr, query) => {
  return arr.filter(el => el.indexOf(query) !== -1)
}

module.exports = {
  getRandomElement,
  filterItems
};
