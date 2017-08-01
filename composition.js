const fs = require('fs');

class Ingredient{
  constructor(options){
    this.name = options[0];
    this.ingredient = this.ing(options);
    this.amount = this.amo(options);
    this.hasSugar = this.sugar(options);
  }
  ing(options){
    let ingr = [];
    let ingSplit = options[1].toString().split(',');
    for(let i=0; i<ingSplit.length; i++){
      ingr.push(ingSplit[i].toString().split(':')[1].trim());
    }
    return ingr;
  }
  amo(options){
    let amount = [];
    let ingSplit = options[1].toString().split(',');
    for(let i=0; i<ingSplit.length; i++){
      amount.push(ingSplit[i].toString().split(':')[0].trim());
    }
    return amount;
  }
  sugar(options){
    for(let i=0; i<this.ingredient.length; i++){
      if(this.ingredient[i]==='sugar'){
        return true;
      }
    }
    return false;
  }
}

class Cookie extends Ingredient{
  constructor(options){
    super(options);
    this.status = 'mentah';
  }
  bake(){
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie{
  constructor(name){
    super(name);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie{
  constructor(name){
    super(name);
    this.chocChip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name){
    super(name);
    this.other_count = 150;
  }
}

class CookieFactory{
  constructor(){
  }

  static create(options){
    let batch = [];
    for(let i=0; i<options.length; i++){
      let ops = options[i].toString().split('=');
      if(ops[0].trim()=='peanut butter'){
        batch.push(new PeanutButter(ops));
      }
      else if(ops[0].trim()=='chocolate Chip'){
        batch.push(new ChocholateChip(ops));
      }
      else{
        batch.push(new OtherCookie(ops));
      }
    }
    return batch;
  }
  static recommend(day, batch){
    let recomm = [];
    for(let i=0; i<batch.length; i++){
      if(!batch[i].hasSugar){
        recomm.push(batch[i]);
      }
    }
    return recomm;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');
let batchOfCookies = CookieFactory.create(options);
console.log(batchOfCookies);

let sugarFreeFoods = CookieFactory.recommend('tuesday', batchOfCookies);
console.log('sugar free cakes are :');
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}
