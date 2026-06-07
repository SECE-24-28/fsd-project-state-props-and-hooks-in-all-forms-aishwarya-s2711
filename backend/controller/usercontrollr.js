// Delegates to authController to avoid duplicate logic
const { signup } = require('./authController');
const SignUpUser = signup;
module.exports = { SignUpUser };
