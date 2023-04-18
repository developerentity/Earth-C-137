import { getDataByUrl } from ".";
import {
  ICharactersResponse,
} from "../interfaces/characterInterface";
import { ILocationsResponse } from "../interfaces/locationInterface";

const baseUrl = "https://rickandmortyapi.com/api/";

export const fetchCharacters = async (
  params?: object
): Promise<ICharactersResponse> => getDataByUrl(`${baseUrl}character/`, params);

export const fetchLocations = async (
  params?: object
): Promise<ILocationsResponse> => getDataByUrl(`${baseUrl}location/`, params);
