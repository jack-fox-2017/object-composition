"use strict"

const fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf-8').trim().split('\n')

class Cookie {
  constructor(name,status,ingredients){
    this.name = name
    this.status = "mentah"
    this.ingredients = []

  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name){
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name){
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name){
    super(name)
    this.other_count = 150
  }
}
class CookieFactory {
  static create(options){
    let batch = [];
    for(let i = 0; i < options.length; i++){
      if(options[i] === 'peanut butter'){
        batch.push(new PeanutButter(options[i]))
      }
      else if(options[i] === 'chocolate chip'){
        batch.push(new ChocolateChip(options[i]))
      }
      else if(options[i] === 'chocolate cheese'){
        batch.push(new OtherCookie(options[i]))
      }
      else{
        batch.push(new OtherCookie(options[i]))
      }
    }return batch;
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
