export type DataResponse = {
  orderCount?: number;
  vaccineCount?: number;
  usedVaccineCount?: number;
  statsForProducer?: {
    Antiqua: {
      producer: string;
      orderAmount: number;
      vaccinationAmount: number;
    };
    SolarBuddhica: {
      producer: string;
      orderAmount: number;
      vaccinationAmount: number;
    };
    Zerpfy: {
      producer: string;
      orderAmount: number;
      vaccinationAmount: number;
    };
  };
  expiredBottlesCount?: number;
  expiredVaccinesCount?: number;
};

const fetchData = async (date: Date): Promise<DataResponse> => {
  try {
    const isoDate = date.toISOString();
    const url = `http://localhost:5000/api/stats?date=${isoDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export { fetchData };
