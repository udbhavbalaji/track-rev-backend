import {
  RaceType,
  SessionTimingType,
} from "@app-types/trackRevRequest/primitive";

export interface RaceScheduleType extends RaceType {
  FirstPractice: SessionTimingType;
  SecondPractice?: SessionTimingType;
  ThirdPractice?: SessionTimingType;
  SprintQualifying?: SessionTimingType;
  Qualifying: SessionTimingType;
  Sprint?: SessionTimingType;
  Race: SessionTimingType;
}
