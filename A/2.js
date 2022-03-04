const wordSort = (str) => {
  let obj = {};
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      if (obj[str[i]]) {
        obj[str[i]]++;
      } else {
        obj[str[i]] = 1;
      }
    }
  }

  for (let key in obj) {
    if (obj[key] > 1) {
      for (let i = 0; i < obj[key]; i++) {
        result += key;
      }
    } else {
      result += key;
    }
  }

  return result;
};

console.log(wordSort("makan siang"));
console.log(wordSort("hello world"));
console.log(wordSort("how much"));
