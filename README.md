# Form Validator

Function that accepts two objects, the first being the form values (such as React state), the second being the rules for each field. We then compare each rule against its keyed field in the object and return an error message, should it be invalid. Currently will only return the first error found, but may expand to return multiple errors if needed.

### Installation

**THIS PACKAGE IS CURRENTLY PRIVATE**

`npm install @jonny15t/form-validator`
or
`yarn add @jonny15t/form-validator`

### Usage

```
import { validate } from "@jonny15t/form-validator";

const formState = {
  name: "Jonny",
  petCount: "2a",
  email: "sample.email@email.org",
  phone_number: "(717) 555-4283"
}

const rules = {
  name: {
    required: "Your name is required!"
  },
  petCount: {
    required: "If you don't have any pets, enter 0",
    number: "Pet count must be a numeric value"
  },
  email: {
    email: "Email must be a valid syntax"
  },
  phone_number: {
    phone: "Phone number must be a valid syntax"
  }
}

const { isValid, errors } = validate(formState, rules);

// isValid = false;
// errors = {
//   petCount: "Pet count must be a numeric value"
// };
```

### Current Pitfalls

1. Only returns first found error. If value breaks multiple rules, only the first error message is returned.
2. Phone number format is verify specific [(###) ###-####].
3. Is O(n) time complexity. With that said, the mega form test (100,000 key object) can be completed in under 60ms. Hopefully there is never a form that large.
4. Only has required, number, email and phone validators for now. Will add more as they come up.
