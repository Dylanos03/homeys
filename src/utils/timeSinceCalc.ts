export function timeSince(date: Date) {
  const dateNow = new Date();
  const diff = dateNow.getTime() - date.getTime();
  const diffMin = Math.round(diff / 60000);
  if (diffMin >= 60) {
    const diffHr = Math.round(diffMin / 60);
    if (diffHr >= 24) {
      const diffDay = Math.round(diffHr / 24);
      const preffix = diffDay;
      const suffix = ` day${diffDay > 1 ? "s" : ""} ago`;
      return preffix + suffix;
    }
    const preffix = diffHr;
    const suffix = ` hour${diffHr > 1 ? "s" : ""} ago`;
    return preffix + suffix;
  }
  const preffix = diffMin;
  const suffix = ` min${diffMin > 1 ? "s" : ""} ago`;

  return preffix + suffix;
}
