export function timeSince(date: Date) {
  const dateNow = new Date();
  const diff = dateNow.getTime() - date.getTime();
  const diffMin = Math.round(diff / 60000);
  if (diffMin >= 60) {
    const diffHr = Math.round(diffMin / 60);
    if (diffHr >= 24) {
      const diffDay = Math.round(diffHr / 24);
      return diffDay + ` day${diffDay! > 1 ? "s" : ""} ago`;
    }
    return diffHr + ` hour${diffHr > 1 ? "s" : ""} ago`;
  }

  return diffMin + " mins ago";
}
