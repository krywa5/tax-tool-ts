import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Copyright } from "components/copyright/Copyright";
import { Loader } from "components/loader/Loader";
import { AppContext } from "contexts/AppContext";
import { firebaseLogin } from "infrastructure/services/firebase/api/firebaseLogin";
import { PATHS } from "routing/paths";
import { setAuthSession } from "utils/authUtils";
import { translateErrorCode } from "utils/translateUtils";

interface LoginFormFields {
  email: string;
  password: string;
}

const initLoginForm: LoginFormFields = {
  email: "",
  password: "",
};

// TODO: Zaimplementować formika
export const LoginForm: FunctionComponent = () => {
  const [inputData, setInputData] = useState<LoginFormFields>(initLoginForm);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsUserLogged } = useContext(AppContext);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = inputData;
    setIsLoading(true);

    firebaseLogin(email, password)
      .then((user) => {
        const message = "Zalogowano pomyślnie.";

        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setIsLoading(false);
        navigate(PATHS.home);
        setIsUserLogged(true);
        setAuthSession();
      })
      .catch((error) => {
        const message = translateErrorCode(error.code);

        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setIsLoading(false);
      });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevVal) => ({
      ...prevVal,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <StyledContainer as="main" maxWidth="sm" disableGutters fixed>
      <Paper>
        <StyledAvatar>
          <LockIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Zaloguj do TaxTool
        </Typography>
        <Form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputHandler}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isLoading ? <Loader color="white" isSmall /> : "Zaloguj"}
          </SubmitButton>
        </Form>
      </Paper>
      <Box mt={1}>
        <Copyright />
      </Box>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[20],
  animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
}));

const Paper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
}));

const LockIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
