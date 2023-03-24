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
import { numberToLocaleString } from "utils/numberUtils";

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

  const hasStartDate = manualFields.includes("startDate");
  const hasEndDate = manualFields.includes("endDate");
  const hasPaymentDate = manualFields.includes("paymentDate");
  const hasDaysInPoland = manualFields.includes("daysInPoland");
  const hasPaidTax = manualFields.includes("paidTax");
  const hasHolidayIncome = manualFields.includes("holidayIncome");
  const hasIncome = manualFields.includes("income");
  const hasTaxPLN = autoFields.includes("taxPLN");
  const hasIncomePLN = autoFields.includes("incomePLN");

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Lp.</TableCell>
            {hasStartDate && <TableCell>Data rozpoczęcia</TableCell>}
            {hasEndDate && <TableCell>Data zakończenia</TableCell>}
            {hasPaymentDate && <TableCell>Data wypłaty</TableCell>}
            {hasDaysInPoland && <TableCell>Dni w Polsce</TableCell>}
            <TableCell>Tabela</TableCell>
            <TableCell>Kurs waluty</TableCell>
            {hasPaidTax && (
              <TableCell>Podatek {countryData.currency}</TableCell>
            )}
            {hasHolidayIncome && <TableCell>Przychód wakacyjny</TableCell>}
            {hasIncome && (
              <TableCell>Przychód {countryData.currency}</TableCell>
            )}
            {hasTaxPLN && <TableCell>Podatek PLN</TableCell>}
            {hasIncomePLN && <TableCell>Przychód PLN</TableCell>}
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
                {hasStartDate && (
                  <TableCell>{startDate.toLocaleDateString()}</TableCell>
                )}
                {hasEndDate && (
                  <TableCell>{endDate.toLocaleDateString()}</TableCell>
                )}
                {hasPaymentDate && (
                  <TableCell>
                    {(paymentDate ?? endDate).toLocaleDateString()}
                  </TableCell>
                )}
                {hasDaysInPoland && <TableCell>{daysInPoland}</TableCell>}
                <TableCell>{currencyTable}</TableCell>
                <TableCell>{numberToLocaleString(currencyValue, 4)}</TableCell>
                {hasHolidayIncome && (
                  <TableCell>{numberToLocaleString(holidayIncome)}</TableCell>
                )}
                {hasPaidTax && (
                  <TableCell>{numberToLocaleString(paidTax)}</TableCell>
                )}
                {hasIncome && (
                  <TableCell>{numberToLocaleString(incomeAbroad)}</TableCell>
                )}
                {hasTaxPLN && (
                  <TableCell>
                    <ClickableField>
                      {numberToLocaleString(taxPLN)}
                    </ClickableField>
                  </TableCell>
                )}
                {hasIncomePLN && (
                  <TableCell>
                    <ClickableField>
                      {numberToLocaleString(incomePLN)}
                    </ClickableField>
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
              manualFields={manualFields}
              autoFields={autoFields}
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
      padding: "8px 4px",
    },
  },
  "& td": {
    textAlign: "center",

    "@media print": {
      fontSize: ".75rem",
      padding: "8px 4px",
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
