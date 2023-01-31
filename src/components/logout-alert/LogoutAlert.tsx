import React, { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, styled, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { firebaseLogout } from "infrastructure/services/firebase/firebase.service";
import { PATHS } from "routing/paths";
import { closeAuthSession } from "utils/authUtils";

export const LogoutAlert: FunctionComponent = () => {
  const navigate = useNavigate();
  const { setIsUserLogged, setSelectedCountry } = useContext(AppContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const clickHandler = () => {
    firebaseLogout()
      .then(() => {
        closeAuthSession();
        navigate(PATHS.loginPage);
        setIsUserLogged(false);
        setSelectedCountry("");
      })
      .catch((err) => {
        toast.error("Wystąpił błąd podczas wylogowywania");
        console.error(err);
      });
  };

  return (
    <>
      <Heading variant="body1" align="center">
        Czy na pewno chcesz się wylogować?
      </Heading>
      <SubmitButton
        variant="contained"
        color="secondary"
        onClick={clickHandler}
      >
        Wyloguj
      </SubmitButton>
    </>
  );
};

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: "2em",
  color: theme.palette.primary.main,
}));

const SubmitButton = styled(Button)({
  margin: "0 auto",
  display: "block",
});
