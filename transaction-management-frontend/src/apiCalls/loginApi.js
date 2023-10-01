import { baseUrl } from "../config";

export const loginApi = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/auth/login?username=flagrightAdmin&password=192837465`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};
