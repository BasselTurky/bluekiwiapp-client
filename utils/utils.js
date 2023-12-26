function remainingdDigits(number) {
  var length = (Math.log(number) * Math.LOG10E + 1) | 0;

  let remaining = 3 - length;

  let result = "";
  for (let i = 0; i < remaining; i++) {
    result = result.concat("0");
  }

  return result;
}
