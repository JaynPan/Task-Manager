const jwt = require('jsonwebtoken');

// JWTs provide a nice system for issuing and validating authentication tokens.
// The authentication token will ensure that the client
// doesn’t need to log in every time they want to perform an operation on the server.

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
  console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1ODM2ODA3NTl9.FRioRlH1AhZNLtw-ss1bdahqacvDhgN-ANzfRoHyPv0

  const data = jwt.verify(token, 'thisismynewcourse');
  console.log(data);
};

myFunction();
