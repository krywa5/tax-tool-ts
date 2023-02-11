import React, { FunctionComponent } from "react";

import { Button, styled, Typography } from "@mui/material";
import { Loader } from "components/loader/Loader";

interface LogoutAlertProps {
  logout: () => void;
  dismiss: () => void;
  isLogoutPending: boolean;
}

export const LogoutAlert: FunctionComponent<LogoutAlertProps> = ({
  logout,
  dismiss,
  isLogoutPending,
}) => {
  return (
    <>
      <Heading variant="body1" align="center">
        Czy na pewno chcesz się wylogować?
      </Heading>
      <ButtonsContainer>
        <Button variant="contained" color="secondary" onClick={logout}>
          {isLogoutPending ? <Loader color="white" isSmall /> : "Tak"}
        </Button>
        <Button variant="outlined" onClick={dismiss}>
          Nie
        </Button>
      </ButtonsContainer>
    </>
  );
};

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: "1em",
  color: theme.palette.primary.main,
}));

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "space-around",
  marginBottom: theme.spacing(1),
}));
