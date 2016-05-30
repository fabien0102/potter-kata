var should = require("should");
var potterKata = require("../index.js");
var _ = require("lodash");

describe("getTotal", function (){
  it("should return correct value for simple case", function (){
    (potterKata.getTotal([1,1])).should.equal(8*2*0.95);
  });

  it("should return 8EUR with 1 book", function (){
    (potterKata.getTotal([1])).should.equal(8);
  });

  it("should return 16EUR with 10% discount", function (){
    (potterKata.getTotal([1,1])).should.equal(8*2*0.95);
  });

  it("should works for badass case", function(){
    (potterKata.getTotal([5,5,3,5,1])).should.equal(2*(8*3*0.9) + 2*(8*4*0.8) + 8*5*0.75);
  });

  it("should return 0 with empty array",function (){
   (potterKata.getTotal([])).should.equal(0);
  });

  it("should return 8*3", function (){
    (potterKata.getTotal([3])).should.equal(8*3);
  });

});

describe("_getDiscount", function(){
  it("should return correct discount", function (){
    (potterKata._getDiscount(1)).should.equal(0);
    (potterKata._getDiscount(2)).should.equal(8*2*0.05);
    (potterKata._getDiscount(3)).should.equal(8*3*0.1);
    (potterKata._getDiscount(4)).should.equal(8*4*0.2);
    (potterKata._getDiscount(5)).should.equal(8*5*0.25);
  });
});

describe("_getCountOf", function(){
  it("should return 2", function(){
    (potterKata._getCountOf([2,2,0,1], 2)).should.equal(2);
  });
  it("should return 1", function(){
    (potterKata._getCountOf([2,2,0,1], 1)).should.equal(1);
  });
  it("should return 0", function(){
    (potterKata._getCountOf([2,2,0,1], 3)).should.equal(0);
  });
});
