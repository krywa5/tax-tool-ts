import React, { FunctionComponent } from "react";

import { Button, styled, Typography } from "@mui/material";

interface DismissFormProps {
  text: string;
  rejectBtnText: string;
  acceptBtnText: string;
  rejectHandler: () => void;
  acceptHandler: () => void;
}

export const DismissForm: FunctionComponent<DismissFormProps> = ({
  text,
  rejectBtnText,
  acceptBtnText,
  rejectHandler,
  acceptHandler,
}) => {
  return (
    <Container>
      <Typography variant="body1" align="center">
        {text}
      </Typography>
      <div>
        <Button variant="contained" onClick={acceptHandler}>
          {acceptBtnText}
        </Button>
        <RejectButton onClick={rejectHandler} variant="outlined">
          {rejectBtnText}
        </RejectButton>
      </div>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const RejectButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
