export default function getCurrentWeek() {
  const today = new Date();

  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const daysSinceStart = Math.floor((today - firstDayOfYear) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.floor(daysSinceStart / 7) + 1;

  return currentWeek
}