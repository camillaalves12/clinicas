import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage/LoginPage";
import { InitialPage } from "../pages/InitialPage/InitialPage";
import { ProceduresSchedulingPage } from "../pages/ProceduresSchedulingPage/ProceduresSchedulingPage";
import { Reports } from "../pages/Reports/Reports";
import { CreateConsultPage } from "../pages/CreateConsultPage/CreateConsultPage";
import { CreateExamPage } from "../pages/CreateExamPage/CreateExamPage";
import { ProceduresPage } from "../pages/ProceduresPage/ProceduresPage";
import { RegisterPatientPage } from "../pages/RegisterPatientPage/RegisterPatientPage";
import { RegisterDoctorPage } from "../pages/RegisterDoctorPage/RegisterDoctorPage";
import { SearchPatientPage } from "../pages/SearchPatientPage/SearchPatientPage";
import { SchedulingConsultPage } from "../pages/SchedulingConsultPage/SchedulingConsultPage";
import { DetailsPage } from "../pages/DetailsPage/DetailsPage";
import { PrivateRoute } from "./privateRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />

        <Route exact path="/initial" element={<PrivateRoute />}>
          <Route exact path="/initial" element={<InitialPage />} />
        </Route>

        <Route exact path="/procedures_scheduling" element={<PrivateRoute />}>
          <Route
            exact
            path="/procedures_scheduling"
            element={<ProceduresSchedulingPage />}
          />
        </Route>

        <Route exact path="/create_consult" element={<PrivateRoute />}>
          <Route exact path="/create_consult" element={<CreateConsultPage />} />
        </Route>

        <Route exact path="/reports" element={<PrivateRoute />}>
          <Route exact path="/reports" element={<Reports />} />
        </Route>

        <Route exact path="/create_exam" element={<PrivateRoute />}>
          <Route exact path="/create_exam" element={<CreateExamPage />} />
        </Route>

        <Route exact path="/procedures" element={<PrivateRoute />}>
          <Route exact path="/procedures" element={<ProceduresPage />} />
        </Route>

        <Route exact path="/register_patient" element={<PrivateRoute />}>
          <Route
            exact
            path="/register_patient"
            element={<RegisterPatientPage />}
          />
        </Route>

        <Route exact path="/register_doctor" element={<PrivateRoute />}>
          <Route
            exact
            path="/register_doctor"
            element={<RegisterDoctorPage />}
          />
        </Route>

        <Route exact path="/search_patient" element={<PrivateRoute />}>
          <Route exact path="/search_patient" element={<SearchPatientPage />} />
        </Route>

        <Route exact path="/scheduling_consult" element={<PrivateRoute />}>
          <Route
            exact
            path="/scheduling_consult"
            element={<SchedulingConsultPage />}
          />
        </Route>

        <Route
          exact
          path="/search_patient/details/:id"
          element={<PrivateRoute />}
        >
          <Route
            exact
            path="/search_patient/details/:id"
            element={<DetailsPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
