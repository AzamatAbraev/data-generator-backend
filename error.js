const { faker } = require("@faker-js/faker");

const generateErrors = (text, errorsCount) => {
  for (let i = 0; i < errorsCount; i++) {
    const errorType = Math.floor(Math.random() * 3);
    const position = Math.floor(Math.random() * text.length);

    if (errorType == 0) {
      text = text.slice(0, position) + text.slice(position + 1);
    } else if (errorType == 1) {
      const random = faker.string.alpha();
      text = text.slice(0, position) + random + text.slice(position);
    } else if (errorType == 2) {
      if (position < text.length - 1) {
        text =
          text.slice(0, position) +
          text.charAt(position + 1) +
          text.charAt(position) +
          text.slice(position + 2);
      }
    }
  }
  return text;
};

module.exports = generateErrors;
