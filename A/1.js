const hop = (n) => {
  if (n > 9) {
    console.log("Apa?");
  } else {
    for (let i = 0; i < n; i++) {
      let word = "hop!";
      for (let j = n - 1; j > 0; j--) {
        word = j + " " + word;
      }
      console.log(word);
    }
  }
};

hop(9);
hop(4);
hop(15);
