import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

import dirhamIcon from "/icons/dirham-icon.svg";

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  const getSpot = (metal) => {
    const lower = metal.toLowerCase();
    if (lower.includes("gold")) return goldData;
    if (lower.includes("silver")) return silverData;
    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";
    const intLen = Math.floor(Math.abs(value)).toString().length;
    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows = commodities
    ?.map((item) => {
      const spot = getSpot(item.metal);
      if (!spot) return null;

      const mult = UNIT_MULTIPLIER[item.weight] || 1;
      const pur = purityFactor(item.purity);

      const baseBid = (spot.bid / OUNCE) * AED * mult * item.unit * pur;
      const baseAsk = (spot.ask / OUNCE) * AED * mult * item.unit * pur;

      const bid = baseBid + (Number(item.buyCharge) || 0) + (Number(item.buyPremium) || 0);
      const ask = baseAsk + (Number(item.sellCharge) || 0) + (Number(item.sellPremium) || 0);

      return {
        display: item.purity
          ? `${item.purity} ${item.metal === "Gold Ten TOLA" ? "Gold" : item.metal}`
          : item.metal,
        unit: `${item.unit} ${item.weight}`,
        bid,
        ask,
      };
    })
    .filter(Boolean) ?? [];

  return (
    <Box
      sx={{
        width: "100%",
        mt: "1.2vw",
        borderRadius: "0.8vw",
        overflow: "hidden",
        border: "0.1vw solid rgba(177 227 241 / 0.51)",
        boxShadow: "0 0.8vw 2.8vw rgba(0,0,0,0.7), inset 0 0 1.6vw rgba(30,20,10,0.35)",
        background: "linear-gradient(175deg, #0f1a20 0%, #0a0f15 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40% 20% 20% 20%",
          bgcolor: "rgba(18, 28, 35, 0.92)",
          borderBottom: "1px solid rgba(180, 140, 60, 0.38)",
          py: "0.9vw",
          px: "1.5vw",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            letterSpacing: "0.04vw",
          }}
        >
          Commodity
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            textAlign: "center",
          }}
        >
          Unit
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            textAlign: "right",
            pr: "1.2vw",
          }}
        >
          BID
        </Typography>

        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 600,
            color: "#e3c078",
            textAlign: "right",
          }}
        >
          ASK
        </Typography>
      </Box>

      {/* Rows */}
      {rows.length === 0 ? (
        <Typography
          sx={{
            py: "3vw",
            textAlign: "center",
            color: "rgba(227,192,120,0.4)",
            fontSize: "1.25vw",
          }}
        >
          No data available
        </Typography>
      ) : (
        rows.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "40% 20% 20% 20%",
              alignItems: "center",
              py: "1vw",
              px: "1.5vw",
              borderBottom: index < rows.length - 1 ? "1px solid rgba(80,90,100,0.18)" : "none",
              background: index % 2 === 0 ? "rgba(15,25,32,0.3)" : "transparent",
              transition: "background 0.2s",
            
            }}
          >
            <Typography
              sx={{
                fontSize: "1.24vw",
                fontWeight: 500,
                color: "#e8e0c8",
              }}
            >
              {row.display}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.18vw",
                color: "#d0d8e0",
                textAlign: "center",
              }}
            >
              {row.unit}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "0.5vw",
                pr: "1.2vw",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.32vw",
                  fontWeight: 600,
                  color: "#7df0ff", // cyan/teal BID
                }}
              >
                {formatPrice(row.bid)}
              </Typography>
              
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "0.5vw",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.32vw",
                  fontWeight: 600,
                  color: "#ff88aa", // soft pink ASK
                }}
              >
                {formatPrice(row.ask)}
              </Typography>
            
             
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CommodityTable;