/* eslint-disable max-nested-callbacks */
import { getLastWorkingDay } from "utils/dateUtils";

describe("dateUtils", () => {
  describe("getLastWorkingDay", () => {
    describe("should handle simple easy scenario", () => {
      it.each`
        inputDate       | expectedDate
        ${"2023-05-26"} | ${"2023-05-25"}
        ${"2023-05-10"} | ${"2023-05-09"}
        ${"2023-04-11"} | ${"2023-04-10"}
        ${"2022-08-17"} | ${"2022-08-16"}
        ${"2022-10-13"} | ${"2022-10-12"}
        ${"2022-11-11"} | ${"2022-11-10"}
        ${"2021-11-05"} | ${"2021-11-04"}
        ${"2017-11-11"} | ${"2017-11-10"}
        ${"2017-11-10"} | ${"2017-11-09"}
      `(
        "it should return $expectedDate when input date is $inputDate",
        ({ inputDate, expectedDate }) => {
          const date = new Date(inputDate);
          expect(getLastWorkingDay(date)).toBe(expectedDate);
        },
      );
    });

    describe("should handle weekend scenario", () => {
      it.each`
        inputDate       | expectedDate
        ${"2023-04-10"} | ${"2023-04-07"}
        ${"2023-04-09"} | ${"2023-04-07"}
        ${"2023-05-15"} | ${"2023-05-12"}
        ${"2022-09-05"} | ${"2022-09-02"}
        ${"2022-10-31"} | ${"2022-10-28"}
        ${"2022-03-14"} | ${"2022-03-11"}
        ${"2022-02-28"} | ${"2022-02-25"}
        ${"2021-11-29"} | ${"2021-11-26"}
      `(
        "it should return $expectedDate when input date is $inputDate",
        ({ inputDate, expectedDate }) => {
          const date = new Date(inputDate);
          expect(getLastWorkingDay(date)).toBe(expectedDate);
        },
      );
    });

    describe("should handle poland day off scenario", () => {
      it.each`
        inputDate       | expectedDate
        ${"2023-05-04"} | ${"2023-05-02"}
        ${"2023-08-16"} | ${"2023-08-14"}
        ${"2022-11-14"} | ${"2022-11-10"}
        ${"2022-11-12"} | ${"2022-11-10"}
        ${"2020-06-12"} | ${"2020-06-10"}
        ${"2021-06-04"} | ${"2021-06-02"}
        ${"2022-06-17"} | ${"2022-06-15"}
      `(
        "it should return $expectedDate when input date is $inputDate",
        ({ inputDate, expectedDate }) => {
          const date = new Date(inputDate);
          expect(getLastWorkingDay(date)).toBe(expectedDate);
        },
      );
    });

    describe("should handle poland day off and weekend scenario", () => {
      it.each`
        inputDate       | expectedDate
        ${"2019-11-12"} | ${"2019-11-08"}
        ${"2020-04-14"} | ${"2020-04-10"}
        ${"2021-05-04"} | ${"2021-04-30"}
        ${"2022-12-26"} | ${"2022-12-23"}
        ${"2023-01-09"} | ${"2023-01-05"}
        ${"2022-04-19"} | ${"2022-04-15"}
      `(
        "it should return $expectedDate when input date is $inputDate",
        ({ inputDate, expectedDate }) => {
          const date = new Date(inputDate);
          expect(getLastWorkingDay(date)).toBe(expectedDate);
        },
      );
    });
  });
});
