import React, { FunctionComponent, useContext } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { OverallCounters } from "components/overall-counters/OverallCounters";
import { CountryContext } from "contexts/CountryContext";
import { toPolishDateFormat } from "utils/dateUtils";
import { numToStr } from "utils/numberUtils";

const IncomesTableBase: FunctionComponent = () => {
  const { removeIncome, countryData, calculator } = useContext(CountryContext);
  const incomeList = calculator.incomes;

  const { manual: manualFields, auto: autoFields } = countryData.inputs;

  const overallValues = {
    taxAbroad: 0,
    incomeAbroad: 0,
    taxPLN: 0,
    incomePLN: 0,
  };

  const countersKeys = {
    isTaxAbroad: manualFields.includes("paidTax"),
    isIncomeAbroad: manualFields.includes("income"),
    isTaxPLN: autoFields.includes("taxValue"),
    isIncomePLN: autoFields.includes("allIncomeValue"),
  };

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            {manualFields.includes("startDate") && (
              <TableCell>Data rozpoczęcia</TableCell>
            )}
            {manualFields.includes("endDate") && (
              <TableCell>Data zakończenia</TableCell>
            )}
            {manualFields.includes("paymentDate") && (
              <TableCell>Data wypłaty</TableCell>
            )}
            {manualFields.includes("daysInPoland") && (
              <TableCell>Dni w Polsce</TableCell>
            )}
            <TableCell>Tabela</TableCell>
            <TableCell>Kurs waluty</TableCell>
            {manualFields.includes("paidTax") && (
              <TableCell>Podatek {countryData.currency}</TableCell>
            )}
            {manualFields.includes("holidayIncome") && (
              <TableCell>Przychód wakacyjny</TableCell>
            )}
            {manualFields.includes("income") && (
              <TableCell>Przychód {countryData.currency}</TableCell>
            )}
            {autoFields.includes("taxValue") && (
              <TableCell>Podatek PLN</TableCell>
            )}
            {autoFields.includes("allIncomeValue") && (
              <TableCell>Przychód PLN</TableCell>
            )}
            <TableCell className="no-print"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeList.map((incomeData, index) => {
            const {
              id,
              startDate,
              endDate,
              incomeAbroad,
              paidTax,
              holidayIncome,
              paymentDate,
              currencyValue,
              currencyTable,
              daysInPoland,
              taxPLN,
              incomePLN,
            } = incomeData;

            // count overall values
            overallValues.taxAbroad += paidTax;
            overallValues.incomeAbroad += incomeAbroad;
            overallValues.taxPLN += taxPLN;
            overallValues.incomePLN += incomePLN;

            return (
              <TableRow key={id}>
                <TableCell>{index + 1}.</TableCell>
                {manualFields.includes("startDate") && (
                  <TableCell>{toPolishDateFormat(startDate)}</TableCell>
                )}
                {manualFields.includes("endDate") && (
                  <TableCell>{toPolishDateFormat(endDate)}</TableCell>
                )}
                {manualFields.includes("paymentDate") && (
                  <TableCell>{toPolishDateFormat(paymentDate)}</TableCell>
                )}
                {manualFields.includes("daysInPoland") && (
                  <TableCell>{Number(daysInPoland)}</TableCell>
                )}
                <TableCell>{currencyTable}</TableCell>
                <TableCell>{numToStr(currencyValue, 4)}</TableCell>
                {manualFields.includes("paidTax") && (
                  <TableCell>{numToStr(paidTax)}</TableCell>
                )}
                {manualFields.includes("holidayIncome") && (
                  <TableCell>{numToStr(holidayIncome)}</TableCell>
                )}
                {manualFields.includes("income") && (
                  <TableCell>{numToStr(incomeAbroad)}</TableCell>
                )}
                {autoFields.includes("taxValue") && (
                  <TableCell>
                    <ClickableField>{numToStr(taxPLN)}</ClickableField>
                  </TableCell>
                )}
                {autoFields.includes("allIncomeValue") && (
                  <TableCell>
                    <ClickableField>{numToStr(incomePLN)}</ClickableField>
                  </TableCell>
                )}
                <TableCell className="no-print">
                  <StyledIconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => removeIncome(id)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </StyledIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          {
            <OverallCounters
              values={overallValues}
              country={countryData.id}
              countersKeys={countersKeys}
            />
          }
        </TableFooter>
      </StyledTable>
    </TableContainer>
  );
};

const StyledTable = styled(Table)({
  "& thead th": {
    fontWeight: 600,
    fontSize: "1rem",
    textAlign: "center",

    "@media print": {
      fontSize: ".75rem",
      lineHeight: "1.25",
      padding: "10px 5px",
    },
  },
  "& td": {
    textAlign: "center",

    "@media print": {
      fontSize: ".75rem",
      padding: "10px 5px",
    },
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.dark,
}));

export const IncomesTable = React.memo(IncomesTableBase);
