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
      <Text variant="body1" align="center">
        {text}
      </Text>
      <div>
        <AcceptButton variant="contained" onClick={acceptHandler}>
          {acceptBtnText}
        </AcceptButton>
        <RejectButton onClick={rejectHandler} variant="outlined">
          {rejectBtnText}
        </RejectButton>
      </div>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Text = styled(Typography)({
  marginBottom: "1.2rem",
});

const AcceptButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor: theme.palette.common.white,
}));

const RejectButton = styled(Button)(({ theme }) => ({
  marginLeft: "1rem",
  color: theme.palette.common.white,
  borderColor: theme.palette.common.white,
}));
