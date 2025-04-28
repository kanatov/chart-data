import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import { FilterProvider } from "./Context/FilterContext";
import Filter from "./Filter/Filter";
import Chart from "./Chart/Chart";
import Table from "./Table/Table";

const App = () => {
  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <FilterProvider>
          <main className="container">
            <Filter />
            <Chart />
            <Table />
          </main>
        </FilterProvider>
      </LocalizationProvider>
    </>
  );
};

export default App;
