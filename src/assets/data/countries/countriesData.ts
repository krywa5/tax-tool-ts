/* eslint-disable max-lines */
import { AvailableYear } from "types/AvailableYear";
import { Country } from "types/Country";

export const countriesData: Record<AvailableYear, Country[]> = {
  "2019": [
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "netherlands",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
      },
      label: "Holandia",
      monthlyIncomeCost: 111.25,
      subLabels: {
        incomePLN: [
          "Pole nr 63 oraz PIT-ZG pole nr 9",
          "W polu PIT-ZG pole nr 8 = 0",
        ],
        taxPLN: "Pole nr 227 oraz PIT-ZG pole nr 10",
      },
      tips: [
        "gdy L02 (zwolnienie lekarskie) -> zredukować wartość diet do 0 (ustawić stawkę 0) oraz ustawić 0 miesięcy zagranicą.",
      ],
    },
    {
      currency: "EUR",
      diet: 48,
      dietFactor: 0.3,
      id: "belgium",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "paidTax",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
        paymentDate: "Paye Le",
      },
      label: "Belgia",
      monthlyIncomeCost: 111.25,
      subLabels: {
        incomePLN: [
          "Pole nr 43 oraz PIT-ZG pole nr 9",
          "W polu PIT-ZG pole nr 8 = 0",
        ],
        taxPLN: "Pole nr 204 oraz PIT-ZG pole nr 10",
      },
    },
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "france",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Total Brut",
        paymentDate: "Paye Le",
      },
      label: "Francja",
      monthlyIncomeCost: 111.25,
      subLabels: {
        incomePLN: [
          "PIT-ZG pole nr 8",
          "PIT-ZG pole nr 9,10 = 0, sprawdzić pole nr 222",
        ],
      },
    },
    {
      currency: "EUR",
      diet: 49,
      dietFactor: 0.3,
      id: "germany",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Pole nr 20 - Steuefreue…",
        income: "Pole nr 3 - Bruttoarbaitslohn (Gesamt-Brutto)",
      },
      label: "Niemcy",
      monthlyIncomeCost: 111.25,
      subLabels: {
        incomePLN: [
          "PIT-ZG pole nr 8",
          "PIT-ZG pole nr 9,10 = 0, sprawdzić pole nr 199",
        ],
      },
    },
  ],
  "2020": [
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "netherlands",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
      },
      label: "Holandia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 67", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 259",
      },
      tips: [
        "gdy L20/L02 (zwolnienie lekarskie) -> zredukować wartość diet do 0 (ustawić stawkę 0) oraz ustawić 0 miesięcy zagranicą.",
      ],
    },
    {
      currency: "EUR",
      diet: 48,
      dietFactor: 0.3,
      id: "belgium",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "incomePLN",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income:
          "Loon loonbelasting/volksverzekeringen / Imposable / Totaal Bezoldigingen",
        paidTax:
          "Ingehouden loonbelasting/premie volksverz. (loonheffing) / Totaal Bedrijfsvoorheffing",
        paymentDate: "Paye Le / Calcule le",
      },
      label: "Belgia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 8", "PIT-ZG: pole 9 i 10 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 204",
      },
    },
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "france",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Total Brut",
        paymentDate: "Paye Le",
      },
      label: "Francja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 254",
        ],
      },
    },
    {
      currency: "EUR",
      diet: 49,
      dietFactor: 0.3,
      id: "germany",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Pole nr 20 - Steuefreue…",
        income: "Pole nr 3 - Bruttoarbaitslohn (Gesamt-Brutto)",
      },
      label: "Niemcy",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 254",
        ],
      },
    },
    {
      currency: "NOK",
      diet: 451,
      dietFactor: 0.3,
      id: "norway",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Feriepenger",
        income: "Hourly wage (amount)",
      },
      label: "Norwegia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 254",
        ],
      },
    },
    {
      currency: "CHF",
      diet: 88,
      dietFactor: 0.3,
      id: "switzerland",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Bruttolohn total / Salaire brut total / Salario lordo totale",
      },
      label: "Szwajcaria",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 254",
        ],
      },
    },
  ],
  "2021": [
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "netherlands",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
      },
      label: "Holandia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 67", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 287",
      },
      tips: [
        "gdy L20/L02/L07 (zwolnienie lekarskie) -> zredukować wartość diet do 0 (ustawić stawkę 0) oraz ustawić 0 miesięcy zagranicą.",
      ],
    },
    {
      currency: "EUR",
      diet: 48,
      dietFactor: 0.3,
      id: "belgium",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "paidTax",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income:
          "Loon loonbelasting/volksverzekeringen / Imposable / Totaal Bezoldigingen",
        paidTax:
          "Ingehouden loonbelasting/premie volksverz. (loonheffing) / Totaal Bedrijfsvoorheffing / Precompte",
        paymentDate: "Paye Le / Calcule le",
      },
      label: "Belgia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 67", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 287",
      },
    },
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "france",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Total Brut",
        paymentDate: "Paye Le",
      },
      label: "Francja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 281",
        ],
      },
    },
    {
      currency: "EUR",
      diet: 49,
      dietFactor: 0.3,
      id: "germany",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Pole nr 20 - Steuefreue…",
        income: "Pole nr 3 - Bruttoarbaitslohn (Gesamt-Brutto)",
      },
      label: "Niemcy",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 281",
        ],
      },
    },
    {
      currency: "NOK",
      diet: 451,
      dietFactor: 0.3,
      id: "norway",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        additionalIncome: "Feriepenger",
        income: "Hourly wage (amount)",
      },
      label: "Norwegia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 254",
        ],
      },
    },
    {
      currency: "CHF",
      diet: 88,
      dietFactor: 0.3,
      id: "switzerland",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Bruttolohn total / Salaire brut total / Salario lordo totale",
      },
      label: "Szwajcaria",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 281",
        ],
      },
    },
  ],
  "2022": [
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "netherlands",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
      },
      label: "Holandia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
      tips: [
        "gdy L20/L02/L07 (zwolnienie lekarskie) -> zredukować wartość diet do 0 (ustawić stawkę 0) oraz ustawić 0 miesięcy zagranicą.",
      ],
    },
    {
      currency: "EUR",
      diet: 48,
      dietFactor: 0.3,
      id: "belgium",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "paidTax",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income:
          "Loon loonbelasting/volksverzekeringen / Imposable / Totaal Bezoldigingen",
        paidTax:
          "Ingehouden loonbelasting/premie volksverz. (loonheffing) / Totaal Bedrijfsvoorheffing / Precompte",
        paymentDate: "Paye Le / Calcule le",
      },
      label: "Belgia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
    },
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "france",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Total Brut",
        paymentDate: "Paye Le",
      },
      label: "Francja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "EUR",
      diet: 49,
      dietFactor: 0.3,
      id: "germany",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Pole nr 21",
        income: "Pole nr 3 - Bruttoarbaitslohn (Gesamt-Brutto)",
      },
      label: "Niemcy",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "NOK",
      diet: 451,
      dietFactor: 0.3,
      id: "norway",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "additionalIncome",
          "paidTax",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Feriepenger",
        income: "Feriengegrunnlag + Opptjente feriepenger, Lønn mv (8,0%)",
        paidTax: "Skattetrekk, Forskuddstrekk",
      },
      label: "Norwegia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
    },
    {
      currency: "CHF",
      diet: 88,
      dietFactor: 0.3,
      id: "switzerland",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Bruttolohn total / Salaire brut total / Salario lordo totale",
      },
      label: "Szwajcaria",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "SEK",
      diet: 510,
      dietFactor: 0.3,
      id: "sweden",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Gross income",
      },
      label: "Szwecja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
  ],
  "2023": [
    {
      currency: "EUR",
      diet: 50,
      dietFactor: 0.3,
      id: "netherlands",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        income: "Loon loonbelasting/volksverzekeringen",
        paidTax: "Ingehouden loonbelasting/premie volksverz. (loonheffing)",
      },
      label: "Holandia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
      tips: [
        "gdy L20/L02/L07 (zwolnienie lekarskie) -> zredukować wartość diet do 0 (ustawić stawkę 0) oraz ustawić 0 miesięcy zagranicą.",
      ],
    },
    {
      currency: "EUR",
      diet: 55,
      dietFactor: 0.3,
      id: "belgium",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "paidTax",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income:
          "Loon loonbelasting/volksverzekeringen / Imposable / Totaal Bezoldigingen",
        paidTax:
          "Ingehouden loonbelasting/premie volksverz. (loonheffing) / Totaal Bedrijfsvoorheffing / Precompte",
        paymentDate: "Paye Le / Calcule le",
      },
      label: "Belgia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
    },
    {
      currency: "EUR",
      diet: 55,
      dietFactor: 0.3,
      id: "france",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "paymentDate",
          "daysInPoland",
        ],
      },
      intl: {
        income: "Total Brut",
        paymentDate: "Paye Le",
      },
      label: "Francja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "EUR",
      diet: 49,
      dietFactor: 0.3,
      id: "germany",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Pole nr 21",
        income: "Pole nr 3 - Bruttoarbaitslohn (Gesamt-Brutto)",
      },
      label: "Niemcy",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "NOK",
      diet: 496,
      dietFactor: 0.3,
      id: "norway",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: [
          "income",
          "additionalIncome",
          "paidTax",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {
        additionalIncome: "Feriepenger",
        income: "Feriengegrunnlag + Opptjente feriepenger, Lønn mv (8,0%)",
        paidTax: "Skattetrekk, Forskuddstrekk",
      },
      label: "Norwegia",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
    },
    {
      currency: "CHF",
      diet: 88,
      dietFactor: 0.3,
      id: "switzerland",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Bruttolohn total / Salaire brut total / Salario lordo totale",
      },
      label: "Szwajcaria",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "SEK",
      diet: 510,
      dietFactor: 0.3,
      id: "sweden",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "startDate",
          "endDate",
          "daysInPoland",
          "paymentDate",
        ],
      },
      intl: {
        income: "Gross income",
      },
      label: "Szwecja",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
    {
      currency: "GBP",
      diet: 45,
      dietFactor: 0.3,
      id: "great-britain",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dailyDiet",
          "workDays",
          "allAllowanceValue",
          "taxPLN",
          "incomePLN",
        ],
        manual: ["income", "paidTax", "startDate", "endDate", "daysInPoland"],
      },
      intl: {
        // income: "",
        // paidTax: "",
      },
      label: "Wielka Brytania",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: ["PIT-ZG: pole 9, PIT-36: pole 89", "PIT-ZG: pole 8 = 0"],
        taxPLN: "PIT-ZG: pole 10, PIT-36: pole 309",
      },
      tips: [],
    },
    {
      currency: "EUR",
      diet: 53,
      dietFactor: 0.3,
      id: "italy",
      inputs: {
        auto: [
          "currencyValue",
          "allowanceMonths",
          "dayAllowanceValue",
          "workDays",
          "dailyDiet",
          "incomePLN",
          "allAllowanceValue",
        ],
        manual: [
          "income",
          "additionalIncome",
          "startDate",
          "endDate",
          "daysInPoland",
        ],
      },
      intl: {},
      label: "Włochy",
      monthlyIncomeCost: 250,
      subLabels: {
        incomePLN: [
          "PIT-ZG: pole 8",
          "PIT-ZG: pola 9,10 = 0, PIT-36: sprawdzić pole 303",
        ],
      },
    },
  ],
};
