
function checkCashRegister(price, cash, cid) {
  var change;
  var totalCID = 0.00;
  var changeDue = (cash-price) * 100;
  // Here is your change, ma'am.
  if(changeDue === 0){
    return "Closed";
  }
  
  for(var i=0; i<cid.length; i++){
    totalCID += cid[i][1] * 100;
  }

  if(changeDue > totalCID){
    return "Insufficient Funds";
  }else{
    for(var j=8; j>0; j++){
      if(changeDue % (cid[j][1] * 100) > 0){
        change.unshift(cid[j][0], (changeDue % (cid[j][1] * 100) / 2));
      }
    }
    
  }
  
  
  
  return change;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);