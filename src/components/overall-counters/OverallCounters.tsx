import React, { FunctionComponent } from "react";

import { styled, TableCell, TableRow } from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { numberToLocaleString } from "utils/numberUtils";

const COLUMNS_FOR_COUNTERS_BASE = 3; // LP, Tabela, Kurs waluty

interface OverallCounterValues {
  taxAbroad: number;
  incomeAbroad: number;
  taxPLN: number;
  incomePLN: number;
}

interface OverallCountersProps {
  values: OverallCounterValues;
  autoFields: string[];
  manualFields: string[];
}

export const OverallCounters: FunctionComponent<OverallCountersProps> = ({
  values,
  autoFields,
  manualFields,
}) => {
  const { taxAbroad, incomeAbroad, taxPLN, incomePLN } = values;
  const hasTaxAbroad = manualFields.includes("paidTax");
  const hasIncomeAbroad = manualFields.includes("income");
  const hasTaxPLN = autoFields.includes("taxPLN");
  const hasIncomePLN = autoFields.includes("incomePLN");

  const dataCols = [
    ...manualFields,
    ...autoFields.filter(
      (field) =>
        ![
          "allAllowanceValue",
          "dailyDiet",
          "allowanceMonths",
          "currencyValue",
          "dayAllowanceValue",
          "workDays",
        ].includes(field),
    ),
  ];

  const numberOfOverallCountersColumns = [
    true,
    hasTaxAbroad,
    hasIncomeAbroad,
    hasTaxPLN,
    hasIncomePLN,
  ].filter((col) => col).length;

  const numberOfEmptyCols =
    dataCols.length +
    COLUMNS_FOR_COUNTERS_BASE -
    numberOfOverallCountersColumns;

  const emptyColsComponents = (() => {
    const output = [];
    for (let index = 0; index < numberOfEmptyCols; index++) {
      output.push(<EmptyTableCell key={index}></EmptyTableCell>);
    }
    return output;
  })();

  return (
    <TableRow>
      {emptyColsComponents}
      <OverallTableCell isClickable={false}>Łącznie</OverallTableCell>
      {hasTaxAbroad && (
        <OverallTableCell>
          <ClickableField>{numberToLocaleString(taxAbroad)}</ClickableField>
        </OverallTableCell>
      )}
      {hasIncomeAbroad && (
        <OverallTableCell>
          <ClickableField>{numberToLocaleString(incomeAbroad)}</ClickableField>
        </OverallTableCell>
      )}
      {hasTaxPLN && (
        <OverallTableCell>
          <ClickableField>{numberToLocaleString(taxPLN)}</ClickableField>
        </OverallTableCell>
      )}
      {hasIncomePLN && (
        <OverallTableCell>
          <ClickableField>{numberToLocaleString(incomePLN)}</ClickableField>
        </OverallTableCell>
      )}
      <EmptyTableCell data-print={false}></EmptyTableCell>
    </TableRow>
  );
};

const EmptyTableCell = styled(TableCell)({
  border: "unset",
});

const OverallTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isClickable",
})<{ isClickable?: boolean }>(({ theme, isClickable = true }) => ({
  fontSize: "1.25rem",
  color: theme.palette.common.black,
  fontWeight: "600",
  border: "unset",

  "&:hover": {
    color: isClickable ? theme.palette.primary.main : undefined,
  },
}));
