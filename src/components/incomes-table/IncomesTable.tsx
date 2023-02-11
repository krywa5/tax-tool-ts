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
  Tooltip,
} from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { OverallCounters } from "components/overall-counters/OverallCounters";
import { IncomesTableContext } from "contexts/IncomesTableContext";
import { useCountryData } from "hooks/useCountryData";
import { CountryId } from "types/Country";
import { numToStr } from "utils/numberUtils";

interface IncomesTableProps {
  selectedCountry: CountryId;
}

// eslint-disable-next-line max-lines-per-function
const IncomesTableBase: FunctionComponent<IncomesTableProps> = ({
  selectedCountry,
}) => {
  const { countryData } = useCountryData(selectedCountry);
  const { removeIncome, incomes: incomesList } =
    useContext(IncomesTableContext);

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
    isTaxPLN: autoFields.includes("taxPLN"),
    isIncomePLN: autoFields.includes("incomePLN"),
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
            {autoFields.includes("taxPLN") && (
              <TableCell>Podatek PLN</TableCell>
            )}
            {autoFields.includes("incomePLN") && (
              <TableCell>Przychód PLN</TableCell>
            )}
            <PrintColumnCell data-print={false}></PrintColumnCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomesList.map((incomeData, index) => {
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
                  <TableCell>{startDate.toLocaleDateString()}</TableCell>
                )}
                {manualFields.includes("endDate") && (
                  <TableCell>{endDate.toLocaleDateString()}</TableCell>
                )}
                {manualFields.includes("paymentDate") && (
                  <TableCell>
                    {(paymentDate ?? endDate).toLocaleDateString()}
                  </TableCell>
                )}
                {manualFields.includes("daysInPoland") && (
                  <TableCell>{daysInPoland}</TableCell>
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
                {autoFields.includes("taxPLN") && (
                  <TableCell>
                    <ClickableField>{numToStr(taxPLN)}</ClickableField>
                  </TableCell>
                )}
                {autoFields.includes("incomePLN") && (
                  <TableCell>
                    <ClickableField>{numToStr(incomePLN)}</ClickableField>
                  </TableCell>
                )}
                <PrintColumnCell data-print={false}>
                  <Tooltip title="Usuń pozycję" placement="top">
                    <StyledIconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => removeIncome(id)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </StyledIconButton>
                  </Tooltip>
                </PrintColumnCell>
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

const PrintColumnCell = styled(TableCell)({
  padding: 0,
});

export const IncomesTable = React.memo(IncomesTableBase);
