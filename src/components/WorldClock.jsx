import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({
    date: "",
    uae: "",
    usa: "",
    uk: "",
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

      const uaeTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Asia/Dubai",
      });

      const ukTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "Europe/London",
      });

      const usaTime = now.toLocaleTimeString("en-US", {
        ...timeOptions,
        timeZone: "America/New_York", // You can change to LA/Chicago if needed
      });

      setTimes({
        date: dateStr,
        uae: uaeTime,
        usa: usaTime,
        uk: ukTime,
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

      <Box sx={{ textAlign: "center" }}>

        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: "1.4vw", fontWeight: 600, color: "#70DDF0" }}>
          <Box sx={{ width: "3vw" }}>
            <img src='/icons/uae.png'
            />
          </Box>
          UAE
        </Typography>
        <Typography sx={{ fontSize: "1.6vw", color: "#fff" }}>
          {times.uae || "--:-- AM"}
        </Typography>
      </Box>

      {/* USA */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: "1.4vw", fontWeight: 600, color: "#70DDF0" }}>
          <Box sx={{ width: "3vw" }}>
            <img src='/icons/usa.png'
            />
          </Box>USA
        </Typography>
        <Typography sx={{ fontSize: "1.6vw", color: "#fff" }}>
          {times.usa || "--:-- AM"}
        </Typography>
      </Box>

      {/* UK */}
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: "1.4vw", fontWeight: 600, color: "#70DDF0" }}>
          <Box sx={{ width: "3vw" }}>
            <img src='/icons/uk.png'
            />
          </Box> UK
        </Typography>
        <Typography sx={{ fontSize: "1.6vw", color: "#fff" }}>
          {times.uk || "--:-- AM"}
        </Typography>
      </Box>
    </Box>
  );
};

export default WorldClockHorizontal;