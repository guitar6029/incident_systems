import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Incidents from "./incidents/pages/Incidents";
import { Toaster } from "sonner";
import ProviderWrapper from "./providers/ProviderWrapper";
import ProtectedRoute from "./guards/ProtectedRoute";
import GuestRoute from "./guards/GuestRoute";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/Landing";
import CreateIncident from "./incidents/pages/CreateIncident";

function App() {
  return (
    <>
      <ProviderWrapper>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout children={undefined} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route
                path="/incidents/incident-new"
                element={<CreateIncident />}
              />
            </Route>
          </Route>
        </Routes>
      </ProviderWrapper>
    </>
  );
}

export default App;
