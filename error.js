const { faker } = require("@faker-js/faker");
const sample = 3;

const generateErrors = (text, errorsCount, maxIncreasePercent = 20) => {
  let modifiedText = text;

  const originalLength = text.length;
  const minLength = 3;
  const maxLength =
    originalLength + Math.floor(originalLength * (maxIncreasePercent / 100));

  for (let i = 0; i < errorsCount && modifiedText.length >= minLength; i++) {
    const errorType = Math.floor(Math.random() * 3);
    const position = Math.floor(Math.random() * modifiedText.length);

    switch (errorType) {
      case 0:
        if (modifiedText.length > minLength) {
          modifiedText =
            modifiedText.slice(0, position) + modifiedText.slice(position + 1);
        }
        break;
      case 1:
        const insertChar = faker.string.alpha({ count: 1 });
        if (modifiedText.length < maxLength) {
          modifiedText =
            modifiedText.slice(0, position) +
            insertChar +
            modifiedText.slice(position);
        }
        break;
      case 2:
        const substituteChar = faker.string.alpha({ count: 1 });
        if (modifiedText.length > 0) {
          modifiedText =
            modifiedText.slice(0, position) +
            substituteChar +
            modifiedText.slice(position + 1);
        }
        break;
    }
  }

  return modifiedText.length >= minLength ? modifiedText : text;
};

module.exports = generateErrors;
