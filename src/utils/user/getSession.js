async function getSession(token, db) {
  return db.collection("sessions").findOne({ token });
}

export default getSession;
