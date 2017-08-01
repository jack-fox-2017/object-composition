const fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')
// console.log(options);

// class BahanKue {
//   constructor(namaBahan, amount){
//     this.namaBahan = namaBahan
//     this.amount = amount
//   }
// }

class BahanKue {
  constructor(option){
    this.bahan = option['bahan']
    this.amount = option['amount']
  }
}

class Cookie{
  constructor(nama, bahan){
    this.nama = nama
    this.status = "Masih mentah"
    this.bahanKue = this.Ingredients(bahan)
    this.containSugar = this.getSugar(bahan)

  }

  bake(){
    this.status = "Selesai dimasak"
  }

  Ingredients(bahan){
    // console.log('************************' + bahan);
    let arrBahan = []
    for(let i = 0; i < bahan.length; i++){
      let toObj = bahan[i].split(':')
      let reFormat = {
        bahan : toObj[1],
        amount : toObj[0]
      }
      arrBahan.push(new BahanKue(reFormat))
    }
    return JSON.stringify(arrBahan);
  }

  getSugar(nosugar) {
    // console.log(nosugar);
    for(let i = 0; i < nosugar.length; i++) {
      if (/sugar/g.test(nosugar)){
        return 'Has Sugar'
      } else {
        return 'Free Sugar'
      }

    }
  }
}

//Child of Cookie Class
class PeanutButter extends Cookie {
  constructor(nama, bahan){
    super(nama, bahan);
    this.name = 'peanut butter'
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(nama, bahan){
    super(nama, bahan);
    this.chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(nama, bahan){
    super(nama, bahan);
    this.other_count = 150
  }
}

class KuePutuAyu extends Cookie {
  constructor(nama, bahan){
    super(nama, bahan);
    this.other_count = 150
  }
}



class CookieFactory {
  static create(option){

    let MyCookies = []
    for(let i = 0; i < option.length; i++){
      let getName = option[i].split(' = ')
      // console.log('+-+-+-+-+-+-' + getName[1].toString().split(','));

      if(getName[0] === 'peanut butter') {
        let cookie = new PeanutButter(getName[0].trim(), getName[1].toString().split(','));
        MyCookies.push(cookie)
      } else if(getName[0] === 'chocolate chip') {
        let cookie = new ChocolateChip(getName[0].trim(), getName[1].toString().split(','));
        MyCookies.push(cookie)
      } else if(getName[0] === 'Kue Putu Ayu') {
        let cookie = new KuePutuAyu(getName[0].trim(), getName[1].toString().split(','));
        MyCookies.push(cookie)
      } else {
        let cookie = new OtherCookie(getName[0].trim(), getName[1].toString().split(','));
        MyCookies.push(cookie)
      }
    }
    // console.log('======== ' + option[0] + '=========');
    return MyCookies
    // return option
  }

  static cookieRecommendation(day, cookiesList){
    let recom = []
    if( day !== 'tuesday'){
      return 'Just eat everything'
    } else {
      for(let i =0; i < cookiesList.length; i++){
        if(cookiesList[i].containSugar === 'Free Sugar'){
          recom.push(cookiesList[i].nama)
        }
      }
    }
    // console.log('===============' + recom);
    return recom
  }
}

var batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
//
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log("========== SUGAR FREE CAKES ARE: ==========");
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i]);
}
