async function getUserById(_id, db) {
  return db.collection("users").findOne({ _id });
}
export default getUserById;
