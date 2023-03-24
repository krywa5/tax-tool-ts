import { sortByKey } from "utils/arrayUtils";

const stringArr = [
  {
    id: "d",
  },
  {
    id: "c",
  },
  {
    id: "a",
  },
  {
    id: "b",
  },
];
const stringArrSorted = [
  {
    id: "a",
  },
  {
    id: "b",
  },
  {
    id: "c",
  },
  {
    id: "d",
  },
];

const numberArr = [
  {
    id: 3,
  },
  {
    id: 1,
  },
  {
    id: -5,
  },
  {
    id: 0,
  },
];

const numberArrSorted = [
  {
    id: -5,
  },
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 3,
  },
];

const numericStringArr = [
  {
    id: "3",
  },
  {
    id: "1",
  },
  {
    id: -5,
  },
  {
    id: "0",
  },
  {
    id: "-6",
  },
];

const numericStringArrSorted = [
  {
    id: "-6",
  },
  {
    id: -5,
  },
  {
    id: "0",
  },
  {
    id: "1",
  },
  {
    id: "3",
  },
];

describe("arrayUtils", () => {
  describe("sortByKey", () => {
    it.each`
      array               | output
      ${stringArr}        | ${stringArrSorted}
      ${numberArr}        | ${numberArrSorted}
      ${numericStringArr} | ${numericStringArrSorted}
    `("should correctly sort the array", ({ array, output }) => {
      expect(sortByKey(array, "id")).toStrictEqual(output);
    });
  });
});
