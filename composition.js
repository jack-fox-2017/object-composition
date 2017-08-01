class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
  }

  bake() {
    this.status = 'selesai masak'
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super()
    this.peanut_count = 100
    this.name = name
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super()
    this.choco_chip_count = 200
    this.name = name
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super()
    this.other_count = 150
    this.name = name
  }
}

class CookieFactory {
  constructor() {}

  static create(options) {
    let arr = []
    for (let i=0; i<list.length; i++) {
      if (list[i] == 'peanut butter') {
        arr.push(new PeanutButter(list[i]))
      }
      else if (list[i] == 'chocolate chip') {
        arr.push(new ChocolateChip(list[i]))
      }
      else {
        arr.push(new OtherCookie(list[i]))
      }
    }
    return arr
  }
}


let fs = require('fs')
let list = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')

console.log(CookieFactory.create(list));
