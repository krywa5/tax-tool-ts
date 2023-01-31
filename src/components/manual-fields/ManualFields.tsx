import React, { FunctionComponent, Ref, useContext } from "react";

import { Container, InputAdornment, TextField } from "@mui/material";
import { InputField } from "components/input-field/InputField";
import { InputLabel } from "components/input-label/InputLabel";
import { CountryContext } from "contexts/CountryContext";
import { Printable, Stylable } from "types/ComponentTypes";
import { strToNum } from "utils/stringUtils";

interface ManualFieldsProps extends Stylable, Printable {
  firstInput: Ref<HTMLInputElement>;
}

export const ManualFields: FunctionComponent<ManualFieldsProps> = ({
  firstInput,
  className,
  "data-print": dataPrint,
}) => {
  const { countryData, calculator, setCalculatorValue } =
    useContext(CountryContext);
  const {
    income,
    holidayIncome,
    paidTax,
    startDate,
    endDate,
    paymentDate,
    daysInPoland,
  } = calculator;

  return (
    <Container maxWidth={false} className={className} data-print={dataPrint}>
      {countryData.inputs.manual.includes("income") && (
        <InputField>
          <InputLabel
            label="Przychód brutto"
            labelFor="income"
            subLabels={countryData.intl.income}
          />
          <TextField
            id="income"
            label="Przychód"
            type="number"
            variant="outlined"
            value={income}
            autoFocus
            onChange={(e) =>
              setCalculatorValue("income", strToNum(e.target.value))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {countryData.currency}
                </InputAdornment>
              ),
              inputProps: {
                step: 0.01,
                min: 0,
                ref: firstInput,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual.includes("holidayIncome") && (
        <InputField>
          <InputLabel
            label="Przychód wakacyjny"
            labelFor="holidayIncome"
            subLabels={countryData.intl.holidayIncome}
          />
          <TextField
            id="holidayIncome"
            label="Przychód wakacyjny"
            type="number"
            variant="outlined"
            value={holidayIncome}
            onChange={(e) =>
              setCalculatorValue("holidayIncome", strToNum(e.target.value))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {countryData.currency}
                </InputAdornment>
              ),
              inputProps: {
                step: 0.01,
                min: 0,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual?.includes("paidTax") && (
        <InputField>
          <InputLabel
            label="Podatek"
            labelFor="paidTax"
            subLabels={countryData.intl.paidTax}
          />
          <TextField
            id="paidTax"
            label="Podatek"
            type="number"
            variant="outlined"
            value={paidTax}
            onChange={(e) =>
              setCalculatorValue("paidTax", strToNum(e.target.value))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {countryData.currency}
                </InputAdornment>
              ),
              inputProps: {
                step: 0.01,
                min: 0,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual.includes("startDate") && (
        <InputField>
          <InputLabel label="Dzień rozpoczęcia pracy" labelFor="startDate" />
          <TextField
            id="startDate"
            type="date"
            defaultValue={startDate}
            variant="outlined"
            onBlur={(e) => setCalculatorValue("startDate", e.target.value)}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().slice(0, 10),
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual.includes("endDate") && (
        <InputField>
          <InputLabel label="Dzień zakończenia pracy" labelFor="endDate" />
          <TextField
            id="endDate"
            type="date"
            variant="outlined"
            defaultValue={endDate}
            onBlur={(e) => setCalculatorValue("endDate", e.target.value)}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().slice(0, 10),
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual.includes("paymentDate") && (
        <InputField>
          <InputLabel
            label="Dzień wypłaty"
            labelFor="paymentDate"
            subLabels={[
              countryData.intl.paymentDate,
              "Wypełnić jeśli inny niż ostatni dzień pracy",
            ]}
          />
          <TextField
            id="paymentDate"
            type="date"
            variant="outlined"
            defaultValue={paymentDate}
            onBlur={(e) => setCalculatorValue("paymentDate", e.target.value)}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().slice(0, 10),
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.manual.includes("daysInPoland") && (
        <InputField>
          <InputLabel
            label="Ilość dni spędzonych w Polsce"
            labelFor="daysInPoland"
          />
          <TextField
            id="daysInPoland"
            type="number"
            variant="outlined"
            label="Dni w Polsce"
            value={daysInPoland}
            onChange={(e) =>
              setCalculatorValue(
                "daysInPoland",
                Math.floor(Number(e.target.value)),
              )
            }
            InputProps={{
              inputProps: {
                min: 0,
                max: 366,
              },
            }}
          />
        </InputField>
      )}
    </Container>
  );
};
