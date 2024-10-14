import {
  getConstructorStandings,
  getDriverStandings,
} from "@services/ergastService";
import express, { Request, Response } from "express";

const router = express.Router();
const CurrentYear = new Date().getFullYear();

router.get(
  "/constructors/standings/:year?",
  async (req: Request, res: Response) => {
    const year = req.params.year;
    const response = await getConstructorStandings(year ?? CurrentYear);
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(500).send({ error: "Internal Server Error." });
    }
  }
);

router.get("/drivers/standings/:year?", async (req: Request, res: Response) => {
  const year = req.params.year;
  const response = await getDriverStandings(year ?? CurrentYear);
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(500).send({ error: "Internal Server Error." });
  }
});

export default router;
