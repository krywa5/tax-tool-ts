import React, { FunctionComponent } from "react";

import { styled, TableCell, TableRow } from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { numToStr } from "utils/numberUtils";

interface OverallCounterValues {
  taxAbroad: number;
  incomeAbroad: number;
  taxPLN: number;
  incomePLN: number;
}

interface OverallCountersKeys {
  isTaxAbroad: boolean;
  isIncomeAbroad: boolean;
  isTaxPLN: boolean;
  isIncomePLN: boolean;
}

interface OverallCountersProps {
  values: OverallCounterValues;
  country: string;
  countersKeys: OverallCountersKeys;
}

export const OverallCounters: FunctionComponent<OverallCountersProps> = ({
  values,
  country,
  countersKeys,
}) => {
  const { taxAbroad, incomeAbroad, taxPLN, incomePLN } = values;
  const { isTaxAbroad, isIncomeAbroad, isTaxPLN, isIncomePLN } = countersKeys;

  let numberOfEmptyCols = 0;

  // TODO: zrobić tę część w bardziej programistyczny sposób
  switch (country) {
    case "netherlands":
      numberOfEmptyCols = 5;
      break;
    case "belgium":
      numberOfEmptyCols = 6;
      break;
    case "france":
      numberOfEmptyCols = 6;
      break;
    case "germany":
      numberOfEmptyCols = 6;
      break;
    default:
      numberOfEmptyCols = 6;
      break;
  }

  const emptyCols = (() => {
    const output = [];
    for (let index = 0; index < numberOfEmptyCols; index++) {
      output.push(<EmptyTableCell key={index}></EmptyTableCell>);
    }
    return output;
  })();

  return (
    <TableRow>
      {emptyCols}
      <OverallTableCell>Łącznie</OverallTableCell>
      {isTaxAbroad && (
        <OverallTableCell>
          <ClickableField>{numToStr(taxAbroad)}</ClickableField>
        </OverallTableCell>
      )}
      {isIncomeAbroad && (
        <OverallTableCell>
          <ClickableField>{numToStr(incomeAbroad)}</ClickableField>
        </OverallTableCell>
      )}
      {isTaxPLN && (
        <OverallTableCell>
          <ClickableField>{numToStr(taxPLN)}</ClickableField>
        </OverallTableCell>
      )}
      {isIncomePLN && (
        <OverallTableCell>
          <ClickableField>{numToStr(incomePLN)}</ClickableField>
        </OverallTableCell>
      )}
      <EmptyTableCell data-print={false}></EmptyTableCell>
    </TableRow>
  );
};

const EmptyTableCell = styled(TableCell)({
  border: "unset",
});

const OverallTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.25rem",
  color: theme.palette.common.black,
  fontWeight: "600",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
