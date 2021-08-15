import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  picker: {
    margin: '3em 1em',
  },
});

const SelectDate = ({
  selectedDate,
  handleDateChange,
}: {
  selectedDate: Date;
  handleDateChange: any;
}) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        id="date-picker-dialog"
        label="Select a date"
        format="dd.MM.yyyy HH:mm"
        value={selectedDate}
        onChange={handleDateChange}
        minDate={new Date('2021-01-03T00:00:00Z')}
        maxDate={new Date('2021-05-12T00:00:00Z')}
        className={classes.picker}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export { SelectDate };
