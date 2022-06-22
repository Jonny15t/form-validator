const validate = require("../src/validate");

module.exports = () => {
  const randomValue = ["string", 1234, "test@email.org", "(800) 223-4567"];
  const megaForm = {};
  const megaRules = {};

  for (let i = 0; i < 100000; i++) {
    // enter 100,000 random form values into mega form
    megaForm[i] = randomValue[Math.floor(Math.random() * randomValue.length)];
    // set all rules for each entry (1 should pass, rest will fail)
    megaRules[i] = {
      required: "Required",
      number: "Must be a number",
      email: "Must be an email",
      phone: "Must be a phone number",
    };
  }

  console.time("Validation Function");
  validate(megaForm, megaRules);
  console.timeEnd("Validation Function");
};
