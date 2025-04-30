import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFilterContext } from "../Context/FilterContext";
import TableGameIcon from "../TableGameIcon/TableGameIcon";
import "./Table.css";

interface IRowProps {
  id: number;
  icon: string;
  appName: string;
  downloads: number;
  revenue: number;
  rdp: number;
}

export default function Table() {
  const { filteredData: data, loading } = useFilterContext();

  if (loading) return <div>Loading...</div>;
  if (!data.length) return <div>No data</div>;

  const columns: GridColDef<IRowProps>[] = [
    {
      field: "appName",
      headerName: "App Name",
      width: 220,
      headerClassName: "grid-header",
      renderCell: (params) => {
        return (
          <TableGameIcon icon={params.row.icon} alt={params.row.appName}>
            {params.row.appName}
          </TableGameIcon>
        );
      },
    },
    {
      field: "downloads",
      headerName: "Downloads",
      width: 150,
      headerClassName: "grid-header",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en-US", {
          trailingZeroDisplay: "stripIfInteger",
        }).format(params);
      },
    },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 150,
      headerClassName: "grid-header",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(params / 100);
      },
    },
    {
      field: "rdp",
      headerName: "RDP",
      width: 150,
      headerClassName: "grid-header",
      valueFormatter: (params) => {
        if (!params) return "-";
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Math.round(params) / 100);
      },
    },
  ];

  const rows = data.map((appData) => {
    const downloads = appData.data.reduce((acc, dataRaw) => {
      return acc + dataRaw[1];
    }, 0);
    const revenue = appData.data.reduce((acc, dataRaw) => {
      return acc + dataRaw[2];
    }, 0);
    const rdp = downloads && revenue ? revenue / downloads : 0;
    const row: IRowProps = {
      id: appData.id,
      icon: appData.icon,
      appName: appData.name,
      downloads,
      revenue,
      rdp,
    };
    return row;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
