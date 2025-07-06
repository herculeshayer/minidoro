function manipulatePomodoroData(pomoParseInt) {
  let strArr = [];
  for (let i = 0; i < pomoParseInt; i++) {
    strArr.push("🍅");
  }

  let newArr = [];
  let arr = [];
  for (let i = 0; i < strArr.length; i++) {
    arr.push(strArr[i]);
    if (arr.length === 4) {
      newArr.push(arr);
      arr = [];
    }
  }

  if (arr.length > 0) {
    newArr.push(arr);
  }

  return newArr.map((group) => group.join("")).join(" ");
}

export default manipulatePomodoroData;
