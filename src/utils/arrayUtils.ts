// TODO: dodać 3ci parametr do ASC i DESC
export const sortByKey = <T>(arrayToSort: T[], sortKey: keyof T): T[] => {
  return arrayToSort.sort((a, b) => {
    const propertyA = a[sortKey];
    const propertyB = b[sortKey];

    if (propertyA > propertyB) {
      return 1;
    } else if (propertyA === propertyB) {
      return 0;
    } else {
      return -1;
    }
  });
};
