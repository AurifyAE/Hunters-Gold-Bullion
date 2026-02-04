import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({
    date: "",
    india: "",
    uae: "",
    london: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Shared date (same format as your screenshot)
      const dateStr = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
        .replace(/\s/g, " "); // ensure spacing

      // Time with AM/PM for each location
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const indiaTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Asia/Kolkata",
      });

      const uaeTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Asia/Dubai",
      });

      const londonTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Europe/London",
      });

      setTimes({
        date: dateStr,
        india: indiaTime,
        uae: uaeTime,
        london: londonTime,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2vw",           // horizontal spacing between sections
        // flexWrap: "wrap",
        background: "rgba(18, 18, 25, 0.75)",
        border: "0.1vw solid rgba(70, 145, 180, 0.34)",
        borderRadius: "8px",
        padding: "1vw 2vw",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        width: "100%",
      }}
    >
      {/* Shared Date */}
      <Box >
        <Typography
          sx={{
            fontSize: "1.5vw",
            fontWeight: 700,
            letterSpacing: "1.2px",
            background: "linear-gradient(90deg, #70DDF0, #A8D0F5, #70CCF0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 1px 6px rgba(200, 160, 60, 0.3)",
          }}
        >
          {times.date || "— — —"}
        </Typography>
      </Box>

      {/* India Time */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "1.4vw",
            fontWeight: 600,
            color: "#70DDF0",
            letterSpacing: "0.8px",
          }}
        >
          India
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6vw",
            fontWeight: 500,
            color: "#ffffff",
          }}
        >
          {times.india || "--:-- AM"}
        </Typography>
      </Box>

      {/* UAE Time */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "1.4vw",
            fontWeight: 600,
            color: "#70DDF0",
          }}
        >
          UAE
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6vw",
            fontWeight: 500,
            color: "#ffffff",
          }}
        >
          {times.uae || "--:-- AM"}
        </Typography>
      </Box>

      {/* London Time */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "1.4vw",
            fontWeight: 600,
            color: "#70DDF0",
          }}
        >
          London
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6vw",
            fontWeight: 500,
            color: "#ffffff",
          }}
        >
          {times.london || "--:-- AM"}
        </Typography>
      </Box>
    </Box>
  );
};

export default WorldClockHorizontal;