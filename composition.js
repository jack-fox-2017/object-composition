"use strict"
const fs = require("fs")
let DataOption = fs.readFileSync("cookies.txt", "utf-8")
class Cookie {
  constructor(name,ingredients) {
    this.status = "mentah"
    this.name = name
    this.ingredients = ingredients
  }
  bake() {
    this.status = "selesai dimasak"
  }
}
class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}
class ChocholateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}
class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_count = 150
  }
}
class Ingredients{
    constructor (options){
      this.name = options.name
      this.amount = options.amount
      this.has_sugar = options.has_sugar
    }
}
class CookieFactory {
  constructor() {}
  static create() {
    let tampung = [];
    let data = DataOption.split("\n")
    for (var i = 0; i < data.length; i++) {
      let nama = data[i].split(" = ")
      if (nama[0] === "peanut butter") {
        tampung.push(new PeanutButter(nama[0],this.olahBahan(nama[1])))
      } else if (nama[0] === "chocolate chip") {
        tampung.push(new ChocholateChip(nama[0], this.olahBahan(nama[1])))
      } else if (nama[0] === "chocolate cheese") {
        tampung.push(new OtherCookie(nama[0], this.olahBahan(nama[1])))
      } else if (nama[0] === "chocolate butter") {
        tampung.push(new OtherCookie(nama[0], this.olahBahan(nama[1])))
      }
    }
    return tampung
  }
  static olahBahan(ingredients){
    let arr= []
    let bahan = ingredients.split(", ")
    for (var i = 0; i<bahan.length; i++){
      var obj = {}
      var bahan_arr = bahan[i].split(" : ")
      obj.name = bahan_arr[1];
      obj.amount = bahan_arr[0]
      obj.has_sugar = bahan_arr[2]
      arr.push(new Ingredients(obj))
    }
      return arr;
  }
  static pengecekan(ingredients){
    //console.log(typeof(ingredients))
    for (let i = 0; i<ingredients.length; i++){
      if (/sugar/.test(ingredients[i])){
        return "ini adalah kue yang menggunakan sugar"+ ingredients[i][0]
      }
    }
  }
}
let cookie = CookieFactory.create("cookies.txt")
let check = CookieFactory.pengecekan("cookies.txt")
console.log(check)
console.log(cookie[1].ingredients[1].name);
console.log(JSON.stringify(cookie,null,2))
