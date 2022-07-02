async function saveTransaction(userId, transaction, db) {
  await db.collection("transactions").insertOne({
    userId,
    ...transaction,
  });
}

export default saveTransaction;
