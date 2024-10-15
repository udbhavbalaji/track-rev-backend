import {
  RaceType,
  ResultEntryType,
} from "@app-types/trackRevRequest/primitive";

export interface RaceResultType extends RaceType {
  Results: RaceResultEntryType[];
}

export interface RaceResultEntryType extends ResultEntryType {
  grid: number;
  laps: number;
  status: string;
  FastestLap: FastestLap;
}

interface FastestLap {
  lap: number;
  lapTime: string;
}
