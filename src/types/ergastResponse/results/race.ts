import {
  FastestLap,
  Race,
  ResultEntry,
} from "@app-types/ergastResponse/primitive";

export interface RaceResultTable {
  season: string;
  Races: RaceResult[];
}

export interface RaceResult extends Race {
  Results: RaceResultEntry[];
}

export interface RaceResultEntry extends ResultEntry {
  positionText: string;
  points: string;
  grid: string;
  laps: string;
  status: string;
  Time: {
    millis: string;
    time: string;
  };
  FastestLap: FastestLap;
}
