import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/exchange",
});

const REQUEST_COUNTER_KEY = "apiRequestCounter";

const getApiRequestCounter = () => {
  const counter = localStorage.getItem(REQUEST_COUNTER_KEY);
  return counter ? parseInt(counter, 10) : 0;
};

const updateApiRequestCounter = (counter) => {
  localStorage.setItem(REQUEST_COUNTER_KEY, counter.toString());
};

export const fetchCurrencyRates = async () => {
  try {
    const currentCounter = getApiRequestCounter() + 1;

    if (currentCounter % 5 === 0) {
      throw new Error("Simulated server error");
    }

    const response = await instance.get();
    updateApiRequestCounter(currentCounter);

    return response.data;
  } catch (error) {
    updateApiRequestCounter(0);

    throw error;
  }
};
