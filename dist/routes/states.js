"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const states = ["California", "Texas", "New York", "Florida", "Illinois"];
router.get('/', (req, res) => {
    res.json(states);
});
exports.default = router;
