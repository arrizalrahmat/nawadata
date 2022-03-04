const kamusPanda = (str) => {
  const kamus = "abcdefghijklmnopqrstuvwxyz";
  let result = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (kamus.includes(char)) {
      if (result[char]) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }

  return Object.keys(result).length;
};

console.log(kamusPanda("lalalalala"));
console.log(kamusPanda("How long"));
console.log(kamusPanda("arrizal"));
