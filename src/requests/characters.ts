import { getDataByUrl } from ".";
import { IResponse } from "../interfaces/characterInterface";

const baseUrl = "https://rickandmortyapi.com/api/";

export const fetchCharacters = async (params?: object): Promise<IResponse> =>
  getDataByUrl(`${baseUrl}character/`, params);
