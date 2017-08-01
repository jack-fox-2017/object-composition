"use strict"

var fs = require('fs');
var options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')
// console.log(options);

class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredients = CookieFactory.splitIngredient(ingredients)
  }

  bake() {
    this.status = "selesai dimasak"
  }
}//end of Class

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}//end of Class

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}//end of Class

class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}//end of Class

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}//end of Class


class CookieFactory {
  static create(options) {
    let objCookie = []

    for (var i = 0; i < options.length; i++) {
      var splitNameIngredient = options[i].split(' = ')
      // console.log(splitNameIngredient);
      if(splitNameIngredient[0] === 'peanut butter') {
        objCookie.push(new PeanutButter('peanut butter', splitNameIngredient[1]))
      }
      else if (splitNameIngredient[0] === 'chocolate chip') {
        objCookie.push(new ChocholateChip('chocolate chip', splitNameIngredient[1]))
      }
      else {
        objCookie.push(new OtherCookie(splitNameIngredient[0], splitNameIngredient[1]))
      }
    }
    // console.log(objCookie);
    return objCookie
  }

  static splitIngredient(komposisi) {
    let bahan = []
    let splitKomposisi = komposisi.split(', ')
    for (var i = 0; i < splitKomposisi.length; i++) {
      let objKomposisi = {}
      objKomposisi.name = splitKomposisi[i].split(' : ')[1]
      objKomposisi.amount = splitKomposisi[i].split(' : ')[0]
      if(objKomposisi.name == 'sugar') {
        objKomposisi.has_sugar = true
      } else {
        objKomposisi.has_sugar = false
      }
      bahan.push(new Ingredient(objKomposisi))
      //  bahan.push(new Ingredient(objKomposisi))
    }
    // console.log(bahan);
    return bahan
  }

  static cookieRecommendation(batch_of_cookies) {
    let arr=[]
    // console.log(batch_of_cookies);
    asd:
    for (var i = 0; i < batch_of_cookies.length; i++) {
      for (var j = 0; j < batch_of_cookies[i].ingredients.length; j++) {
        // console.log(batch_of_cookies[i].ingredients[j]['has_sugar'] == true)
        if(batch_of_cookies[i].ingredients[j].has_sugar == true) {
          continue asd
        }
      }
      arr.push(batch_of_cookies[i].name)

    }
    return arr
    // console.log(arr);
  }

}//end of Class


let batch_of_cookies = CookieFactory.create(options);
console.log(JSON.stringify(batch_of_cookies, null, 2));
console.log(CookieFactory.cookieRecommendation(batch_of_cookies))
// console.log(CookieFactory.splitIngredient(komposisi));
