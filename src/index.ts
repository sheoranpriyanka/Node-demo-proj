import express from "express";
import statesRouter from "./routes/states";
import stateDatesRouter from "./routes/stateDates";
import totalDataRouter from "./routes/getTotalDetails";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

export const salesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/sales.json"), "utf8")
);

app.use("/states", statesRouter);
app.use("/state-dates", stateDatesRouter);
app.use('/totalDetail', totalDataRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
