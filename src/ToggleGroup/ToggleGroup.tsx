import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, cyan } from "@mui/material/colors";
import { useFilterContext, type FilterType } from "../Context/FilterContext";

interface ToggleInterface {
  label: string;
  value: string;
}

interface ToggleGroupInterface {
  options: ToggleInterface[];
}

const toggleGroupTheme = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: ".3rem",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.MuiToggleButton-root": {
            border: "1px solid black",
            color: "black",
            borderColor: grey[700],
            backgroundColor: grey[200],
            borderRadius: "3px",
            padding: ".3rem 1.2rem",
          },
          "&.Mui-selected": {
            borderWidth: "2px",
            borderStyle: "outset",
            borderColor: grey[800],
            backgroundColor: cyan[100],
            borderRadius: 0,
            color: "black",
          },
        },
      },
    },
  },
});

export default function ToggleGroup({ options }: ToggleGroupInterface) {
  if (options.length === 0) {
    console.error("No options provided to ToggleGroup");
    return null;
  }
  const { setFilter } = useFilterContext();

  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);
  useEffect(() => {
    setFilter((prev: FilterType) => ({
      ...prev,
      chart: selectedValue,
    }));
  }, [selectedValue, setFilter]);
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue === null) return;
    setSelectedValue(newValue);
  };

  return (
    <ThemeProvider theme={toggleGroupTheme}>
      <ToggleButtonGroup
        value={selectedValue}
        exclusive
        onChange={handleChange}
        color="primary"
        size="small"
      >
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
