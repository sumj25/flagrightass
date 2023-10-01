export const buildFilteredURL = (baseURL, filterParams, pageNumber = 1) => {
  const url = new URL(baseURL);

  for (const paramKey in filterParams) {
    if (filterParams.hasOwnProperty(paramKey)) {
      const paramValue = filterParams[paramKey];
      url.searchParams.append(paramKey, paramValue);
    }
  }

  url.searchParams.append("page", pageNumber);
  return url.toString();
};
