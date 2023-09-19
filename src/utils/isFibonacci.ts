export const isFibonacci = (userEnteredNumber: number) => {
  let fib = [0, 1];
  let i = fib.length;
  // Only loop through while we haven't gotten to the number input and we haven't gotten to the 1,000th fib number
  while (fib[fib.length - 1] <= userEnteredNumber && fib.length <= 1001) {
    fib[i] = fib[i - 2] + fib[i - 1];
    i++;
  }
  // Won't be perfect as JavaScript won't be that precise when getting to such high numbers
  if (typeof BigInt(userEnteredNumber) === 'bigint') {
    const userBigInt = Number(userEnteredNumber);
    const fibBigInt = Number(fib[fib.length - 2]);
    return similar(userBigInt, fibBigInt);
  }
  return fib[fib.length - 2] == userEnteredNumber;
};
const MARGIN_OF_ERROR: number = 1.0734983136696987e-14;
function similar(a: any, b: any) {
  let diff = Math.abs(a - b);
  let smallest = Math.min(Math.abs(a), Math.abs(b));
  let ratio = diff / smallest;
  return ratio < MARGIN_OF_ERROR;
}
