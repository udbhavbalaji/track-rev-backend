// Type declarations for the standings responses to be given by our endpoints

// import {
//   ConstructorType,
//   DriverType,
// } from "@app-types/trackRevRequest/primitive";

interface StandingBodyResponseType {
  season: string;
  round: number;
}

// info: THIS IS THE TYPE RETURNED BY THE /constructors/standings/:year? ENDPOINT
export interface ConstructorStandingsResponse extends StandingBodyResponseType {
  Standings: ConstructorStandingType[];
}

// info: THIS IS THE TYPE RETURNED BY THE /drivers/standings/:year? ENDPOINT
export interface DriverStandingsResponse extends StandingBodyResponseType {
  Standings: DriverStandingType[];
}

interface StandingEntryType {
  position: number;
  points: number;
  wins: number;
}

export interface ConstructorStandingType extends StandingEntryType {
  constructorId: string;
  constructorName: string;
  constructorNationality: string;
}

export interface DriverStandingType extends StandingEntryType {
  driverNumber: number;
  code: string;
  driverName: string;
  driverNationality: string;
  constructorId: string;
  constructorName: string;
  constructorNationality: string;
  // Constructor: ConstructorType;
}
