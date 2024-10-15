import { Race } from "@app-types/ergastResponse/primitive";
import { RaceResultEntry } from "@app-types/ergastResponse/results/race";

export interface SprintResultTable {
  season: string;
  Races: SprintResult[];
}

export interface SprintResult extends Race {
  SprintResults: RaceResultEntry[];
}
