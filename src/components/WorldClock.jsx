import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({
    date: "",
    clocks: {},
  });

  // ✅ Clock Config Array
  const CLOCKS = [
    {
      label: "UAE",
      timeZone: "Asia/Dubai",
      icon: "/icons/uae.png",
    },
    {
      label: "USA",
      timeZone: "America/New_York",
      icon: "/icons/usa.png",
    },
    {
      label: "UK",
      timeZone: "Europe/London",
      icon: "/icons/uk.png",
    },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const dateStr = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const clockTimes = {};

      CLOCKS.forEach((clock) => {
        clockTimes[clock.label] = now.toLocaleTimeString("en-US", {
          ...timeOptions,
          timeZone: clock.timeZone,
        });
      });

      setTimes({
        date: dateStr,
        clocks: clockTimes,
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
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: "10px", sm: "2vw" },
        background: "rgba(18, 18, 25, 0.75)",
        border: "0.1vw solid rgba(70, 145, 180, 0.34)",
        borderRadius: "8px",
        padding: { xs: "12px", sm: "1vw 2vw" },
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        width: "100%",
      }}
    >
      {/* ✅ Date */}
      <Box>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "1.5vw" },
            textAlign: { xs: "center", sm: "left" },
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: "10px", sm: "2vw" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {/* ✅ Dynamic Clocks */}
        {CLOCKS.map((clock, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
                gap: { xs: "6px", sm: "0.5vw" },
                fontSize: { xs: "14px", sm: "1.4vw" },
                fontWeight: 600,
                color: "#70DDF0",
              }}
            >
              <Box
                component="img"
                src={clock.icon}
                alt={clock.label}
                sx={{
                  width: { xs: "20px", sm: "3vw" },
                  objectFit: "contain",
                }}
              />
              {clock.label}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "1.6vw" },
                color: "#fff",
              }}
            >
              {times.clocks?.[clock.label] || "--:-- AM"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WorldClockHorizontal;
