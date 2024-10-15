import { QualifyingResult } from "@app-types/ergastResponse/results/qualifying";
import { RaceResult } from "@app-types/ergastResponse/results/race";
import { SprintResult } from "@app-types/ergastResponse/results/sprint";
import { RaceSchedule } from "@app-types/ergastResponse/schedule";
import {
  ConstructorStandings,
  DriverStandings,
} from "@app-types/ergastResponse/standings";
import { SessionTimingType } from "@app-types/trackRevRequest/primitive";
import {
  QualifyingResultEntryType,
  QualifyingResultType,
} from "@app-types/trackRevRequest/results/qualifying";
import {
  RaceResultEntryType,
  RaceResultType,
} from "@app-types/trackRevRequest/results/race";
import { RaceScheduleType } from "@app-types/trackRevRequest/schedule";
import {
  ConstructorStandingsResponse,
  ConstructorStandingType,
  DriverStandingsResponse,
  DriverStandingType,
} from "@app-types/trackRevRequest/standings";

export const convertConstructorStandings = (
  data: ConstructorStandings
): ConstructorStandingsResponse => {
  const standingsData: ConstructorStandingType[] =
    data.ConstructorStandings.map((item) => {
      const obj: ConstructorStandingType = {
        position: parseInt(item.position),
        points: parseInt(item.points),
        wins: parseInt(item.wins),
        constructorId: item.Constructor.constructorId,
        constructorName: item.Constructor.name,
        constructorNationality: item.Constructor.nationality,
      };
      return obj;
    });
  const transformedObject: ConstructorStandingsResponse = {
    season: data.season,
    round: parseInt(data.round),
    Standings: standingsData,
  };

  return transformedObject;
};

export const convertDriverStandings = (
  data: DriverStandings
): DriverStandingsResponse => {
  const standingsData = data.DriverStandings.map((item) => {
    const obj: DriverStandingType = {
      position: parseInt(item.position),
      points: parseInt(item.points),
      wins: parseInt(item.wins),
      driverNumber: parseInt(item.Driver.permanentNumber),
      code: item.Driver.code,
      driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
      driverNationality: item.Driver.nationality,
      constructorId: item.Constructors[0].constructorId,
      constructorName: item.Constructors[0].name,
      constructorNationality: item.Constructors[0].nationality,
    };
    return obj;
  });

  const transformedObject: DriverStandingsResponse = {
    season: data.season,
    round: parseInt(data.round),
    Standings: standingsData,
  };

  return transformedObject;
};

export const convertSeasonSchedule = (
  data: RaceSchedule[]
): RaceScheduleType[] => {
  const scheduleData: RaceScheduleType[] = data.map((item) => {
    const raceSession: SessionTimingType = {
      date: item.date,
      time: item.time,
    };
    const obj: RaceScheduleType = {
      season: item.season,
      round: parseInt(item.round),
      raceName: item.raceName,
      circuitName: item.Circuit.circuitName,
      FirstPractice: item.FirstPractice,
      SecondPractice: item.SecondPractice,
      ThirdPractice: item.ThirdPractice,
      SprintQualifying: item.SprintQualifying,
      Sprint: item.Sprint,
      Qualifying: item.Qualifying,
      Race: raceSession,
    };
    return obj;
  });
  return scheduleData;
};

export const convertRaceResult = (data: RaceResult): RaceResultType => {
  const processedResultEntries = data.Results.map((item) => {
    const obj: RaceResultEntryType = {
      driverNumber: parseInt(item.Driver.permanentNumber),
      position: parseInt(item.position),
      driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
      driverCode: item.Driver.code,
      constructorId: item.Constructor.constructorId,
      constructorName: item.Constructor.name,
      grid: parseInt(item.grid),
      laps: parseInt(item.laps),
      status: item.status,
      FastestLap: {
        lap: parseInt(item.FastestLap?.lap),
        lapTime: item.FastestLap?.Time.time,
      },
    };
    return obj;
  });
  const processedResult: RaceResultType = {
    season: data.season,
    round: parseInt(data.round),
    raceName: data.raceName,
    circuitName: data.Circuit.circuitName,
    Results: processedResultEntries,
  };
  return processedResult;
};

export const convertQualifyingResult = (
  data: QualifyingResult
): QualifyingResultType => {
  const processedResultEntries = data.QualifyingResults.map((item) => {
    const obj: QualifyingResultEntryType = {
      driverNumber: parseInt(item.Driver.permanentNumber),
      position: parseInt(item.position),
      driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
      driverCode: item.Driver.code,
      constructorId: item.Constructor.constructorId,
      constructorName: item.Constructor.name,
      Q1: item.Q1,
      Q2: item.Q2,
      Q3: item.Q3,
    };
    return obj;
  });
  const processedResult: QualifyingResultType = {
    season: data.season,
    round: parseInt(data.round),
    raceName: data.raceName,
    circuitName: data.Circuit.circuitName,
    Results: processedResultEntries,
  };
  return processedResult;
};

export const convertSprintResult = (data: SprintResult): RaceResultType => {
  const processedResultEntries = data.SprintResults.map((item) => {
    const obj: RaceResultEntryType = {
      driverNumber: parseInt(item.Driver.permanentNumber),
      position: parseInt(item.position),
      driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
      driverCode: item.Driver.code,
      constructorId: item.Constructor.constructorId,
      constructorName: item.Constructor.name,
      grid: parseInt(item.grid),
      laps: parseInt(item.laps),
      status: item.status,
      FastestLap: {
        lap: parseInt(item.FastestLap?.lap),
        lapTime: item.FastestLap?.Time.time,
      },
    };
    return obj;
  });
  const processedResult: RaceResultType = {
    season: data.season,
    round: parseInt(data.round),
    raceName: data.raceName,
    circuitName: data.Circuit.circuitName,
    Results: processedResultEntries,
  };
  return processedResult;
};
