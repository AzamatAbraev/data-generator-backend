const { Faker, en, pl, de, tr } = require("@faker-js/faker");

const getLocalFaker = (region) => {
  switch (region) {
    case "USA":
      return new Faker({ locale: [en] });
    case "POLAND":
      return new Faker({ locale: [pl, en] });
    case "GERMANY":
      return new Faker({ locale: [de, en] });
    case "TURKEY":
      return new Faker({ locale: [tr, en] });
  }
};

module.exports = getLocalFaker;
