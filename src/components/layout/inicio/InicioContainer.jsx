/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "../global/Footer";
import Content from "./Content";
import ResponsiveAppBar from "../global/ResponsiveAppBar";
import { Box, Container } from "@mui/material";
import styled from "@emotion/styled";

const ContainerWrapper = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  width: "100%",
  height: "100%",
  backgroundColor: "#A9A9A9",
  borderRadius: "1.5rem",
});

const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  width: "100%",
  height: "100%",
  backgroundColor: "#5c7d9c",
  borderRadius: "1.5rem",
});


const InicioContainer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ContainerWrapper>
        <ResponsiveAppBar />
        <ContentContainer>
          <Content />
        </ContentContainer>
        <Footer />
      </ContainerWrapper>
    </Box>
  );
};

export default InicioContainer;
