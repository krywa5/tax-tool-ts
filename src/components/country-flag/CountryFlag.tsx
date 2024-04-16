import React, { FunctionComponent } from "react";
import { NavLink, useParams } from "react-router-dom";

import { styled, Tooltip } from "@mui/material";
import belgiumFlag from "assets/images/flags/belgium.jpg";
import franceFlag from "assets/images/flags/france.jpg";
import germanyFlag from "assets/images/flags/germany.jpg";
import greatBritainFlag from "assets/images/flags/great-britain.png";
import italyFlag from "assets/images/flags/italy.png";
import netherlandsFlag from "assets/images/flags/netherlands.jpg";
import noFlag from "assets/images/flags/no-flag.jpg";
import norwayFlag from "assets/images/flags/norway.png";
import swedenFlag from "assets/images/flags/sweden.png";
import switzerlandFlag from "assets/images/flags/switzerland.png";
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
  const { countryId: selectedCountry } = useParams();
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
      case "sweden":
        return swedenFlag;
      case "great-britain":
        return greatBritainFlag;
      case "italy":
        return italyFlag;
      default:
        return noFlag;
    }
  })();

  return (
    <Tooltip title={countryLabel} placement="bottom">
      <FlagListItem data-selected={country === selectedCountry}>
        <NavLink
          to={
            country === selectedCountry
              ? PATHS.home
              : `${PATHS.home}/${country}`
          }
        >
          <FlagImg src={flagImg} alt="country flag" />
        </NavLink>
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
    transform: `translateY(-${theme.spacing(1)})`,

    "&::before": {
      opacity: "1",
    },
  },
  "&[data-selected='true']": {
    outline: `5px solid ${theme.palette.secondary.main}`,
    transform: `translateY(-${theme.spacing(1)})`,
  },
}));

const FlagImg = styled("img")({
  objectFit: "cover",
  objectPosition: "center",
  width: "100%",
  aspectRatio: "16/9",
});
