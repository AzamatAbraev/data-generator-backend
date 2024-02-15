require("dotenv").config();

const express = require("express");
const cors = require("cors");

const getLocalFaker = require("./locale");
const generateError = require("./error");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/generate", (req, res) => {
  const {
    region = "USA",
    errorsPerRecord = 0,
    seed = 0,
    pageNumber = 1,
    pageSize = 10,
  } = req.query;

  const faker = getLocalFaker(region);

  faker.seed(parseInt(seed) + (parseInt(pageNumber) - 1) * parseInt(pageSize));

  const selectedCountries = {
    USA: "United States",
    POLAND: "Poland",
    GERMANY: "Germany",
    TURKEY: "Turkiye",
  };

  const country = selectedCountries[region];

  const userData = Array.from({ length: parseInt(pageSize) }, (_, index) => {
    const name = `${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`;
    const address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}, ${country}`;
    const phone = faker.phone.number();

    const nameWithError = generateError(name, parseFloat(errorsPerRecord));
    const addressWithError = generateError(
      address,
      parseFloat(errorsPerRecord),
    );
    const phoneWithError = generateError(phone, parseFloat(errorsPerRecord));

    return {
      index: (parseInt(pageNumber) - 1) * parseInt(pageSize) + index + 1, // Adjust index based on page number
      id: faker.string.uuid(),
      name: nameWithError,
      address: addressWithError,
      phone: phoneWithError,
    };
  });

  res.status(200).json(userData);
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
