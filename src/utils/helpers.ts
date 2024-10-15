import { RaceScheduleType } from "@app-types/trackRevRequest/schedule";

export const isSprintRound = (item: RaceScheduleType): boolean => {
  return item.Sprint ? true : false;
};
