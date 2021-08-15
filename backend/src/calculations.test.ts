import { expect, test, describe } from '@jest/globals';
import {
  getOrderCount,
  getVaccineCount,
  getUsedVaccineCount,
  getStatsForProducer,
  getExpiredBottlesCount,
  getExpiredVaccinesCount,
} from './calculations';

const validDate = new Date('2021-04-12T11:10:06.473587Z');
const ancientDate = new Date('1993-05-21T16:30:00Z');
const futuristicDate = new Date('2050-04-05T19:30:00Z');

describe('getOrderCount', () => {
  test('Total order amount is correct', () => {
    expect(getOrderCount(validDate)).toEqual(5000);
  });

  test('Ancient date returns zero', () => {
    expect(getOrderCount(ancientDate)).toEqual(0);
  });

  test('Futuristic date returns correct total', () => {
    expect(getOrderCount(futuristicDate)).toEqual(5000);
  });
});

describe('getVaccineCount', () => {
  test('Total amount is correct', () => {
    expect(getVaccineCount(validDate)).toEqual(25015);
  });

  test('Ancient date returns zero', () => {
    expect(getVaccineCount(ancientDate)).toEqual(0);
  });

  test('Futuristic date returns correct total', () => {
    expect(getVaccineCount(futuristicDate)).toEqual(25015);
  });
});

describe('getUsedVaccineCount', () => {
  test('Total amount is correct', () => {
    expect(getUsedVaccineCount(validDate)).toEqual(7000);
  });

  test('Ancient date returns zero', () => {
    expect(getUsedVaccineCount(ancientDate)).toEqual(0);
  });

  test('Futuristic date returns correct total', () => {
    expect(getUsedVaccineCount(futuristicDate)).toEqual(7000);
  });
});

describe('getStatsForProducer', () => {
  test('Total amount is correct', () => {
    expect(getStatsForProducer(validDate, 'Antiqua')).toEqual({
      orderAmount: 1661,
      producer: 'Antiqua',
      vaccinationAmount: 6644,
    });
  });

  test('Ancient date returns zero', () => {
    expect(getStatsForProducer(ancientDate, 'Antiqua')).toEqual({
      orderAmount: 0,
      producer: 'Antiqua',
      vaccinationAmount: 0,
    });
  });

  test('Futuristic date returns correct total', () => {
    expect(getStatsForProducer(futuristicDate, 'Antiqua')).toEqual({
      orderAmount: 1661,
      producer: 'Antiqua',
      vaccinationAmount: 6644,
    });
  });
});

describe('getExpiredBottlesCount', () => {
  test('Total amount is correct', () => {
    expect(getExpiredBottlesCount(validDate)).toEqual(46);
  });

  test('Ancient date returns zero', () => {
    expect(getExpiredBottlesCount(ancientDate)).toEqual(0);
  });

  test('Futuristic date returns correct total', () => {
    expect(getExpiredBottlesCount(futuristicDate)).toEqual(0);
  });
});

describe('getExpiredVaccinesCount', () => {
  test('Total amount is correct', () => {
    // This result differs from assignment example,
    // Looks like this is due to not accounting for
    // daylight savings occurring during this period.
    expect(getExpiredVaccinesCount(validDate)).toEqual(12599);
  });

  test('Ancient date returns zero', () => {
    expect(getExpiredVaccinesCount(ancientDate)).toEqual(0);
  });

  test('Futuristic date returns correct total', () => {
    expect(getExpiredVaccinesCount(futuristicDate)).toEqual(18015);
  });
});
