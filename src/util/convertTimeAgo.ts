import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function convertTimeAgo(createdAt: string): string {
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ko,
  });
}
