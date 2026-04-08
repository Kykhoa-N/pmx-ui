import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { appTheme } from "./theme";
import { AppHeader } from "./components/AppHeader.jsx";
import Dashboard from "./containers/Dashboard";
import { AppFooter } from "./components/AppFooter.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <AppHeader />
        <Dashboard />
        <AppFooter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;