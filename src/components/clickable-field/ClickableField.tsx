import React, { FunctionComponent, PropsWithChildren } from "react";
import { toast } from "react-toastify";

import { styled } from "@mui/material";

export const ClickableField: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const copyToClipboard = (e: any) => {
    const target = e.target as HTMLInputElement;
    let value = target.innerText;

    // jeśli target jest inputem to bierzemy jego value
    if (target.matches("input")) {
      value = String(target.value).replace(".", ",");
    }

    const formattedValue = value.split(/\s/).join("");

    navigator.clipboard.writeText(formattedValue).then(
      () => {
        toast.success(`Wartość ${value} skopiowano do schowka`, {
          position: "top-center",
          autoClose: 2000,
        });
      },
      (err) => {
        toast.error(
          "Wystąpił błąd podczas kopiowania wartości. Przepisz ją ręcznie.",
        );
        console.error(err);
      },
    );
  };

  return (
    <StylableContainer onClick={copyToClipboard}>{children}</StylableContainer>
  );
};

const StylableContainer = styled("div")({
  display: "inline",
  cursor: "pointer",

  "& input": {
    cursor: "pointer",
  },
});
