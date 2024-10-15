import {
  ErrorResponse,
  TrackRevResponse,
} from "@app-types/trackRevRequest/primitive";
import { QualifyingResultType } from "@app-types/trackRevRequest/results/qualifying";
import { RaceResultType } from "@app-types/trackRevRequest/results/race";
import { RaceScheduleType } from "@app-types/trackRevRequest/schedule";
import {
  ConstructorStandingsResponse,
  DriverStandingsResponse,
} from "@app-types/trackRevRequest/standings";
import {
  getConstructorStandings,
  getDriverStandings,
  getQualifyingResult,
  getRaceResult,
  getSeasonSchedule,
  getSprintResult,
  getSprintRounds,
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
      const responseObject: TrackRevResponse<ConstructorStandingsResponse> = {
        status: "Success",
        data: response,
      };
      res.status(200).send(responseObject);
    } else {
      const responseObject: TrackRevResponse<ErrorResponse> = {
        status: "Error",
        data: { error: "Internal Server Error" },
      };
      res.status(500).send(responseObject);
    }
  }
);

router.get("/drivers/standings/:year?", async (req: Request, res: Response) => {
  const year = req.params.year;
  const response = await getDriverStandings(year ?? CurrentYear);
  if (response) {
    const responseObject: TrackRevResponse<DriverStandingsResponse> = {
      status: "Success",
      data: response,
    };
    res.status(200).send(responseObject);
  } else {
    const responseObject: TrackRevResponse<ErrorResponse> = {
      status: "Error",
      data: { error: "Internal Server Error." },
    };
    res.status(500).send(responseObject);
  }
});

router.get("/races/schedule/:year?", async (req: Request, res: Response) => {
  const year = req.params.year;
  const response = await getSeasonSchedule(year ?? CurrentYear);
  const responseObject: TrackRevResponse<RaceScheduleType> = {
    status: "Success",
    data: response,
  };
  res.status(200).send(responseObject);
});

router.get(
  "/races/sprint-rounds/:year?",
  async (req: Request, res: Response) => {
    const year = req.params.year;
    console.log(year);
    const response = await getSprintRounds(year ?? CurrentYear);
    if (response) {
      const responseObject: TrackRevResponse<number> = {
        status: "Success",
        data: response,
      };
      res.status(200).send(responseObject);
    } else {
      const responseObject: TrackRevResponse<ErrorResponse> = {
        status: "Error",
        data: { error: "Internal Server Error." },
      };
      res.status(500).send(responseObject);
    }
  }
);

router.get(
  "/races/results/:year/:round",
  async (req: Request, res: Response) => {
    const year = req.params.year;
    const round = parseInt(req.params.round);
    const response = await getRaceResult(year, round);
    if (response) {
      const responseObject: TrackRevResponse<RaceResultType> = {
        status: "Success",
        data: response,
      };
      res.status(200).send(responseObject);
    } else {
      const responseObject: TrackRevResponse<ErrorResponse> = {
        status: "Error",
        data: { error: "Internal Server Error." },
      };
      res.status(500).send(responseObject);
    }
  }
);

router.get(
  "/races/qualifying/results/:year/:round",
  async (req: Request, res: Response) => {
    const year = req.params.year;
    const round = parseInt(req.params.round);
    const response = await getQualifyingResult(year, round);
    if (response) {
      const responseObject: TrackRevResponse<QualifyingResultType> = {
        status: "Success",
        data: response,
      };
      res.status(200).send(responseObject);
    } else {
      const responseObject: TrackRevResponse<ErrorResponse> = {
        status: "Error",
        data: { error: "Internal Server Error." },
      };
      res.status(500).send(responseObject);
    }
  }
);

router.get(
  "/races/sprints/results/:year/:round",
  async (req: Request, res: Response) => {
    const year = req.params.year;
    const round = parseInt(req.params.round);
    const sprintRounds = await getSprintRounds(year);
    console.log(sprintRounds);
    if (!sprintRounds) {
      const responseObject: TrackRevResponse<ErrorResponse> = {
        status: "Error",
        data: { error: "Internal Server Error." },
      };
      res.status(500).send(responseObject);
    } else {
      if (sprintRounds.includes(round)) {
        const response = await getSprintResult(year, round, sprintRounds);
        // console.log(response);
        if (response) {
          const responseObject: TrackRevResponse<RaceResultType> = {
            status: "Success",
            data: response,
          };
          res.status(200).send(responseObject);
        } else {
          const responseObject: TrackRevResponse<ErrorResponse> = {
            status: "Error",
            data: { error: "Internal Server Error." },
          };
          res.status(500).send(responseObject);
        }
      } else {
        const responseObject: TrackRevResponse<ErrorResponse> = {
          status: "Error",
          data: { error: "Bad Request. Requested round isn't a Sprint Round." },
        };
        res.status(400).send(responseObject);
      }
    }
  }
);

export default router;
