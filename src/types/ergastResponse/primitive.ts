import { StandingsTable } from "@app-types/ergastResponse/standings";

// Type declarations for Response Objects
export type Table = { StandingsTable: StandingsTable };

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
