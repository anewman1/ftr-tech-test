import { isFibonacci } from './isFibonacci';

describe('isFibonacci', () => {
  it('should return true if the user input was a fibonacci number and less than the 1000th fibonacci number', () => {
    const userInput = isFibonacci(5);
    expect(userInput).toBeTruthy();
  });

  it('should return true if the user input was a fibonacci number and is roughly the 1000th fibonacci number', () => {
    const userInput =
      isFibonacci(
        43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875,
      );
    expect(userInput).toBeTruthy();
  });

  it('should return false if the user input was not a fibonacci number and lower than the 1000th fibonacci number', () => {
    const userInput = isFibonacci(9);
    expect(userInput).toBeFalsy();
  });

  it('should return false if the user input was higher than the 1000th fibonacci number', () => {
    const userInput =
      isFibonacci(
        53466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875,
      );
    expect(userInput).toBeFalsy();
  });
});
