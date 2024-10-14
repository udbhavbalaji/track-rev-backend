import {
  ConstructorStandings,
  DriverStandings,
} from "@app-types/ergastResponseTypes";
import {
  ConstructorStandingsResponse,
  ConstructorStandingType,
  DriverStandingsResponse,
  DriverStandingType,
} from "@app-types/trackRevRequestTypes";

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
      // standingsData.push(obj);
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
