import React, { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { styled, Tooltip } from "@mui/material";
import belgiumFlag from "assets/images/flags/belgium.jpg";
import franceFlag from "assets/images/flags/france.jpg";
import germanyFlag from "assets/images/flags/germany.jpg";
import netherlandsFlag from "assets/images/flags/netherlands.jpg";
import noFlag from "assets/images/flags/no-flag.jpg";
import norwayFlag from "assets/images/flags/norway.png";
import switzerlandFlag from "assets/images/flags/switzerland.png";
import { AppContext } from "contexts/AppContext";
import { PATHS } from "routing/paths";
import { CountryId } from "types/Country";

export interface CountryFlagProps {
  country: CountryId;
  countryLabel: string;
}

export const CountryFlag: FunctionComponent<CountryFlagProps> = ({
  country,
  countryLabel,
}) => {
  const navigate = useNavigate();
  const { selectedCountry, setSelectedCountry } = useContext(AppContext);

  const flagImg = (() => {
    switch (country) {
      case "belgium":
        return belgiumFlag;
      case "france":
        return franceFlag;
      case "germany":
        return germanyFlag;
      case "netherlands":
        return netherlandsFlag;
      case "norway":
        return norwayFlag;
      case "switzerland":
        return switzerlandFlag;
      default:
        return noFlag;
    }
  })();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const clickHandler = () => {
    if (country === selectedCountry) {
      setSelectedCountry("");
      navigate(`${PATHS.home}`);
    } else {
      setSelectedCountry(country);
      navigate(`${PATHS.home}/${country}`);
    }
  };

  return (
    <Tooltip title={countryLabel} placement="bottom">
      <FlagListItem
        data-selected={country === selectedCountry}
        onClick={clickHandler}
      >
        <FlagImg src={flagImg} alt="country flag" />
      </FlagListItem>
    </Tooltip>
  );
};

const FlagListItem = styled("li")(({ theme }) => ({
  cursor: "pointer",
  boxShadow: theme.shadows[5],
  position: "relative",
  transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  userSelect: "none",

  "&:last-child": {
    marginRight: "0",
  },

  "&::before": {
    content: "''",
    display: "block",
    position: "absolute",
    zIndex: "-1",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    opacity: "0",
    boxShadow: theme.shadows[15],
    transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  },

  "&:hover, &.selected": {
    transform: "translateY(-2px)",

    "&::before": {
      opacity: "1",
    },
  },
  "&[data-selected='true']": {
    outline: `3px solid ${theme.palette.secondary.main}`,
  },
}));

const FlagImg = styled("img")({
  objectFit: "cover",
  objectPosition: "center",
  width: "100%",
  aspectRatio: "16/9",
});
