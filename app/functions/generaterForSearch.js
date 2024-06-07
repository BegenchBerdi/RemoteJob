exports.generaterQueryText = (str) => {
  if (str != "") {
    var strArr = str.split(" ");
    console.log(strArr);
    var output = "";
    console.log(strArr.length);
    for (let i = 0; i < strArr.length - 1; i++) {
      output += strArr[i] + `:* | `;
    }
    output += strArr[strArr.length - 1] + `:*`;
    return output;
  } else {
    return str;
  }
};
