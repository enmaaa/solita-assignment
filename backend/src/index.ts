import express, { query } from 'express';
import cors from 'cors';
import {
  getOrderCount,
  getVaccineCount,
  getUsedVaccineCount,
  getStatsForProducer,
  getExpiredBottlesCount,
  getExpiredVaccinesCount,
} from './calculations';

const app = express();
app.use(cors());

app.get('/api/stats', (req, res) => {
  const params = req.query as { date: string };
  const date = new Date(params.date);

  const orderCount = getOrderCount(date);
  const vaccineCount = getVaccineCount(date);
  const usedVaccineCount = getUsedVaccineCount(date);
  const statsForProducer = {
    Antiqua: getStatsForProducer(date, 'Antiqua'),
    SolarBuddhica: getStatsForProducer(date, 'SolarBuddhica'),
    Zerpfy: getStatsForProducer(date, 'Zerpfy'),
  };
  const expiredBottlesCount = getExpiredBottlesCount(date);
  const expiredVaccinesCount = getExpiredVaccinesCount(date);

  res.status(200).send({
    orderCount,
    vaccineCount,
    usedVaccineCount,
    statsForProducer,
    expiredBottlesCount,
    expiredVaccinesCount,
  });
});

const port = 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
