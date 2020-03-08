const bcrypt = require('bcryptjs');

// The hash method can be used to hash the plain text password.
const myFunction = async () => {
  const password = 'Red12345!';
  const hashPassword = await bcrypt.hash(password, 8);

  console.log(hashPassword);

  /*
  The compare method is used to compare a plain text password against a previously hashed password. This would be useful when logging in. The user logging in provides the plain text password for their account. The application fetches the hashed password from the database for that user. compare is then called to confirm it’s a match.
  */
  const isMatch = await bcrypt.compare('Red12345!', hashPassword);
  console.log(isMatch);
};

myFunction();
