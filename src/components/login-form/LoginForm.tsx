import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";

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
import { useAuth } from "hooks/useAuth";

interface LoginFormFields {
  email: string;
  password: string;
}

const initLoginForm: LoginFormFields = {
  email: "",
  password: "",
};

export const LoginForm: FunctionComponent = () => {
  const [inputData, setInputData] = useState<LoginFormFields>(initLoginForm);
  const { signIn, isSignInPending: isLoading } = useAuth();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = inputData;
    await signIn(email, password);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevVal) => ({
      ...prevVal,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <StyledContainer as="main">
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
            disabled={isLoading}
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
  margin: theme.spacing(10, "auto", 0),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[20],
  animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
  maxWidth: 600,
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
