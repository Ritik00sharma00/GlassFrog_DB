const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};



const comparePassword = async ( password,hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (err) {
      console.error('Error comparing passwords:', err);
      throw err;
    }
  };

  

module.exports ={ hashPassword,comparePassword};
