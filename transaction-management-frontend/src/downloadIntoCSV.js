export const downloadIntoCSV = (jsonData, filename = "data.csv") => {
  const createCSVRow = (obj) => {
    return Object.values(obj)
      .map((value) => (typeof value === "string" ? `"${value}"` : value))
      .join(",");
  };

  const csvRows = jsonData.map(createCSVRow);
  csvRows.unshift(Object.keys(jsonData[0]).join(","));

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
