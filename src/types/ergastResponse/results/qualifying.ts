import { Race, ResultEntry } from "@app-types/ergastResponse/primitive";

export interface QualifyingResultTable {
  season: string;
  Races: QualifyingResult[];
}

export interface QualifyingResult extends Race {
  QualifyingResults: QualifyingResultEntry[];
}

export interface QualifyingResultEntry extends ResultEntry {
  Q1?: string;
  Q2?: string;
  Q3?: string;
}
