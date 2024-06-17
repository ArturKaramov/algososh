export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function createRandomNumber(limit: number): number {
  return Math.floor(Math.random() * limit);
}
