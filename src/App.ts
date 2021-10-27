import { Rates } from "./api/types";
import fetchExchanges from "./api/exchange";
import { parseDate } from "./utils";

const DEFAULT_CURRENCIES = "EUR,USD,GBP,JPY";
let rates: Rates | null = null;
let currencyFrom: string = "EUR";
let currencyTo: string = "USD";
let total: number = 1;
let dateSelected = new Date();

function controller() {
  calculateRates().then(() => {
    console.info("Rates converted");
  });
}

async function getRates(selectedDate: Date) {
  const data = await fetchExchanges(
    parseDate(selectedDate),
    DEFAULT_CURRENCIES
  );
  rates = data.rates;
}

function converRates(currencyFrom: string, currencyTo: string): number {
  if (!rates) {
    return 0;
  }
  const base = rates["EUR"];
  const from = rates[currencyFrom];
  const to = rates[currencyTo];

  return ((base * to) / from) * total;
}

function setConversion(conversion: number) {
  const text = document.getElementById("conversion");
  if (text) {
    text.innerHTML = conversion.toString();
  }
}

async function calculateRates() {
  try {
    await getRates(dateSelected);
    const calculatedRate = converRates(currencyFrom, currencyTo);
    setConversion(calculatedRate);
  } catch (error) {
  
    console.error(error);
  }
}

function registerListeners() {
  const currFrom = document.getElementById("currFrom") as HTMLSelectElement;
  const currTo = document.getElementById("currTo") as HTMLSelectElement;
  const amount = document.getElementById("amount") as HTMLInputElement;
  const date = document.getElementById("date") as HTMLInputElement;

  currFrom?.addEventListener("change", () => {
    currencyFrom = currFrom.value;
    controller();
  });

  currTo?.addEventListener("change", () => {
    currencyTo = currTo.value;
    controller();
  });

  amount?.addEventListener("change", () => {
    total = +amount.value;
    controller();
  });

  date?.addEventListener("change", () => {
    console.log(date.value);
    dateSelected = new Date(date.value);
    controller();
  });
}

const startApp = () => {
  console.info("App initilized");
  registerListeners();
};

startApp();
