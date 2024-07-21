"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const states_1 = __importDefault(require("./routes/states"));
const stateDates_1 = __importDefault(require("./routes/stateDates"));
const customerData_1 = __importDefault(require("./routes/customerData"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/states', states_1.default);
app.use('/state-dates', stateDates_1.default);
app.use('/customer-data', customerData_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
