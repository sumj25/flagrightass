export const createTransactionId = () => {
const currentTimestamp = new Date().getTime();
const randomValue = Math.floor(Math.random() * 100000);
const transactionId = `${currentTimestamp}-${randomValue}`;

return transactionId;

};
