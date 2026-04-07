import ProfilePage from "./containers/ProfilePage";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";
import PricingAgentChat from "./components/PricingAgentChat";


function App() {
  return (
    <ThemeProvider theme={appTheme}>
    <ProfilePage />;
    </ThemeProvider>
  );
}

export default App;