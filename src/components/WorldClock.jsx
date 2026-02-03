import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () =>
    time
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();

  const formatDay = () =>
    time.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "14vw",
        px: "1.4vw",
        py: "1vw",
        borderRadius: "8px",
        background: "rgba(18, 18, 25, 0.75)",
        border: "1px solid rgba(70 145 180 / 0.34)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* DATE */}
      <Typography
        sx={{
          fontSize: "1.55vw",
          fontWeight: 600,
          letterSpacing: "0.8px",
          background: "linear-gradient(90deg, #70DDF0, #A8D0F5, #70CCF0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 1px 6px rgba(200, 160, 60, 0.25)",
          lineHeight: 1.15,
          mb: "0.35vw",
        }}
      >
        {formatDate()}
      </Typography>

      {/* DAY */}
      <Typography
        sx={{
          fontSize: "1.15vw",
          fontWeight: 400,
          color: "#75B9D4",
          letterSpacing: "1.1px",
          opacity: 0.88,
        }}
      >
        {formatDay()}
      </Typography>
    </Box>
  );
};

export default WorldClock;