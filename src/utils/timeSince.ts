export function timeSince(date: Date) {
  let overHour = false;
  let overDay = false;
  let diffHr = 0;
  let diffDay = 0;

  const dateNow = new Date();
  const diff = dateNow.getTime() - date.getTime();
  const diffMin = Math.round(diff / 60000);
  if (diffMin >= 60) {
    diffHr = Math.round(diffMin / 60);
    overHour = true;
    return diffHr + ` hour${diffHr! > 1 ? "'s" : ""} ago`;
  }
  if (diffHr >= 24) {
    overDay = true;
    diffDay = Math.round(diffHr / 24);
    return diffDay + ` day${diffHr! > 1 ? "'s" : ""} ago`;
  }
  return diffMin + " mins ago";
}
