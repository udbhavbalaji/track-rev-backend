import { Constructor, Driver } from "@app-types/ergastResponse/primitive";

// Type declarations for standings objects

export interface StandingsTable {
  season: string;
  round: string;
  StandingsLists: Standing[];
}

interface StandingBody {
  season: string;
  round: string;
}

export interface ConstructorStandings extends StandingBody {
  ConstructorStandings: ConstructorStanding[];
}

export interface DriverStandings extends StandingBody {
  DriverStandings: DriverStanding[];
}

interface StandingsEntry {
  position: string;
  positionText: string;
  points: string;
  wins: string;
}

export interface ConstructorStanding extends StandingsEntry {
  Constructor: Constructor;
}

export interface DriverStanding extends StandingsEntry {
  Driver: Driver;
  Constructors: Constructor[];
}

export type Standing = ConstructorStandings | DriverStandings;
