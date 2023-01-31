import React, { FunctionComponent, useContext } from "react";

import { Container, InputAdornment, TextField } from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { InputField } from "components/input-field/InputField";
import { InputLabel } from "components/input-label/InputLabel";
import { LoadingBackdrop } from "components/loading-backdrop/LoadingBackdrop";
import { CountryContext } from "contexts/CountryContext";
import { Printable, Stylable } from "types/ComponentTypes";
import { toPolishDateFormat } from "utils/dateUtils";

// TODO: Rozbić
export const AutoFields: FunctionComponent<Stylable & Printable> = ({
  className,
  "data-print": dataPrint,
}) => {
  const { countryData, calculator, setCalculatorValue } =
    useContext(CountryContext);

  const {
    currencyValueDate,
    currencyTable,
    currencyValue,
    workMonths,
    dailyDiet,
    workDays,
    taxValue,
    allIncomeValue,
    isDataFetching,
  } = calculator;

  return (
    <Container className={className} maxWidth={false} data-print={dataPrint}>
      {isDataFetching && <LoadingBackdrop />}
      {countryData.inputs.auto.includes("currencyValue") && (
        <InputField>
          <InputLabel
            label="Kurs waluty"
            labelFor="currencyValue"
            subLabels={
              currencyValueDate
                ? `${toPolishDateFormat(currencyValueDate)}, ${currencyTable}`
                : ""
            }
          />
          <TextField
            id="currencyValue"
            type="number"
            variant="outlined"
            label="Kurs waluty"
            value={currencyValue.toFixed(4)}
            onChange={(e: any) =>
              setCalculatorValue(
                "currencyValue",
                Number(Number(e.target.value).toFixed(4)),
              )
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
                step: 0.0001,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.auto.includes("allowanceMonths") && (
        <InputField>
          <InputLabel
            label="Ilość miesięcy zagranicą"
            labelFor="allowanceMonths"
          />
          <TextField
            id="allowanceMonths"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={workMonths}
            onChange={(e: any) =>
              setCalculatorValue("workMonths", Number(e.target.value))
            }
            label="Ilość miesięcy zagranicą"
            InputProps={{
              inputProps: {
                min: 0,
                max: 12,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.auto.includes("dailyDiet") && (
        <InputField>
          <InputLabel label="Wysokość diety za dzień" labelFor="dailyDiet" />
          <TextField
            id="dailyDiet"
            type="number"
            variant="outlined"
            label="Wysokość diety za dzień"
            value={dailyDiet.toFixed(2)}
            onChange={(e: any) =>
              setCalculatorValue(
                "dailyDiet",
                Number(Number(e.target.value).toFixed(2)),
              )
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
                step: 0.01,
              },
              endAdornment: (
                <InputAdornment position="end">
                  {countryData.currency}
                </InputAdornment>
              ),
            }}
          />
        </InputField>
      )}
      {countryData.inputs.auto.includes("workDays") && (
        <InputField>
          <InputLabel label="Ilość dni zagranicą" labelFor="workDays" />
          <TextField
            id="workDays"
            type="number"
            variant="outlined"
            label="Ilość dni zagranicą"
            value={workDays}
            onChange={(e: any) =>
              setCalculatorValue("workDays", Number(e.target.value))
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
                max: 366,
                readOnly: true,
              },
            }}
          />
        </InputField>
      )}
      {countryData.inputs.auto.includes("allAllowanceValue") && (
        <InputField>
          <InputLabel label="Wartość diet" labelFor="allAllowanceValue" />
          <TextField
            id="allAllowanceValue"
            type="number"
            variant="outlined"
            label="Wartość diet"
            InputLabelProps={{ shrink: true }}
            value={(workDays * dailyDiet).toFixed(2)}
            InputProps={{
              inputProps: {
                readOnly: true,
              },
              endAdornment: (
                <InputAdornment position="end">
                  {countryData.currency}
                </InputAdornment>
              ),
            }}
          />
        </InputField>
      )}
      {countryData.inputs.auto.includes("taxValue") && (
        <InputField>
          <InputLabel
            label="Wartość podatku"
            labelFor="taxValue"
            subLabels={countryData.sublabels.taxValue}
          />
          <ClickableField>
            <TextField
              id="taxValue"
              type="number"
              variant="outlined"
              label="Wartość podatku"
              InputLabelProps={{ shrink: true }}
              value={taxValue.toFixed(2)}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: 0.01,
                  readOnly: true,
                },
                endAdornment: (
                  <InputAdornment position="end">PLN</InputAdornment>
                ),
              }}
            />
          </ClickableField>
        </InputField>
      )}
      {countryData.inputs.auto.includes("allIncomeValue") && (
        <InputField>
          <InputLabel
            label="Wartość przychodu"
            labelFor="allIncomeValue"
            subLabels={countryData.sublabels.allIncomeValue}
          />
          <ClickableField>
            <TextField
              id="allIncomeValue"
              type="number"
              variant="outlined"
              label="Wartość przychodu"
              value={allIncomeValue.toFixed(2)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: 0.01,
                  readOnly: true,
                },
                endAdornment: (
                  <InputAdornment position="end">PLN</InputAdornment>
                ),
              }}
            />
          </ClickableField>
        </InputField>
      )}
    </Container>
  );
};
