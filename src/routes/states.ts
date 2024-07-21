import { Router, Request, Response } from "express";
import { salesData } from "../index";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const state = salesData.map((v: any) => v.State);
  res.json([...new Set(state)]);
});

export default router;
