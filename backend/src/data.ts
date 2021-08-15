import { readFileSync } from 'fs';

export type Vaccination = {
  id: string;
  gender: 'male' | 'female' | 'nonbinary';
  sourceBottle: string;
  vaccinationDate: Date;
};

export type Order = {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';
  vaccine: 'Zerpfy' | 'Antiqua' | 'SolarBuddhica';
  injections: number;
  arrived: Date;
};

const readSourceData = (path: string) => {
  try {
    const file = readFileSync(path, 'utf8');
    // Add brackets, commas and remove trailing comma
    const json = '[' + file.replace(/\n/g, ',').slice(0, -1) + ']';
    const data = JSON.parse(json);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getVaccinations = (): Vaccination[] => {
  const data = readSourceData('./data/vaccinations.source');
  return data.map((datum: any) => {
    return {
      id: datum['vaccination-id'],
      gender: datum.gender,
      sourceBottle: datum.sourceBottle,
      vaccinationDate: new Date(datum.vaccinationDate),
    };
  });
};

const getOrders = (): Order[] => {
  const data = [
    ...readSourceData('./data/Antiqua.source'),
    ...readSourceData('./data/SolarBuddhica.source'),
    ...readSourceData('./data/Zerpfy.source'),
  ];
  return data.map((datum: any) => {
    return {
      id: datum.id,
      orderNumber: datum.orderNumber,
      responsiblePerson: datum.responsiblePerson,
      healthCareDistrict: datum.healthCareDistrict,
      vaccine: datum.vaccine,
      injections: datum.injections,
      arrived: new Date(datum.arrived),
    };
  });
};

const vaccinations = getVaccinations();
const orders = getOrders();

export { vaccinations, orders };
