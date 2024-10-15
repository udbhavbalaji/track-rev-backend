import { ErgastResponse, Table } from "@app-types/ergastResponse/primitive";
import { QualifyingResultTable } from "@app-types/ergastResponse/results/qualifying";
import { RaceResultTable } from "@app-types/ergastResponse/results/race";
import { SprintResultTable } from "@app-types/ergastResponse/results/sprint";
import { RaceScheduleTable } from "@app-types/ergastResponse/schedule";
import { StandingsTable } from "@app-types/ergastResponse/standings";
import { QualifyingResultType } from "@app-types/trackRevRequest/results/qualifying";
import { RaceResultType } from "@app-types/trackRevRequest/results/race";
import { RaceScheduleType } from "@app-types/trackRevRequest/schedule";
import {
  ConstructorStandingsResponse,
  DriverStandingsResponse,
} from "@app-types/trackRevRequest/standings";
import { isSprintRound } from "@utils/helpers";
import {
  convertConstructorStandings,
  convertDriverStandings,
  convertQualifyingResult,
  convertRaceResult,
  convertSeasonSchedule,
  convertSprintResult,
} from "@utils/typeConverter";
import axios from "axios";

const BASE_URL = "http://api.jolpi.ca/ergast";

const makeErgastRequest = async <T extends Table>(
  url: string,
  limit?: number,
  offset?: number
): Promise<ErgastResponse<T>> => {
  if (limit || offset) {
    url += "?";
  }

  if (limit) {
    url += `limit=${limit}`;
  }

  if (offset) {
    url += limit ? `&offset=${offset}` : `offset=${offset}`;
  }

  const response = await axios.get(url);

  const ergastResponse: ErgastResponse<T> = {
    MRData: response.data.MRData,
  };

  return ergastResponse;
};

export const getConstructorStandings = async (
  year: string
): Promise<ConstructorStandingsResponse | undefined> => {
  const response = await makeErgastRequest<{ StandingsTable: StandingsTable }>(
    `${BASE_URL}/f1/${year}/constructorstandings`
  );
  const responseData = response.MRData.StandingsTable.StandingsLists[0];

  if ("ConstructorStandings" in responseData) {
    const processedResponse = convertConstructorStandings(responseData);
    return processedResponse;
  } else {
    return undefined;
  }
};

export const getDriverStandings = async (
  year: string
): Promise<DriverStandingsResponse | undefined> => {
  const response = await makeErgastRequest<{ StandingsTable: StandingsTable }>(
    `${BASE_URL}/f1/${year}/driverstandings`
  );
  const responseData = response.MRData.StandingsTable.StandingsLists[0];

  if ("DriverStandings" in responseData) {
    const processedResponse = convertDriverStandings(responseData);
    return processedResponse;
  } else {
    return undefined;
  }
};

export const getSeasonSchedule = async (
  year: string
): Promise<RaceScheduleType[]> => {
  const response = await makeErgastRequest<{ RaceTable: RaceScheduleTable }>(
    `${BASE_URL}/f1/${year}/races`
  );
  const responseData = response.MRData.RaceTable.Races;

  const processedResponse = convertSeasonSchedule(responseData);

  return processedResponse;
};

export const getRaceResult = async (
  year: string,
  round: number
): Promise<RaceResultType | undefined> => {
  const limit = 30;
  const offset = round === 1 ? 0 : 20 * (round - 1) - 5;
  const response = await makeErgastRequest<{ RaceTable: RaceResultTable }>(
    `${BASE_URL}/f1/${year}/results`,
    limit,
    offset
  );
  const responseData = response.MRData.RaceTable.Races;

  const raceResult = responseData.find(
    (item) => parseInt(item.round) === round
  );

  if (!raceResult) {
    return undefined;
  }

  const processedRaceResult = convertRaceResult(raceResult);

  return processedRaceResult;
};

export const getQualifyingResult = async (
  year: string,
  round: number
): Promise<QualifyingResultType | undefined> => {
  const limit = 30;
  const offset = round === 1 ? 0 : 20 * (round - 1) - 5;
  const response = await makeErgastRequest<{
    RaceTable: QualifyingResultTable;
  }>(`${BASE_URL}/f1/${year}/qualifying`, limit, offset);
  const responseData = response.MRData.RaceTable.Races;

  const qualifyingResult = responseData.find(
    (item) => parseInt(item.round) === round
  );

  if (!qualifyingResult) {
    return undefined;
  }

  const processedQualifyingResult = convertQualifyingResult(qualifyingResult);

  return processedQualifyingResult;
};

export const getSprintResult = async (
  year: string,
  round: number,
  sprintRounds: number[]
): Promise<RaceResultType | undefined> => {
  const sprintRoundNum = sprintRounds.indexOf(round) - 1;
  const limit = 30;
  const offset = round === 1 ? 0 : 20 * (sprintRoundNum - 1) - 5;
  const response = await makeErgastRequest<{
    RaceTable: SprintResultTable;
  }>(`${BASE_URL}/f1/${year}/sprint`, limit, offset);
  const responseData = response.MRData.RaceTable.Races;

  const sprintResult = responseData.find(
    (item) => parseInt(item.round) === round
  );

  // fix: need to fix the limit and offset parts of the request
  console.log(sprintResult);
  if (!sprintResult) {
    return undefined;
  }
  const processedSprintResult = convertSprintResult(sprintResult);

  return processedSprintResult;
};

export const getSprintRounds = async (
  year: string
): Promise<number[] | undefined> => {
  const seasonSchedule = await getSeasonSchedule(year);
  if (!seasonSchedule) {
    return undefined;
  }
  const sprintRounds = seasonSchedule.filter((item) => isSprintRound(item));
  const sprintRoundNums: number[] = sprintRounds.map((item) => item.round);
  return sprintRoundNums;
};
