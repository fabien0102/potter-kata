
var _ = require("lodash");

var DISCOUNT_TABLE = [0, 0.05, 0.1, 0.2, 0.25];
var UNIT_PRICE = 8;

/**
 * Return how many occurences of `number` have in `array`
 * ex:
 * _getCountOf([2,2,2,0,1], 2); // -> 3
 *
 * @param {array} array
 * @param {*} number
 */
function _getCountOf(array, number){
  return _.reduce(array, function(sum, i){
    if (i === number) sum++;
    return sum;
  },0);
}

/**
 * Get discount corresponding of number of different book.
 * @param {number} discountBookCount
 */
function _getDiscount(discountBookCount){
  var discountRate = DISCOUNT_TABLE[discountBookCount - 1];
  var basePrice = UNIT_PRICE * discountBookCount;

  return basePrice * discountRate;
}

/**
 * Get total price.
 * @param {array} booksQuantity - array with quantities of each book
 */
function getTotal(booksQuantity) {
  var totalWithoutDiscount = _.reduce(booksQuantity, function(sum, quantity){
    return sum + quantity * UNIT_PRICE;
  }, 0);

  var max = _.max(booksQuantity);

  var discount = 0;
  for(var i = max; i>0; i--){
    if(_getCountOf(booksQuantity, i)>1) {
      discount += _getDiscount(_getCountOf(booksQuantity, i));
      // Remove 1 for each use discount for next operations.
      _.forEach(booksQuantity, function(quantity, index){
        if (quantity === i) booksQuantity[index] = quantity - 1;
      });
    }
  }

  return totalWithoutDiscount - discount;
};

module.exports = {
  _getCountOf: _getCountOf,
  _getDiscount: _getDiscount,
  getTotal: getTotal
};
