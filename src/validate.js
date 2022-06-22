module.exports = (state, rules) => {
  const controlledFields = Object.keys(state);
  const errors = {};

  controlledFields.forEach((field) => {
    if (!rules[field]) return;
    const fieldRules = new Set(Object.keys(rules[field]));

    if (fieldRules.has("required")) {
      if (typeof field === "array") {
        if (!state[field].length) {
          errors[field] = rules[field].required;
          return;
        }
      }

      if (!state[field]) {
        errors[field] = rules[field].required;
        return;
      }
    }

    if (fieldRules.has("number")) {
      if (isNaN(state[field])) {
        errors[field] = rules[field].number;
        return;
      }
    }

    if (fieldRules.has("email")) {
      if (state[field]) {
        const emailTest =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailTest.test(state[field])) {
          errors[field] = rules[field].email;
          return;
        }
      }
    }

    if (fieldRules.has("phone")) {
      if (state[field]) {
        const phoneTest = /^\([2-9][0-9]{2}\)\s?[0-9]{3}-[0-9]{4}$/;
        if (!phoneTest.test(state[field])) {
          errors[field] = rules[field].phone;
          return;
        }
      }
    }
  });

  if (Object.keys(errors).length) {
    return {
      isValid: false,
      errors,
    };
  } else {
    return {
      isValid: true,
      errors,
    };
  }
};
