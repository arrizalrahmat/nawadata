const validation = {
  isNumber: (str) => {
    const num = "1234567890";
    return num.includes(str);
  },
  isSpcChar: (str) => {
    const spcChar = `~!@#$%^&*()-_=+[{}]|;:'",<.>/?`;
    return spcChar.includes(str);
  },
};

export default validation;
