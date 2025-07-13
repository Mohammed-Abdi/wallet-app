export function getFormattedDate() {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return formattedDate;
}
