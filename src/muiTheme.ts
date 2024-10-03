import { createTheme } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#3d348b",
    },
    secondary: {
      main: "#3d348b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          color: "faf9f9",
          padding: "10px 20px",
          borderRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f0f0f0",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#ffffff",
          borderColor: "#3d348b",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
            borderColor: "#2a265f",
          },
          "&.Mui-focused": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            borderColor: "#1a1a4d",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#e0e0e0",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default muiTheme;
