import { Router } from "express";
import { salesData } from "../index";

const router = Router();

const getDateRangeForState = (stateName: string) => {
  const state = salesData.find(
    (s: any) => s.State.toLowerCase() === stateName.toLowerCase()
  );
  if (!state) return null;

  const dates: any = [state["Order Date"], state["Ship Date"]];

  const minDate = new Date(
    Math.min(...dates.map((date: string) => new Date(date)))
  );
  const maxDate = new Date(
    Math.max(...dates.map((date: string) => new Date(date)))
  );

  return {
    minOrderDate: minDate.toISOString().split("T")[0],
    maxOrderDate: maxDate.toISOString().split("T")[0],
    minShipDate: minDate.toISOString().split("T")[0],
    maxShipDate: maxDate.toISOString().split("T")[0],
  };
};

router.get("/dates", (req, res) => {
  const { state } = req.query;
  if (!state || typeof state !== "string") {
    return res.status(400).json({
      error: "State query parameter is required and must be a string",
    });
  }

  const dateRange = getDateRangeForState(state);
  if (!dateRange) {
    return  res.json([]);;
  }

  res.json(dateRange);
});

export default router;
