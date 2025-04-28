import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFilterContext } from "../Context/FilterContext";

type RowProps = {
  id: number;
  appName: string;
  downloads: number;
};

export default function Table() {
  const { filteredData: data, loading } = useFilterContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>No data</div>;
  }

  const columns: GridColDef<RowProps>[] = [
    { field: "appName", headerName: "App Name", width: 150 },
    { field: "downloads", headerName: "Downloads", width: 150 },
  ];

  const rows = data.map((appData) => {
    const totalDownloads = 42;
    const row: RowProps = {
      id: appData.id,
      appName: appData.name,
      downloads: totalDownloads,
    };
    return row;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
