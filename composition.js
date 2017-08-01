class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients
  }

  bake() {
    this.status = 'selesai masak'
  }
}


class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super()
    this.peanut_count = 100
    this.name = name
    this.ingredients = ingredients
  }
}


class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super()
    this.choco_chip_count = 200
    this.name = name
    this.ingredients = ingredients
  }
}


class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super()
    this.other_count = 150
    this.name = name
    this.ingredients = ingredients
  }
}


class CookieFactory {
  constructor() {}

  static create(options) {
    let arr = []
    for (let i=0; i<options.length; i++) {
      if (options[i].split(' = ')[0] == 'peanut butter') {
        arr.push(new PeanutButter(options[i].split(' = ')[0], this.olahIngredients(options[i].split(' = ')[1])))
      }
      else if (options[i].split(' = ')[0] == 'chocolate chip') {
        arr.push(new ChocolateChip(options[i].split(' = ')[0], this.olahIngredients(options[i].split(' = ')[1])))
      }
      else {
        arr.push(new OtherCookie(options[i].split(' = ')[0], this.olahIngredients(options[i].split(' = ')[1])))
      }
    }
    return arr
  }

  static olahIngredients(strBahan) {
    let arr = []
    let perBahan = strBahan.split(', ')
    for (var i = 0; i < perBahan.length; i++) {
      let obj = {}
      let amountName = perBahan[i].split(' : ')
      obj.name = amountName[1]
      obj.amount = amountName[0]
      if (obj.name == 'sugar') {
        obj.has_sugar = true
      }
      else {
        obj.has_sugar = false
      }
      arr.push(JSON.stringify(new Ingredient(obj)))
    }
    return arr
  }

  static cookieRecomendation() {
    let today = 'tuesday'
    // let today = 'sunday'
    if (today == 'tuesday') {
      // 
    }
    else {
      //
    }
  }
}


class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}





let fs = require('fs')
let list = fs.readFileSync('cookies2.txt', 'utf8').trim().split('\n')

console.log(CookieFactory.create(list));
