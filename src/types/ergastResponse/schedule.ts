import { Race } from "@app-types/ergastResponse/primitive";

export interface RaceScheduleTable {
  season: string;
  Races: RaceSchedule[];
}

export interface RaceSchedule extends Race {
  // declaring mandatory session properties
  FirstPractice: SessionTiming;
  Qualifying: SessionTiming;

  // declaring optional session properties
  SecondPractice?: SessionTiming;
  ThirdPractice?: SessionTiming;
  SprintQualifying?: SessionTiming;
  Sprint?: SessionTiming;
}

interface SessionTiming {
  date: string;
  time: string;
}
