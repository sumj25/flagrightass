import { baseUrl } from "../config";

export const initializeCron = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/task/scheduler/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      // Scheduler initialization successful
      return response.json();
    } else {
      throw new Error("Failed to initialize the scheduler");
    }
  } catch (error) {
    console.error("Error initializing the scheduler:", error);
    throw error;
  }
};

export const terminateCron = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/task/scheduler/stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      // Scheduler termination successful
      return response.json();
    } else {
      throw new Error("Failed to terminate the scheduler");
    }
  } catch (error) {
    console.error("Error terminating the scheduler:", error);
    throw error;
  }
};
