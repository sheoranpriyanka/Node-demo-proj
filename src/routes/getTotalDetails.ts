import { Router } from "express";
import { salesData } from "../index";

const router = Router();

const getTotalDetail = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const data = salesData;

  const filteredData = data.filter(
    (item: any) =>
      item.State.toLowerCase() === stateName.toLowerCase() &&
      new Date(item["Order Date"]) >= new Date(fromDate) &&
      new Date(item["Order Date"]) <= new Date(toDate)
  );

  if (filteredData.length === 0) return null;

  const totalSales = filteredData.reduce(
    (sum: number, item: any) => sum + item.Sales,
    0
  );
  const totalProfit = filteredData.reduce(
    (sum: number, item: any) => sum + item.Profit,
    0
  );
  const totalDiscount = filteredData.reduce(
    (sum: number, item: any) => sum + item.Discount,
    0
  );
  const totalQuantity = filteredData.reduce(
    (sum: number, item: any) => sum + item.Quantity,
    0
  );

  return {
    totalSales,
    totalProfit,
    totalDiscount,
    totalQuantity,
  };
};

router.get("/sum", (req, res) => {
  const { state, fromDate, toDate } = req.query;

  if (
    !state ||
    !fromDate ||
    !toDate ||
    typeof state !== "string" ||
    typeof fromDate !== "string" ||
    typeof toDate !== "string"
  ) {
    return res.status(400).json({
      error:
        "State, fromDate, and toDate query parameters are required and must be strings",
    });
  }

  const aggregatedData = getTotalDetail(state, fromDate, toDate);
  if (!aggregatedData) {
    return res
      .status(404)
      .json({ error: "No data found for the specified state and date range" });
  }

  res.json(aggregatedData);
});

const filterData = (stateName: string, fromDate: string, toDate: string) => {
  return salesData.filter(
    (item: any) =>
      (!stateName || item.State.toLowerCase() === stateName.toLowerCase()) &&
      (!fromDate || new Date(item["Order Date"]) >= new Date(fromDate)) &&
      (!toDate || new Date(item["Order Date"]) <= new Date(toDate))
  );
};

const getSalesByCity = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const filteredData = filterData(stateName, fromDate, toDate);

  const salesByCity = filteredData.reduce((acc: any, item: any) => {
    const city = item.City;
    if (!acc[city]) {
      acc[city] = 0;
    }
    acc[city] += item.Sales;
    return acc;
  }, {});

  const result = Object.keys(salesByCity).map((city) => ({
    city,
    sales: salesByCity[city],
  }));

  return result;
};

const getSalesBySegment = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const filteredData = filterData(stateName, fromDate, toDate);

  const salesBySegment = filteredData.reduce((acc: any, item: any) => {
    const segment = item.Segment;
    if (!acc[segment]) {
      acc[segment] = 0;
    }
    acc[segment] += item.Sales;
    return acc;
  }, {});

  return Object.keys(salesBySegment).map((segment) => ({
    segment,
    sales: salesBySegment[segment],
  }));
};

const getSalesByCategory = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const filteredData = filterData(stateName, fromDate, toDate);

  const salesByCategory = filteredData.reduce((acc: any, item: any) => {
    const category = item.Category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += item.Sales;
    return acc;
  }, {});

  return Object.keys(salesByCategory).map((category) => ({
    category,
    sales: salesByCategory[category],
  }));
};

const getSalesBySubCategory = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const filteredData = filterData(stateName, fromDate, toDate);
  const salesBySubCategory = filteredData.reduce((acc: any, item: any) => {
    const subCategory = item["Sub-Category"];
    if (!acc[subCategory]) {
      acc[subCategory] = 0;
    }
    acc[subCategory] += item.Sales;
    return acc;
  }, {});

  return Object.keys(salesBySubCategory).map((subCategory) => ({
    subCategory,
    sales: salesBySubCategory[subCategory],
  }));
};

const getSalesByProduct = (
  stateName: string,
  fromDate: string,
  toDate: string
) => {
  const filteredData = filterData(stateName, fromDate, toDate);
  const salesByProduct = filteredData.reduce((acc: any, item: any) => {
    const product = item["Product Name"];
    if (!acc[product]) {
      acc[product] = 0;
    }
    acc[product] += item.Sales;
    return acc;
  }, {});

  return Object.keys(salesByProduct).map((product) => ({
    product,
    sales: salesByProduct[product],
  }));
};

router.get("/sales-by-city", (req: any, res: any) => {
  const { state, fromDate, toDate } = req.query;

  if (state && typeof state !== "string") {
    return res
      .status(400)
      .json({ error: "State query parameter must be a string" });
  }
  if (fromDate && typeof fromDate !== "string") {
    return res
      .status(400)
      .json({ error: "FromDate query parameter must be a string" });
  }
  if (toDate && typeof toDate !== "string") {
    return res
      .status(400)
      .json({ error: "ToDate query parameter must be a string" });
  }

  const salesByCity = getSalesByCity(
    state as string,
    fromDate as string,
    toDate as string
  );
  res.json(salesByCity);
});

router.get("/sales-by-segment", (req, res) => {
  const { state, fromDate, toDate } = req.query;

  const salesBySegment = getSalesBySegment(
    state as string,
    fromDate as string,
    toDate as string
  );
  res.json(salesBySegment);
});

router.get("/sales-by-category", (req, res) => {
  const { state, fromDate, toDate } = req.query;

  const salesByCategory = getSalesByCategory(
    state as string,
    fromDate as string,
    toDate as string
  );
  res.json(salesByCategory);
});

router.get("/sales-by-sub-category", (req, res) => {
  const { state, fromDate, toDate } = req.query;

  const salesBySubCategory = getSalesBySubCategory(
    state as string,
    fromDate as string,
    toDate as string
  );
  res.json(salesBySubCategory);
});

router.get("/sales-by-product", (req, res) => {
  const { state, fromDate, toDate } = req.query;

  const salesByProduct = getSalesByProduct(
    state as string,
    fromDate as string,
    toDate as string
  );
  res.json(salesByProduct);
});

export default router;
