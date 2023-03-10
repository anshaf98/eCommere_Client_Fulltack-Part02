import React from "react";
import { Skeleton, Card, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div className="col-lg-4 col-sm-6 mb-5">
      <Card sx={{ minHeight: "365px" }} className="box-shadow">
        <Skeleton variant="rectangular" width="100%" animation="wave">
          <Box sx={{ pt: "300px" }}></Box>
        </Skeleton>
        <Box sx={{ p: 1 }}>
          <Skeleton width="100%" animation="wave" height={60} />
          <Skeleton
            width="70%"
            animation="wave"
            height={35}
            sx={{ m: "0 auto" }}
          />
          <Skeleton
            width="70%"
            animation="wave"
            height={35}
            sx={{ m: "0 auto" }}
          />
        </Box>
      </Card>
      <Skeleton
        width="100%"
        animation="wave"
        height={60}
        sx={{ m: "0 auto", mt: 2 }}
      />
    </div>
  );
};

export default ProductCardSkeleton;
