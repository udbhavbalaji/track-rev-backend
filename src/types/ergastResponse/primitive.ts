import { StandingsTable } from "@app-types/ergastResponse/standings";
import { RaceScheduleTable } from "@app-types/ergastResponse/schedule";
import { RaceResultTable } from "@app-types/ergastResponse/results/race";
import { QualifyingResultTable } from "@app-types/ergastResponse/results/qualifying";
import { SprintResultTable } from "@app-types/ergastResponse/results/sprint";

// Type declarations for Response Objects
export type Table =
  | { StandingsTable: StandingsTable }
  | { RaceTable: RaceScheduleTable }
  | { RaceTable: RaceResultTable }
  | { RaceTable: QualifyingResultTable }
  | { RaceTable: SprintResultTable };

export interface ErgastResponse<T extends Table> {
  MRData: MRData & T;
}

interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
}

// Type declarations for primitive objects

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
}

export interface ResultEntry {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
}

export interface FastestLap {
  lap: string;
  Time: {
    time: string;
  };
}
