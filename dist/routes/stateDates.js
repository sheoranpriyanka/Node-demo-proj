"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const stateDates = {
    California: { minDate: "2020-01-01", maxDate: "2020-12-31" },
    Texas: { minDate: "2019-01-01", maxDate: "2019-12-31" },
    "New York": { minDate: "2021-01-01", maxDate: "2021-12-31" },
    Florida: { minDate: "2018-01-01", maxDate: "2018-12-31" },
    Illinois: { minDate: "2017-01-01", maxDate: "2017-12-31" },
};
router.get("/:state", (req, res) => {
    const state = req.params.state;
    const dates = stateDates[state];
    if (dates) {
        res.json(dates);
    }
    else {
        res.status(404).send("State not found");
    }
});
exports.default = router;
