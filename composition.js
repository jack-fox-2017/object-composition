"Use Strict"
let fs  = require('fs')


class Ingridients{
  constructor(object){
    // this.namabahan = pilihan['namabahan'];
    this.Ingridients = object.namabahan
    this.Amount = object.jumlah
  }
}

// console.log(new Ingridients)

class Cookie{
  constructor(name,ingridients){
    this.name = name
    this.status = 'mentah'
    this.ingridients = ingridients
    this.has_sugar = this.gula(ingridients)
    // this.ingredients = ['++++++======'];
    // this._Nama = nama
    // this.option = option
  }
  bake(){
    this.status = 'selesai dimasak'
  }

  gula(ingredients){
    console.log(ingredients);
  }

}

  class PeanutButter extends Cookie{
    constructor(name,ingredients){
      super(name,ingredients)
      this.peanut_count = 100

    }
  }
  class ChocolateChip extends Cookie{
    constructor(name,ingredients){
      super(name,ingredients)
      this.choc_chip_count = 200
    }
  }
  class OtherCookie extends Cookie{
    constructor(name,ingredients){
      super(name,ingredients)
      this.other_count = 150
      this.has_sugar = false
    }
  }


class CookieFactory{
  constructor(){
  }
  static create(options){
    var options = fs.readFileSync(options,'utf8').trim().split('\r\n')
    var result=[];

    for (var i = 0; i < options.length; i++) {
      var namakue = options[i].split('=')
      // arrbahankue.push(namakue[1])
      var gabungbahan= namakue[1].split(',');
      var bahanjumlah = [];
      var j =0
      while (j< gabungbahan.length) {
        bahanjumlah.push(gabungbahan[j].split(':'))
        j++;
      }
      var k =0
      var arrbahankue =[];
      var kue = new Cookie()
      // console.log(kue.ingridients);
      // -------> bentuknya array, tp kalo di push ngga mau
      while (k < bahanjumlah.length){

        let bahan2 = new Ingridients({namabahan: bahanjumlah[k][1], jumlah: bahanjumlah[k][0]})
        arrbahankue.push(bahan2) // pake {} untuk acc property class yang hanya 1 param
        k++;
      }

      if (namakue[0]=='peanut butter '){
        var buatkue = new PeanutButter(namakue[0],arrbahankue)
        result.push(buatkue)
      }
      else if (namakue[0]=='chocolate chip '){
        var buatkue = new ChocolateChip(namakue[0],arrbahankue)
        result.push(buatkue)
      }
      else {
        var buatkue = new OtherCookie(namakue[0],arrbahankue)
        result.push(buatkue)
      }
    // return namanye
   }
   return result
  // return namakue
  }

  static cookieRecommendation(day, batchCookie){
    let sugarcakearray =[]

    if (day !== 'tuesday') {
      return 'You can eat all cookies '
        }
    else if (day === 'tuesday')
    {
      for (let i = 0; i < batchCookie.length; i++) {
        for (let j = 0; j < batchCookie[i].ingridients.length; j++) {
          if (batchCookie[i].ingridients[j].Ingridients==` sugar`) {
            batchCookie.has_sugar = true
          }
        }
      }
    }
    for (var i = 0; i < batchCookie.length; i++) {
      // console.log(batchCookie[i]);
      if (batchCookie.has_sugar ==false) {

        sugarcakearray.push(batchCookie)
      }
    }
    return sugarcakearray
  }
}


//DRIVER TES
// let kue = new Cookie('bolu')
// baru.bake()
// console.log(`Ini Kue ${baru._Nama} ${baru.status}`);

// DRIVER RELEASE 0
let batch_of_cookies = CookieFactory.create('cookies.txt')

console.log(batch_of_cookies);

// DRIVER RELEASE 1
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log('sugar free cakes are:' );
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}


// //DRIVER CEK JIKA METHOD DINAMIS
// let bikinkue = new CookieFactory()
// bikinkue.create('cookies.txt')
// console.log(bikinkue.create('cookies.txt'));
