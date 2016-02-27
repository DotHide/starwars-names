var uniqueRandomArray = require('unique-random-array');
var starWarsNames = require('./starwars-names.json');
var getRandomItem = uniqueRandomArray(starWarsNames);

module.exports = {
  all: starWarsNames,
  random: random
}

function random(input) {
  if (input === undefined) {
    return getRandomItem();
  } else if (typeof input === 'number') {
    var randomItems = [];
    for (var i = 0; i < input; i++) {
      randomItems.push(getRandomItem());
    }
    return randomItems;
  } else {
    if (input.length === 1) {
      var filteredStarWarsNames =
        starWarsNames.filter(function(item) {
          return item.charAt(0) === input.toUpperCase();
        });
      return uniqueRandomArray(filteredStarWarsNames)();
    } else {
      throw 'One char only!';
    }
  }
}
