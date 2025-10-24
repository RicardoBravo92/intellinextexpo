import { CharactersResponse } from "@/types";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharactersByPage = async (
  page: number = 1,
  search?: string,
): Promise<CharactersResponse> => {
  let url = `${BASE_URL}/character?page=${page}`;

  if (search) {
    url += `&name=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  return response.json();
};

export const getCharacterById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }

  return response.json();
};
