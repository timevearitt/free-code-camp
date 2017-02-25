function checkCashRegister(price, cash, cid) {
  var change = [];
  var denom = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
  var changeDue = (cash - price) * 100;
  var totalCash = 0;
  
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
  }
  
  for(j=8; j>0; j--){
    dc = [];
    while(changeDue > denom[j] && (cid[j][1] * 100) >= denom[j]){
      changeDue -= denom[j];
      cid[j][1] -= denom[j];
     // console.log("change due=" + changeDue + " denom remain=" + cid[j][1]);
      dc[0] = cid[j][0];
      dc[1] += denom[j];
      console.log(dc[1]);
    }
   
    dc[1] = (dc[1] / 100);
    if(dc[1] > 0){
      
      
      change.push(dc);
    } 
    
  }
  //console.log(change);
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