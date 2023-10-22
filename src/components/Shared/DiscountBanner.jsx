import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import api from "../../api/api";

const DiscountBanner = () => {
  const access = useSelector((state) => state.auth.token);
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    const fetchDiscountInfo = async () => {
      try {
        const response = await api.get("/discount_info/discount_info/", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

        setCurrentData(JSON.parse(response.data.data));
      } catch (error) {
        // Handle error or notify user here, if needed
        console.error("Error fetching discount info:", error);
      }
    };

    fetchDiscountInfo();
  }, [access]);

  if (!currentData.max_discount_percentage) {
    return null; // This will not render anything if max_discount_percentage is missing or 0.
  }

  return (
    <div className="w-full text-center bg-black">
      <Typography variant="body1" sx={{ color: "white", p: 1 }}>
        {`${currentData.max_discount_percentage}% DISCOUNTS FOR EVERY FLIGHT`}
      </Typography>
    </div>
  );
};

export default DiscountBanner;
