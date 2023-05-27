import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";

import { DismissForm } from "components/dismiss-form/DismissForm";
import { AppContext } from "contexts/AppContext";
import { StateSetter } from "types/AppTypes";
import { AvailableYear } from "types/AvailableYear";

export interface YearConflictAlertListenerProps {
  endDate: Date | null;
}

export const YearConflictAlertListener: FunctionComponent<
  PropsWithChildren<YearConflictAlertListenerProps>
> = ({ endDate, children }) => {
  const { selectedYear, setSelectedYear, availableYears } =
    useContext(AppContext);

  // Handle difference in selected year and end date
  useEffect(() => {
    if (!endDate) return;

    const endDateYear = endDate.getFullYear().toString();

    if (endDateYear !== selectedYear) {
      toast.warn(
        ({ closeToast }) => (
          <YearConflictAlertDismissForm
            availableYears={availableYears}
            closeToast={closeToast}
            endDateYear={endDateYear}
            setSelectedYear={setSelectedYear}
          />
        ),
        {
          autoClose: false,
          toastId: "wrong-year-toast-id",
        },
      );
    }
  }, [selectedYear, endDate, setSelectedYear, availableYears]);

  return <>{children}</>;
};

interface YearConflictAlertDismissFormProps {
  availableYears: string[];
  closeToast?: () => void;
  endDateYear: string;
  setSelectedYear: StateSetter<AvailableYear>;
}

const YearConflictAlertDismissForm: FunctionComponent<
  YearConflictAlertDismissFormProps
> = ({ closeToast, availableYears, endDateYear, setSelectedYear }) => {
  return (
    <DismissForm
      text="Rok zakończenia pracy różni się od roku rozliczenia!"
      acceptBtnText="Zmień"
      rejectBtnText="Zostaw"
      rejectHandler={() => {
        closeToast?.();
      }}
      acceptHandler={() => {
        if (availableYears.includes(endDateYear)) {
          setSelectedYear(endDateYear);
        } else {
          toast.error(
            "Brak wybranego roku w bazie danych! Obliczony dochód może być nieprawidłowy!",
          );
        }
        closeToast?.();
      }}
    />
  );
};
