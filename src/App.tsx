import Chart from "./Chart/Chart";
import Table from "./Table/Table";
import useData from "./useData";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Filter from "./Filter/Filter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

const App = () => {
  const data = useData();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <CssBaseline />
      <main className="container">
        <Filter />
        <Chart data={data} />
        <Table data={data} />
      </main>
    </LocalizationProvider>
  );
};

export default App;
