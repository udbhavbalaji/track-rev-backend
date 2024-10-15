export interface TrackRevResponse<T> {
  status: "Success" | "Error";
  data: T | T[];
}

export interface ErrorResponse {
  error: string;
}

export interface SessionTimingType {
  date: string;
  time: string;
}

export interface ConstructorType {
  constructorId: string;
  name: string;
  nationality: string;
}

export interface DriverType {
  permanentNumber: number;
  code: string;
  givenName: string;
  familyName: string;
  nationality: string;
  Constructor: ConstructorType;
}

export interface RaceType {
  season: string;
  round: number;
  raceName: string;
  circuitName: string;
}

export interface ResultEntryType {
  driverNumber: number;
  position: number;
  driverName: string;
  driverCode: string;
  constructorId: string;
  constructorName: string;
}
