import { baseUrl } from "../config";
import { buildFilteredURL } from "../constructURLFromFilters";

export const fetchTransactionsApi = async (
  token,
  filters,
  page = 1,
  sortingOption
) => {
  try {
    const url = buildFilteredURL(
      `${baseUrl}/transactions/search`,
      filters,
      page
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
      throw new Error("Failed to fetch transactions");
    }
  } catch (error) {
    console.error("Error while fetching transactions:", error);
    throw error;
  }
};
