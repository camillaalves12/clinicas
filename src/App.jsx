
import { LoginPage } from './pages/LoginPage/LoginPage';
import { InitialPage } from './pages/InitialPage/InitialPage';
import { CreateConsultPage } from './pages/CreateConsultPage/CreateConsultPage';
import { CreateExamPage } from './pages/CreateExamPage/CreateExamPage';
import { ProceduresPage } from './pages/ProceduresPage/ProceduresPage';
import { RegisterPatientPage } from './pages/RegisterPatientPage/RegisterPatientPage';
import { RegisterDoctorPage } from './pages/RegisterDoctorPage/RegisterDoctorPage';
import { SearchPatientPage } from './pages/SearchPatientPage/SearchPatientPage';
import { SchedulingConsultPage } from './pages/SchedulingConsultPage/SchedulingConsultPage';
import { DetailsPage } from './pages/DetailsPage/DetailsPage';

import './App.scss';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'


function App() {
  return (

    <Router>
      <Routes>
        <Route exact path='/' element={<LoginPage/>}/>
        <Route exact path='/initial' element={<InitialPage/>}/>
        <Route exact path='/create_consult' element={<CreateConsultPage/>}/>
        <Route exact path='/create_exam' element={<CreateExamPage/>}/>
        <Route exact path='/procedures' element={<ProceduresPage/>}/>
        <Route exact path='/register_patient' element={<RegisterPatientPage/>}/>
        <Route exact path='/register_doctor' element={<RegisterDoctorPage/>}/>
        <Route exact path='/search_patient' element={<SearchPatientPage/>}/>
        <Route exact path='/scheduling_consult' element={<SchedulingConsultPage/>}/>
        <Route exact path='/search_patient/details' element={<DetailsPage/>}/>
      </Routes>
    </Router>
    

  );
}

export default App;
