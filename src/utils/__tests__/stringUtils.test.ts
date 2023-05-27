import { stringNumberToNumber } from "utils/stringUtils";

describe("stringUtils", () => {
  describe("stringNumberToNumber", () => {
    it.each`
      stringNumber         | output
      ${"2000000,00"}      | ${2000000}
      ${"-30000,54"}       | ${-30000.54}
      ${"5000,00"}         | ${5000}
      ${"-5000,55"}        | ${-5000.55}
      ${"-12356789,55234"} | ${-12356789.55}
    `(
      "should correctly convert $stringNumber to $output",
      ({ stringNumber, output }) => {
        expect(stringNumberToNumber(stringNumber)).toBe(output);
      },
    );
  });
});
