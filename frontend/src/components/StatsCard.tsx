import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DataResponse } from '../data';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    backgroundColor: '#E5F0E4',
    paddingLeft: '0.5em',
    margin: '2em 0em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    color: '#A36871',
  },
  title: {
    color: '#BFA1A9',
    fontSize: 30,
    marginBottom: '0.5em',
    fontWeight: 500,
    textShadow: '1px 1px 0px #A36871',
  },
  pos: {
    fontSize: 18,
    margin: 8,
    color: '#444F42',
    fontWeight: 300,
  },
});

const StatsCard = ({ data }: { data: DataResponse }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>
          Stats for chosen time:
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.orderCount} orders and {data.vaccineCount} vaccines arrived.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.usedVaccineCount} vaccinations were done.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.statsForProducer?.Antiqua.orderAmount} vaccinations were ordered
          from Antiqua.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.statsForProducer?.SolarBuddhica.orderAmount} vaccinations were
          ordered from SolarBuddhica.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.statsForProducer?.Zerpfy.orderAmount} vaccinations were ordered
          from Zerpfy.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.expiredBottlesCount} bottles expired.
        </Typography>
        <Typography className={classes.pos}>
          {bull}
          {data.expiredVaccinesCount} unused vaccines expired.
        </Typography>
      </CardContent>
    </Card>
  );
};

export { StatsCard };
