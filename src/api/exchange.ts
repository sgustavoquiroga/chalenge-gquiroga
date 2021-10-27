import { ExchangeResponse } from "./types";

const API_URL = "http://api.exchangeratesapi.io/v1/";
//Esto debería ir en otro lugar (ej .ENV)
const API_KEY = "963206eedc959531ca80e753d650404b";

async function fetchExchanges(date: String, currencies: string) {
  const urlSearchParams = new URLSearchParams({
    access_key: API_KEY,
    symbols: currencies,
  });
  const response = await fetch(`${API_URL}${date}?${urlSearchParams}`);
  const data: ExchangeResponse = await response.json();
  return data;
}

export default fetchExchanges;
