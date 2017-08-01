class Ingredient {
  constructor(options) {
    this._name = options[`name`]
    this._amount = options[`amount`]
    this._has_sugar = options[`has_sugar`]
  }
}


class Cookie {
  constructor(name,ingredients) {
    this._status = `mentah`
    this._name = name
    this._ingredients = ingredients
  }

  bake(){
    this._status = `selesai dimasak`
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this._peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this._choc_chip_count = 200
  }
}

class ChocholateCheese extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this._choc_chip_count = 50
  }
}

class ChocholateButter extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this._choc_chip_count = 75
  }
}

class CookieFactory {
  constructor(){}
  static create(options){
    let batchCookies = options.map(function(x){ return x.split(' = ')})
    let result = [];
    for (var i = 0; i < batchCookies.length; i++) {
      let temp = batchCookies[i][1].split(`, `)
                  .map(function(x){return x.split(` : `)})

      let ingredients = temp.map(function(x){
        let composition = {
          name: x[1],
          amount: x[0],
          has_sugar: x[1]==='sugar'?true:false
        }
        return new Ingredient(composition)
      })

      if (batchCookies[i][0] === `peanut butter`) {
        result.push(new PeanutButter(`peanut butter`,ingredients))
      } else if (batchCookies[i][0] === `chocholate chip`){
        result.push(new ChocholateChip(`chocholate chip`,ingredients))
      } else if (batchCookies[i][0] === `chocholate cheese`){
        result.push(new ChocholateCheese(`chocholate cheese`,ingredients))
      } else if (batchCookies[i][0] === `chocholate butter`){
        result.push(new ChocholateButter(`chocholate butter`,ingredients))
      }
    }
    return result
  }

  static cookieRedommendation(day, batchCookies){
    let result = []
    //console.log(batchCookies[0]._ingredients[0][`_has_sugar`]);
    if (day === `tuesday`) {
      for (var i = 0; i < batchCookies.length; i++) {
        var x = batchCookies[i]._ingredients.filter(function (x){ return x[`_has_sugar`]})
        if (x.length > 0) {
          result.push(batchCookies[i])
        }
      }
    }
    return result
  }
}

const fs = require('fs')
var data = fs.readFileSync('cookies.txt', 'utf8').trim()
          .split('\n')


var batch_of_cookies = CookieFactory.create(data)
console.log(batch_of_cookies);
console.log();

let sugarFreeFoods = CookieFactory.cookieRedommendation(`tuesday`, batch_of_cookies)
console.log('sugar free cakse are:');
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}

// let batch_of_cookies = []
// for (var i = 0; i < data.length; i++) {
//   let temp = CookieFactory.create(data[i][0],data[i][1])
//   batch_of_cookies.push(temp)
// }
//console.log(batch_of_cookies);
// var test = CookieFactory.create(`peanut butter`)
// console.log(test);
