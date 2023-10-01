import cron from "node-cron";
import { createTransactionService } from "../transactionService.js";
import { createTransactionId } from "../utils/createTransactionId.js";

let cronJob;

export const startCronJob = () => {
  let requestCount = 0;
  const maxRequests = 75;

  cronJob = cron.schedule("*/1 * * * * *", async () => {
    if (requestCount >= maxRequests) {
      console.log("Limit exceed.");
      cronJob.stop();
      return;
    }

    const newTransaction = {
      transactionID: createTransactionId(),
      amount: Math.floor(Math.random() * 100000),
      description: "Create Transaction",
    };
    requestCount++;
    await createTransactionService(newTransaction);
  });
  cronJob.start();
};

export const stopCronJob = () => {
  if (cronJob) {
    cronJob.stop();
  }
};
