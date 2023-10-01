import { baseUrl } from "../config";

export const createNewTransactionApi = async (JWTtoken,newTransaction) => {
  console.log(JWTtoken);
  try {
    const response = await fetch(`${baseUrl}/transactions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JWTtoken,
      },
      body: JSON.stringify(newTransaction),
    });
    console.log(response);
    if (response.ok) {
      // Transaction created successfully
      return response.json();
    } else {
      throw new Error("Failed to create transaction");
    }
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};