
function checkCashRegister(price, cash, cid) {
  var change = [];
  // Set Denomination value * 100 to avoid floating point issues.
  var denom = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
  // changeDue * 100 to avoid floating point
  var changeDue = (cash - price) * 100;
  // total value of cash in drawer
  var totalCash = 0;
  
  // Paid exact amount
  if(changeDue === 0){
    return "Closed";
  }
  
  //determine cash in drawer
  for(i=0; i<cid.length; i++){
    totalCash += cid[i][1] * 100;
  }
  
  //console.log(totalCash);
  
  if(changeDue > totalCash){
    return "Insufficient Funds";
  }else if(totalCash === changeDue){
    return "Closed";
  }
  
  // start giving back change in single denomination
  for(var j=8; j>=0; j--){
    // initial value of current denomination
   dc = [cid[j][0], 0];
    // do we still owe change of this denomination and do we have it to give?
    while(changeDue >= denom[j] && cid[j][1] !== 0){
      changeDue -= denom[j];
      cid[j][1] -= (denom[j] / 100);
      dc[1] = dc[1] + denom[j];
    }
    
    // convert money value back to decimal.  if we gave change push onto change array
    dc[1] = (dc[1] / 100);
    if(dc[1] > 0){
      change.push(dc);
    } 
  }
  
  // if change is due we don't have the correct nominations to make exact change.
  if(changeDue > 0){
    return "Insufficient Funds";
  }
  
  // Here is your change, ma'am.
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