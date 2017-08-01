const fs = require('fs');

class Ingredient{
  constructor(options){
    this.name = this.ing(options);
    this.amount = this.amo(options);
    this.hasSugar = this.sugar();
  }
  ing(options){
    let ingr = [];
    let ingSplit = options[1].toString().split(',');
    for(let i=0; i<ingSplit.length; i++){
      ingr.push(ingSplit[i].toString().split(':')[1].trim());
    }
    return ingr.join(', ');
  }
  amo(options){
    let amount = [];
    let ingSplit = options[1].toString().split(',');
    for(let i=0; i<ingSplit.length; i++){
      amount.push(ingSplit[i].toString().split(':')[0].trim());
    }
    return amount.join(', ');
  }
  sugar(){
    let ingName = this.name.trim().split(',');
    for(let i=0; i<ingName.length; i++){
      if(ingName[i].trim()==='sugar'){
        return true;
      }
    }
    return false;
  }
}

class Cookie{
  constructor(options){
    this.name = options[0];
    this.status = 'mentah';
    this.ingredient = new Ingredient(options);
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
      if(!batch[i].ingredient.hasSugar){
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
console.log('\nsugar free cakes are :');
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
  console.log('because the ingredients is',sugarFreeFoods[i].ingredient.name);
}
