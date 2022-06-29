import bcrypt from "bcrypt";

async function comparePasswords(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

export default comparePasswords;
