import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";
import { MantineProvider } from "@mantine/core";
import { GithubAuthProvider } from "./context/GithubAuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#191a19",
    },
  },
});

root.render(
  <MantineProvider
    theme={{
      colorScheme: "dark",
      colors: {
        // override dark colors to change them for all components
        dark: [
          "#d5d7e0",
          "#acaebf",
          "#8c8fa3",
          "#666980",
          "#4d4f66",
          "#2e2e2e",
          "#2e2e2e",
          "#1c1c1c",
          "#1c1c1c",
          "#282928",
        ],
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <React.StrictMode>
      <GithubAuthProvider>
        <CssBaseline />
        <App />
      </GithubAuthProvider>
    </React.StrictMode>
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
