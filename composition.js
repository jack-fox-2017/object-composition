'use strict'

var fs = require('fs');
var options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');
// console.log(options);

let bahanIngredient = [];
for (var i = 0; i < options.length; i++) {
  bahanIngredient.push(options[i].split('='))
}

class Ingredient {
  constructor(bahan) {
    this.amount = bahan[0];
    this.name = bahan[1];
  }
}

class Cookie {
  constructor(name, ingredient) {
    // this.name = name;
    this.status = 'mentah';
    this.ingredient = this.bahanIngredient(ingredient);
    this.other_count = 150;
    this.denganGula = this.gula(ingredient);
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  bahanIngredient(composition) {
    console.log(composition);
    let arrayToObj = [];
    for (let i = 0; i < composition.length; i++) {
      arrayToObj.push(new Ingredient(composition[i].split(':')));
    }
    return JSON.stringify(arrayToObj);
  }
  gula(option) {
    for (let i = 0; i < bahanIngredient.length; i++) {
      if (/sugar/g.test(option[1].trim().split(':')[1])) {
        return true
      } else {
        return false;
      }
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
    this.other_count = 150;
  }
}

class CookieFactory {
  constructor() {

  }

  static create(bahanIngredient) {
    let dataCookie = []
    for (let i = 0; i < options.length; i++) {
      if (bahanIngredient[i][0].trim() == 'peanut butter') {
        let peanutButter = new PeanutButter(bahanIngredient[i][0].trim(), bahanIngredient[i][1].split(','));
        dataCookie.push(peanutButter)
      } else if (bahanIngredient[i][0].trim() == 'chocolate chip') {
        let chocolateChip = new ChocolateChip(bahanIngredient[i][0].trim(), bahanIngredient[i][1].split(','));
        dataCookie.push(chocolateChip)
      } else {
        let otherCookie = new OtherCookie(bahanIngredient[i][0].trim(), bahanIngredient[i][1].split(','));
        dataCookie.push(otherCookie);
      }
    }
    console.log(dataCookie);
    return dataCookie;
  }

  static cookieRecommendation(hari, cookie) {
    let tanpaGula = [];
    let denganGula = [];
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].denganGula == false) {
        tanpaGula.push(cookie[i])
      } else {
        denganGula.push(cookie[i])
      }
    }
    if (hari == 'monday') {
      return tanpaGula;
    } else {
      return denganGula;
    }
  }
}

let batch_of_cookies = CookieFactory.create(bahanIngredient);
console.log(batch_of_cookies);
let bebasGula = CookieFactory.cookieRecommendation('friday', batch_of_cookies);
console.log('Bebas Gula: ');
for (let i = 0; i < bebasGula.length; i++) {
  console.log(bebasGula[i].name);
}
