import { baseUrl } from "../config";
import { buildFilteredURL } from "../constructURLFromFilters";

export const generateCustomReportApi = async (token, criteria) => {
  try {
    const url = buildFilteredURL(
      `${baseUrl}/transactions/report`,
      criteria
    );
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to generate the custom report");
    }
  } catch (error) {
    console.error("Error generating the custom report:", error);
    throw error;
  }
};
