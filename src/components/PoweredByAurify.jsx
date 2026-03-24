import React from "react";
import { Box, Typography } from "@mui/material";
import AurifyLogo from "/images/aurify-logo.svg";

const PoweredByAurify = () => {
  return (
    <Box
      sx={{
        textDecoration: "none",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        // gap: "0.6vw",
        gap: { xs: "6px", sm: "0.6vw" }, // 👈 responsive gap

        // padding: "0.8vw 1.4vw",
        padding: { xs: "20px 12px", sm: "0.8vw 1.4vw" }, // 👈 responsive padding

        // margin: "0 auto",
        mt: "auto",
      }}
    >
      <Typography
        component="a"
        href="https://www.aurify.ae"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          // fontSize: "0.9vw",
          fontSize: { xs: "12px", sm: "0.9vw" }, // 👈 font size for mobile

          fontWeight: 500,
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // gap:'0.5vw',
          gap: { xs: "4px", sm: "0.5vw" }, // 👈 responsive gap

          letterSpacing: "0.05em",
        }}
      >
        Powered by
        {/* <img
          src={AurifyLogo}
          alt="Aurify"
          sx={{
            height: "1.4vw",
             objectFit: "contain",
          }}
        /> */}
        <Box
          component="img"
          src={AurifyLogo}
          alt="Aurify"
          sx={{
            height: { xs: "20px", sm: "1.4vw" }, // 👈 responsive works here
            objectFit: "contain",
          }}
        />
      </Typography>
    </Box>
  );
};

export default PoweredByAurify;
