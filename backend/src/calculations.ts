import dayjs from 'dayjs';
import { vaccinations, orders, Order, Vaccination } from './data';

const filterOrdersByDate = (date: Date): Order[] =>
  orders.filter((order) => order.arrived <= date);

const getOrderCount = (date: Date): number => filterOrdersByDate(date).length;

const getVaccineCount = (date: Date): number => {
  const filteredOrders = filterOrdersByDate(date);
  return filteredOrders.reduce((prev, cur) => {
    return prev + cur.injections;
  }, 0);
};

const getUsedVaccineCount = (date: Date): number => {
  const relevantVaccinations = vaccinations.filter(
    (vaccination) => vaccination.vaccinationDate <= date
  );
  return relevantVaccinations.length;
};

const getStatsForProducer = (date: Date, producer: string): any => {
  const filteredOrders = filterOrdersByDate(date);
  const producerOrders = filteredOrders.filter(
    (order) => order.vaccine === producer
  );
  const vaccinationAmount = producerOrders.reduce((prev, cur) => {
    return prev + cur.injections;
  }, 0);
  const orderAmount = producerOrders.length;
  return {
    producer,
    orderAmount,
    vaccinationAmount,
  };
};

const getExpiredBottlesCount = (date: Date): number => {
  // Bottles expire 30 days after arrival
  const day = dayjs(date).subtract(30, 'day');
  const expiredOrders = orders.filter(
    (order) =>
      dayjs(order.arrived) >= dayjs(day).startOf('day') &&
      dayjs(order.arrived) <= dayjs(day).endOf('day')
  );
  return expiredOrders.length;
};

const getExpiredVaccinesCount = (date: Date): number => {
  // Bottles expire 30 days after arrival
  const day = dayjs(date).subtract(30, 'day').toDate();
  const filteredOrders = orders.filter((order) => order.arrived <= day);
  const expiredTotal = filteredOrders
    .map((order) => getRemainingVaccinationsInOrder(order))
    .reduce((a, b) => a + b, 0);
  return expiredTotal;
};

const getRemainingVaccinationsInOrder = (order: Order): number => {
  const injectionsDone = vaccinations.filter(
    (vaccination) => vaccination.sourceBottle === order.id
  ).length;
  const remaining = order.injections - injectionsDone;
  return remaining;
};

export {
  getOrderCount,
  getVaccineCount,
  getUsedVaccineCount,
  getStatsForProducer,
  getExpiredBottlesCount,
  getExpiredVaccinesCount,
  getRemainingVaccinationsInOrder,
};
