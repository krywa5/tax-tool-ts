import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import { GuidString } from "types/AppTypes";
import { Income } from "types/Income";
import { sortByKey } from "utils/arrayUtils";

interface IncomesTableContextType {
  incomes: Income[];
  addNewIncome: (income: Income) => void;
  removeIncome: (incomeId: GuidString) => void;
  resetIncomes: () => void;
}

export const IncomesTableContext = createContext<IncomesTableContextType>({
  incomes: [],
  addNewIncome: () => {},
  removeIncome: () => {},
  resetIncomes: () => {},
});

export const IncomesTableProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [incomes, setIncomes] = useState<Income[]>([]);

  const addNewIncome = useCallback((income: Income) => {
    setIncomes((currentIncomes) =>
      sortByKey([...currentIncomes, income], "startDate"),
    );
  }, []);

  const removeIncome = useCallback((incomeId: GuidString) => {
    setIncomes((currentIncomes) =>
      [...currentIncomes].filter((income) => income.id !== incomeId),
    );
  }, []);

  const resetIncomes = useCallback(() => {
    setIncomes([]);
  }, []);

  return (
    <IncomesTableContext.Provider
      value={{
        incomes,
        addNewIncome,
        removeIncome,
        resetIncomes,
      }}
    >
      {children}
    </IncomesTableContext.Provider>
  );
};
