import { v4 as uuid } from "uuid";

async function saveSession(userId, db) {
  const token = uuid();
  await db.collection("sessions").insertOne({
    userId,
    token,
  });
  return token;
}

export default saveSession;
