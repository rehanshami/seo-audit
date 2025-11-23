export function msSince(start: [number, number]) {
  const diff = process.hrtime(start);
  return Math.round(diff[0] * 1000 + diff[1] / 1_000_000);
}
