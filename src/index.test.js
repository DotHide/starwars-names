var expect = require('chai').expect;
var starWars = require('./index.js');

describe('starwars-names', function() {
  describe('all', function() {
    it('should be an array of strings', function() {
      expect(starWars.all).to.satisfy(isArrayOfStrings);

      function isArrayOfStrings(array) {
        return array.every(function(item) {
          return typeof item === 'string';
        })
      }
    });

    it('should contain `DotHide`', function() {
      expect(starWars.all).to.include('DotHide');
    });
  });

  describe('random', function() {
    it('should return a random item from the starWars.all', function() {
      var randomItem = starWars.random();
      expect(starWars.all).to.include(randomItem);
    });

    it('should return an array of random items if passed a number', function() {
      var randomItems = starWars.random(3);
      expect(randomItems).to.have.length(3);
      randomItems.forEach(function(item) {
        expect(starWars.all).to.include(item);
      });
    });

    it('should return a random item from the starWars by a prefix char', function() {
      var randomItem = starWars.random('s');
      expect(randomItem).to.satisfy(isCharAt);

      function isCharAt(item) {
        return !!item && item.charAt(0) === 'S';
      }
    });

    it('should throw an error if you enter char > 1', function () {
      expect(function() {
        starWars.random('ss');
      }).to.throw(/only/);
    });
  });
});
