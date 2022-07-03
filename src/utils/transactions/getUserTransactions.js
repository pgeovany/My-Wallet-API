async function getUserTransactions(userId, db) {
  const transactions = await db
    .collection("transactions")
    .find({ userId })
    .toArray();

  transactions.forEach((transaction) => {
    delete transaction.userId;
  });

  return transactions;
}

export default getUserTransactions;
