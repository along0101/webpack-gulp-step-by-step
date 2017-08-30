//import $ from 'jquery';

class Animal{
  constructor(type='animal'){
    this.type = type;
  }

  move(){
    console.log(this.type+' can move');
  }

  run(){
    console.log(this.type+' can run too');
  }
}
