import React, { FunctionComponent, useContext, useState } from "react";

import {
  CancelOutlined as CancelOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
import {
  Container,
  List,
  ListItem,
  Portal,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { CountryContext } from "contexts/CountryContext";

export const TipsPanel: FunctionComponent = () => {
  const { countryData } = useContext(CountryContext);
  const [isTipsActive, setIsTipsActive] = useState(false);

  const { tips } = countryData;
  const areTipsAvailable = !!tips?.length;

  return (
    <>
      {areTipsAvailable ? (
        <Portal container={document.getElementById("root")}>
          <Wrapper
            disableGutters
            as="aside"
            data-print={false}
            isTipsActive={isTipsActive}
          >
            <InfoIconContainer
              disableGutters
              onClick={() => setIsTipsActive(true)}
              isTipsActive={isTipsActive}
            >
              <InfoOutlinedIcon />
            </InfoIconContainer>
            <Container disableGutters>
              <Tooltip title="Schowaj">
                <HideTipIcon onClick={() => setIsTipsActive(false)} />
              </Tooltip>
              <Title variant="h6" align="center">
                Pamiętaj
              </Title>
              <StyledList>
                {/*  TODO: Usunąć typowanie explicite */}
                {tips.map((tip: string, i: number) => (
                  <StyledListItem key={i}>
                    <Typography variant="body1">{tip}</Typography>
                  </StyledListItem>
                ))}
              </StyledList>
            </Container>
          </Wrapper>
        </Portal>
      ) : null}
    </>
  );
};

const Wrapper = styled(Container, {
  shouldForwardProp: (prop) => prop !== "isTipsActive",
})<{ isTipsActive: boolean }>(({ theme, isTipsActive }) => ({
  position: "fixed",
  top: "50%",
  left: "0",
  transform: isTipsActive ? "translate(0, -50%)" : "translate(-100%, -50%)",
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
  backgroundColor: theme.palette.secondary.main,
  width: "350px",
  padding: "20px 35px",
  transition: `transform ${theme.transitions.duration.medium}ms ${theme.transitions.easing.easeInOut}`,
  boxShadow: theme.shadows[10],
}));

const InfoIconContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "isTipsActive",
})<{ isTipsActive: boolean }>(({ theme, isTipsActive }) => ({
  position: "absolute",
  top: "50%",
  left: "100%",
  background: theme.palette.secondary.main,
  transform: "translateY(-50%)",
  display: "flex",
  width: "fit-content",
  textAlign: "center",
  padding: "15px",
  transformOrigin: "top left",
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
  fontSize: "20px",
  opacity: isTipsActive ? "0" : "1",
  visibility: isTipsActive ? "hidden" : "visible",
  cursor: "pointer",
  backfaceVisibility: "hidden",
  transition: `${theme.transitions.duration.medium}ms 0.2s ${theme.transitions.easing.easeInOut}`,
}));

const HideTipIcon = styled(CancelOutlinedIcon)({
  width: "25px",
  height: "auto",
  position: "absolute",
  top: "15px",
  right: "15px",
  cursor: "pointer",
});

const Title = styled(Typography)({
  fontWeight: "700",
  marginBottom: "15px",
});

const StyledList = styled(List)({
  listStyle: "disc",
});

const StyledListItem = styled(ListItem)({
  listStyleType: "default",
  padding: "0",
  display: "list-item",
  marginBottom: "10px",
  "&:last-child": {
    marginBottom: "0",
  },
});
