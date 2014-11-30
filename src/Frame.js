function Frame() {
  this.rollHolder = new Array();
};

Frame.prototype.storeRoll = function(roll) {
  this.rollHolder.push(roll);  
};

Frame.prototype.isAStrike = function() {
  return this.rollHolder[0].hitPins == 10 ? true : false;
};

Frame.prototype.isASpare = function() {
  if(!this.isAStrike()) {
   return this.rollHolder[0].hitPins + this.rollHolder[1].hitPins == 10 ? true : false;
  }
};

Frame.prototype.isNormal = function() {
  return this.isASpare() == false ? true : false;
};

