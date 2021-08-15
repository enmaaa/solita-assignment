import React, { useState, useEffect } from 'react';
import './App.css';
import { StatsCard } from './components/StatsCard';
import { fetchData } from './data';
import { SelectDate } from './components/SelectDate';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B7D69',
    },
    secondary: {
      main: '#97B094',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      color: '#BFA1A9',
      textShadow: '4px 4px 0px #A36871',
      fontWeight: 500,
    },
  },
});

const App = () => {
  const [data, setData] = useState({});

  const [selectedDate, setSelectedDate] = useState(
    new Date('2021-04-12T11:10:06.473587Z')
  );

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData(selectedDate);
      setData(fetchedData);
    })();
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header"></header>
          <Typography variant="h1">Vaccine stats</Typography>
          <SelectDate
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          ></SelectDate>
          <StatsCard data={data}></StatsCard>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
