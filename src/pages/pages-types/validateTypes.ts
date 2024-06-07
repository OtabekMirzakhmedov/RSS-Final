const commonMessages = {
  required: 'The field is required!',
  minLength: 'Minimum length of 1 character',
  invalidFormat: 'Must not contain numbers or special characters and use English words',
};

const FormValidationMessages = {
  Email: {
    Required: 'The email is required!',
    InvalidFormat: 'Please enter a valid email',
  },
  Password: {
    Required: 'The password is required!',
    MinLength: 'Password must be at least 8 characters long',
    Pattern:
      'Password should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    NotMatch: 'The passwords do not match!',
  },
  postalCode: {
    Required: 'The postal code is required!',
    US: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).',
    default: 'Please enter a valid postal code (e.g., A1A 1A1 or A1A1A1).',
  },
  Name: {
    Required: commonMessages.required,
    MinLength: commonMessages.minLength,
    InvalidFormat: commonMessages.invalidFormat,
  },
  LastName: {
    Required: commonMessages.required,
    MinLength: commonMessages.minLength,
    InvalidFormat: commonMessages.invalidFormat,
  },
  Birthday: {
    Required: 'The date of birth is required!',
    InvalidFormat: 'You must be at least 13 years old.',
  },
  Street: {
    Required: 'The street is required!',
    MinLength: 'Street: minimum length of 1 character',
  },
  City: {
    Required: 'The city is required!',
    MinLength: 'City: minimum length of 1 character',
    InvalidFormat: 'The city must not contain numbers or special characters and use english words',
  },
  Country: {
    Required: 'The country is required!',
  },
};

export default FormValidationMessages;
