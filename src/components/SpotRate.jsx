import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

import goldImg from "/icons/gold-biscut.png";
import goldLabel from "/icons/gold-icon.svg";
import silverImg from "/icons/silver-biscut.png";
import silverLabel from "/icons/silver-icon.svg";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(prev.current.goldBid, goldData.bid, setGoldBidDir);
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(prev.current.goldAsk, goldData.ask, setGoldAskDir);
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(prev.current.silverBid, silverData.bid, setSilverBidDir);
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(prev.current.silverAsk, silverData.ask, setSilverAskDir);
  }, [silverData.ask]);

  const getColors = (dir) => {
    if (dir === "rise") return { color: "#00ff9d", shadow: "0 0 2.2vw #00ff9d88" };
    if (dir === "fall") return { color: "#ff3366", shadow: "0 0 2.2vw #ff336688" };
    return { color: "#f0f8ff", shadow: "0 0 1.4vw #ffffff44" };
  };

  const PricePulse = ({ label, value, dir }) => {
    const { color, shadow } = getColors(dir);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          bgcolor: "rgba(20,20,35,0.65)",
          border: "1px solid rgba(80,80,120,0.4)",
          borderRadius: "0.9vw",
          p: "0.9vw 1.1vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          ...(hasPulse && {
            animation: dir === "rise" ? "pulseRise 0.8s ease-out" : "pulseFall 0.8s ease-out",
            boxShadow: dir === "rise" ? "0 0 0 0 rgba(0,255,157,0.6)" : "0 0 0 0 rgba(255,51,102,0.6)",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: "1.3vw",
            fontWeight: 600,
            letterSpacing: "0.25vw",
            color: "#88aaff",
            textShadow: "0 0 0.8vw #5577ff",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: "2.4vw",
            fontWeight: 800,
            letterSpacing: "0.18vw",
            textAlign: "center",
            color,
            textShadow: shadow,
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
          }}
        >
          {value}
        </Typography>

        {/* Scanline effect */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, rgba(120,180,255,0.07) 50%, transparent 100%)",
            animation: "scan 6s linear infinite",
            pointerEvents: "none",
          }}
        />
      </Box>
    );
  };

  const MetalPanel = ({ titleImg, metalImg, data, bidDir, askDir, theme }) => {
    const isGold = theme === "gold";

    return (
      <Box
        sx={{
          position: "relative",
          bgcolor: "linear-gradient(135deg, #0f0f1a 0%, #05050f 100%)",
          border: "1px solid rgba(60,60,90,0.4)",
          overflow: "hidden",
          borderRadius: '20px',
          boxShadow: "0 0.8vw 3.2vw rgba(0,0,0,0.7)",
          backdropFilter: "blur(0.4vw)",
          ...(isGold
            ? {
              borderColor: " #FFD9008A",
              boxShadow: "0 0 3vw rgba(255 217 0 / 0.11)",
            }
            : {
              borderColor: " #A0A0FF8E",
              boxShadow: "0 0 3vw rgba(160,180,255,0.15)",
            }),
        }}
      >
        {/* Header with Metal Name + Image + HIGH/LOW */}
        <Box
          sx={{
            height: "5.8vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: "1.8vw",
            borderBottom: "1px solid rgba(100,100,140,0.3)",
            bgcolor: "rgba(12,12,22,0.6)",
          }}
        >
          {/* Left: Metal Name + Small Image */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <Typography
              sx={{
                fontSize: "1.6vw",
                fontWeight: 800,
                letterSpacing: "0.3vw",
                background: isGold
                  ? "linear-gradient(90deg, #ffe066, #ffd700, #ffbb33)"
                  : "linear-gradient(90deg, #aaa, #fff, #aaa)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: isGold ? "0 0 1.4vw #ffdd55" : "0 0 1vw rgba(255,255,255,0.4)",
              }}
            >
              {isGold ? "GOLD" : "SILVER"}
            </Typography>

            <Box sx={{ width: "4.5vw" }}>
              <Box
                component="img"
                src={metalImg}
                alt=""
                sx={{
                  width: "100%",
                  filter: "drop-shadow(0 0.8vw 2.4vw rgba(0,0,0,0.7)) brightness(1.15) contrast(1.1)",
                }}
              />
            </Box>
          </Box>

          {/* Right: HIGH / LOW */}
          <Typography
            sx={{
              fontSize: "1.15vw",
              letterSpacing: "0.15vw",
              opacity: 0.9,
              "& .hl-value-high": {
                color: "#aaffff",
                fontWeight: 700,
                textShadow: "0 0 1vw #44ddff",
              },
              "& .hl-value-low": {
                color: "#ff6b6b",
                fontWeight: 700,
                textShadow: "0 0 1vw #ff6b6b88",
              },
            }}
          >
            HIGH <span className="hl-value-high">{data.high}</span>
            <Box component="span" sx={{ mx: "0.9vw", opacity: 0.6 }}>
              /
            </Box>
            LOW <span className="hl-value-low">{data.low}</span>
          </Typography>
        </Box>

        {/* Price Boxes */}
        <Box sx={{ p: "1.6vw 1.8vw", display: "flex", flexDirection: "column", gap: "1.5vw" }}>
          <Box sx={{ display: "flex", gap: "1.2vw" }}>
            <PricePulse label="BID" value={data.bid} dir={bidDir} />
            <PricePulse label="ASK" value={data.ask} dir={askDir} />
          </Box>
        </Box>


      </Box>
    );
  };

  return (
    <Box sx={{ p: "1.5vw 1vw", fontFamily: '"Orbitron", "Segoe UI", sans-serif' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2vw", maxWidth: "58vw", mx: "auto" }}>
        <MetalPanel
          titleImg={goldLabel}
          metalImg={goldImg}
          data={goldData}
          bidDir={goldBidDir}
          askDir={goldAskDir}
          theme="gold"
        />

        <MetalPanel
          titleImg={silverLabel}
          metalImg={silverImg}
          data={silverData}
          bidDir={silverBidDir}
          askDir={silverAskDir}
          theme="silver"
        />
      </Box>


    </Box>
  );
};

export default SpotRate;