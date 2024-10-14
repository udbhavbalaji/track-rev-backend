import { ErgastResponse, Table } from "@app-types/ergastResponse/primitive";
import { StandingsTable } from "@app-types/ergastResponse/standings";
import {
  ConstructorStandingsResponse,
  DriverStandingsResponse,
} from "@app-types/trackRevRequest/standings";
import {
  convertConstructorStandings,
  convertDriverStandings,
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
