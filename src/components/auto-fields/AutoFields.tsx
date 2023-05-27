import React, { FunctionComponent, useContext } from "react";

import { Container, InputAdornment, TextField } from "@mui/material";
import { ClickableField } from "components/clickable-field/ClickableField";
import { InputField } from "components/input-field/InputField";
import { InputLabel } from "components/input-label/InputLabel";
import { LoadingBackdrop } from "components/loading-backdrop/LoadingBackdrop";
import { CountryContext } from "contexts/CountryContext";
import { useCountryData } from "hooks/useCountryData";
import { Printable, Stylable } from "types/ComponentTypes";
import { CountryId } from "types/Country";

interface AutoFieldsProps {
  selectedCountry: CountryId;
}

export const AutoFields: FunctionComponent<
  AutoFieldsProps & Stylable & Printable
  // eslint-disable-next-line max-lines-per-function
> = ({ className, "data-print": dataPrint, selectedCountry }) => {
  const {
    currencyValueDate,
    currencyTable,
    currencyValue,
    workMonths,
    dailyDiet,
    workDays,
    taxPLN,
    incomePLN,
    isCurrencyDataFetching,
    setCurrencyValue,
    setWorkMonths,
    setDailyDiet,
    setWorkDays,
  } = useContext(CountryContext);
  const { countryData } = useCountryData(selectedCountry);

  return (
    <Container className={className} maxWidth={false} data-print={dataPrint}>
      {isCurrencyDataFetching && <LoadingBackdrop />}
      {countryData.inputs.auto.includes("currencyValue") && (
        <InputField>
          <InputLabel
            label="Kurs waluty"
            labelFor="currencyValue"
            subLabels={
              currencyValueDate
                ? `${currencyValueDate.toLocaleDateString()}, ${
                    currencyTable ?? ""
                  }`
                : ""
            }
          />
          <TextField
            id="currencyValue"
            type="number"
            variant="outlined"
            label="Kurs waluty"
            value={currencyValue.toFixed(4)}
            onChange={(e) =>
              setCurrencyValue(Number(Number(e.target.value).toFixed(4)))
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
            onChange={(e) => setWorkMonths(Number(e.target.value))}
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
            onChange={(e) =>
              setDailyDiet(Number(Number(e.target.value).toFixed(2)))
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
          <InputLabel label="Ilość dni za granicą" labelFor="workDays" />
          <TextField
            id="workDays"
            type="number"
            variant="outlined"
            label="Ilość dni za granicą"
            value={workDays}
            onChange={(e) => setWorkDays(Number(e.target.value))}
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
      {countryData.inputs.auto.includes("taxPLN") && (
        <InputField>
          <InputLabel
            label="Wartość podatku"
            labelFor="taxPLN"
            subLabels={countryData.subLabels.taxPLN}
          />
          <ClickableField>
            <TextField
              id="taxPLN"
              type="number"
              variant="outlined"
              label="Wartość podatku"
              InputLabelProps={{ shrink: true }}
              value={taxPLN.toFixed(2)}
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
      {countryData.inputs.auto.includes("incomePLN") && (
        <InputField>
          <InputLabel
            label="Wartość przychodu"
            labelFor="incomePLN"
            subLabels={countryData.subLabels.incomePLN}
          />
          <ClickableField>
            <TextField
              id="incomePLN"
              type="number"
              variant="outlined"
              label="Wartość przychodu"
              value={incomePLN.toFixed(2)}
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
