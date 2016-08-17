import {FunctionalMixin} from "./mixins.js";
const cost = FunctionalMixin({
  getCost() { 
    if (_.isFunction(this.cost)) 
      return this.cost() 
    else 
      return this.cost
  },
  canBuy() { return this.state.canPay(this.getCost()) },
  cannotBuy() { return !this.canBuy() },
  buy() { 
    if ( this.state.pay(this.getCost()) ) {
      return this.onBuy() 
    }
  },
  cost() { return {}; }
});

export {cost};