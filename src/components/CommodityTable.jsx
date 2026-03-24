import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

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

  const rows =
    commodities
      ?.map((item) => {
        const spot = getSpot(item.metal);
        if (!spot) return null;

        const mult = UNIT_MULTIPLIER[item.weight] || 1;
        const pur = purityFactor(item.purity);

        const baseBid = (spot.bid / OUNCE) * AED * mult * item.unit * pur;
        const baseAsk = (spot.ask / OUNCE) * AED * mult * item.unit * pur;

        const bid =
          baseBid +
          (Number(item.buyCharge) || 0) +
          (Number(item.buyPremium) || 0);
        const ask =
          baseAsk +
          (Number(item.sellCharge) || 0) +
          (Number(item.sellPremium) || 0);

        return {
          purity: item.purity,
          metal: item.metal,
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
        boxShadow:
          "0 0.8vw 2.8vw rgba(0,0,0,0.7), inset 0 0 1.6vw rgba(30,20,10,0.35)",
        background: "linear-gradient(175deg, #0f1a20 0%, #0a0f15 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr",
          bgcolor: "rgba(18, 28, 35, 0.92)",
          borderBottom: "1px solid rgba(180, 140, 60, 0.38)",
          // py: "0.9vw",
          py: { xs: "12px", sm: "0.9vw" }, // 👈 responsive padding

          px: { xs: "10px", sm: "1.5vw" }, // 👈 responsive padding

          alignItems: "end",
        }}
      >
        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: { xs: "12px", sm: "1.2vw" }, // 👈 responsive font size
            fontWeight: 600,
            color: "#e3c078",
            letterSpacing: "0.04vw",
            textAlign: "start",
          }}
        >
          Commodity
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: { xs: "12px", sm: "1.2vw" }, // 👈 responsive font size

            fontWeight: 600,
            color: "#e3c078",
            textAlign: "start",
          }}
        >
          Unit
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: { xs: "12px", sm: "1.2vw" }, // 👈 responsive font size

            fontWeight: 600,
            color: "#e3c078",
            textAlign: "start",
          }}
        >
          ASK
        </Typography>
      </Box>

      {/* Swiper Rows */}
      {/* <Box sx={{ maxHeight: { xs: "auto", sm: "18vw" } }}> */}
      <Box
        sx={{
          height: { xs: "220px", sm: "18vw" }, // 👈 FIXED height for xs
        }}
      >
        {rows.length === 0 ? (
          <Typography
            sx={{
              py: "3vw",
              textAlign: "center",
              color: "rgba(227,192,120,0.4)",
              // fontSize: "1.25vw",
              fontSize: { xs: "12px", sm: "1.25vw" }, // 👈 responsive font size
            }}
          >
            No data available
          </Typography>
        ) : (
          <Swiper
            modules={[Autoplay]}
            direction="vertical"
            slidesPerView={4}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000}
            allowTouchMove={false}
            // style={{ height: "18vw" }}
            style={{ height: "100%" }} // 👈 IMPORTANT
          >
            {rows.map((row, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.8fr",
                    alignItems: "end",
                    height: "100%",

                    py: "1vw",
                    px: { xs: "10px", sm: "1.5vw" }, // 👈 responsive padding

                    borderBottom: "1px solid rgba(80,90,100,0.18)",
                    background:
                      index % 2 === 0 ? "rgba(15,25,32,0.3)" : "transparent",
                  }}
                >
                  {/* Commodity */}
                  <Typography
                    sx={{
                      // fontSize: "1.24vw",
                      fontSize: { xs: "14px", sm: "1.24vw" }, // 👈 responsive font size
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: "0.3vw",
                      fontWeight: 800,
                      height: "100%",

                      color: "#e8e0c8",
                      gap: "0.3vw",
                    }}
                  >
                    {row.metal}
                    <Typography
                      sx={{
                        // fontSize: "1vw",
                        fontSize: { xs: "10px", sm: "1vw" }, // 👈 responsive font size

                        fontWeight: 400,
                        color: "#e8e0c8",
                      }}
                    >
                      {row.purity}
                    </Typography>
                  </Typography>

                  {/* Unit */}
                  <Typography
                    sx={{
                      // fontSize: "1.18vw",
                      fontSize: { xs: "12px", sm: "1.18vw" }, // 👈 responsive font size
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      color: "#d0d8e0",
                      textAlign: "start",
                    }}
                  >
                    {row.unit}
                  </Typography>

                  {/* ASK */}
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: "0.5vw",
                    }}
                  >
                    <Typography
                      sx={{
                        // fontSize: "1.32vw",
                        fontSize: { xs: "14px", sm: "1.32vw" }, // 👈 responsive font size

                        fontWeight: 600,
                        color: "#ff88aa",
                      }}
                    >
                      {formatPrice(row.ask)}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default CommodityTable;
