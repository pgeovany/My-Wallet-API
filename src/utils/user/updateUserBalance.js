async function updateUserBalance(userId, transaction, db) {
  const value =
    transaction.type === "credit" ? transaction.value : -transaction.value;

  await db.collection("users").updateOne(
    { _id: userId },
    {
      $inc: {
        balance: value,
      },
    }
  );
}

export default updateUserBalance;
