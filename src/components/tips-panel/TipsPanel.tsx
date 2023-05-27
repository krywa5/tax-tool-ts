import React, { FunctionComponent, useState } from "react";

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
import { useCountryData } from "hooks/useCountryData";
import { CountryId } from "types/Country";

interface TipsPanelProps {
  selectedCountry: CountryId;
}

export const TipsPanel: FunctionComponent<TipsPanelProps> = ({
  selectedCountry,
}) => {
  const { countryData } = useCountryData(selectedCountry);
  const [isTipsActive, setIsTipsActive] = useState(false);

  const areTipsAvailable = !!countryData?.tips?.length;

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
                {countryData?.tips?.map((tip, i) => (
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
  width: "400px",
  padding: theme.spacing(4),
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
  padding: theme.spacing(3),
  transformOrigin: "top left",
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
  fontSize: "1.25rem",
  opacity: isTipsActive ? "0" : "1",
  visibility: isTipsActive ? "hidden" : "visible",
  cursor: "pointer",
  backfaceVisibility: "hidden",
  transition: `${theme.transitions.duration.medium}ms 0.2s ${theme.transitions.easing.easeInOut}`,
}));

const HideTipIcon = styled(CancelOutlinedIcon)(({ theme }) => ({
  width: "25px",
  height: "auto",
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  cursor: "pointer",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  marginBottom: theme.spacing(2),
}));

const StyledList = styled(List)({
  listStyle: "disc",
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  listStyleType: "default",
  padding: "0",
  display: "list-item",
  marginBottom: theme.spacing(1),
  "&:last-child": {
    marginBottom: "0",
  },
}));
