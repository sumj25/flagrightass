export const IsoToText = (isoDateString) => {
  const isoDate = new Date(isoDateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

 
  const normalDate = isoDate.toLocaleDateString("en-US", options);

  return normalDate;
};
