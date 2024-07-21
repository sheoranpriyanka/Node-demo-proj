"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const customerData = {
    customer1: [
        { date: "2020-01-01", value: 10 },
        { date: "2020-01-02", value: 20 },
        { date: "2020-01-03", value: 30 },
    ],
    customer2: [
        { date: "2019-01-01", value: 15 },
        { date: "2019-01-02", value: 25 },
        { date: "2019-01-03", value: 35 },
    ],
};
router.get("/", (req, res) => {
    const customerId = req.query.customerId;
    const minDate = req.query.minDate;
    const maxDate = req.query.maxDate;
    if (!customerId || !minDate || !maxDate) {
        return res.status(400).send("Missing query parameters");
    }
    const data = customerData[customerId];
    if (!data) {
        return res.status(404).send("Customer not found");
    }
    const filteredData = data.filter((d) => d.date >= minDate && d.date <= maxDate);
    const sum = filteredData.reduce((acc, curr) => acc + curr.value, 0);
    res.json({ sum });
});
exports.default = router;
