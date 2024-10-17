import { Router } from 'express'

import UserController from './controller/UserController'
import ClinicController from './controller/ClinicController'
// import DoctorController from './controller/DoctorController'
import ConsultController from './controller/ConsultController'
import AuthController from './controller/AuthController'
import { AuthMiddleware } from './middlewares/auth'
import ProfessionalController from './controller/ProfessionalController'
import PatientController from './controller/PatientController'
import ProcedimentTypeController from './controller/ProcedimentTypeController'
import ProcedimentController from './controller/ProcedimentController'
import SchedulingController from './controller/SchedulingController'
import DashboardController from './controller/DashboardController'
// import 

const router = Router()

router.route('/user')
  .get(AuthMiddleware, UserController.findAllUsers); //ok

router.route('/user/:id')
  .post(AuthMiddleware, UserController.createUser) // ok
  .get(AuthMiddleware, UserController.findUser) //ok
  .put(AuthMiddleware, UserController.updateUser) //ok
  .delete(AuthMiddleware, UserController.deleteUser); //ok

  router.route('/auth')
  .post(AuthController.authenticate)

  router.route('/refresh-token')
  .post(AuthController.refreshToken)
  

router.route('/clinic')
  .post(AuthMiddleware, ClinicController.createClinic) // ok
  .get(AuthMiddleware, ClinicController.findAllClinics); //ok

router.route('/clinic/:id')
  .get(AuthMiddleware, ClinicController.findClinic) //ok
  .put(AuthMiddleware, ClinicController.updateClinic) //ok
  .delete(AuthMiddleware, ClinicController.deleteClinic); //ok

router.route('/clinicReport/:id')
  .post(AuthMiddleware, ClinicController.reportClinic)

router.route('/clinicForName')
  .post(AuthMiddleware, ClinicController.ClinicForName)

router.route('/professional')
  .get(AuthMiddleware, ProfessionalController.findAllProfessionals); //ok

router.route('/professional/:id')
  .post(AuthMiddleware, ProfessionalController.createProfessional) //ok
  .get(AuthMiddleware, ProfessionalController.findProfessional) //ok
  .put(AuthMiddleware, ProfessionalController.updateProfessional) //ok
  .delete(AuthMiddleware, ProfessionalController.deleteProfessional) //ok

  router.route('/professionalReport/:id')
    .post(AuthMiddleware, ProfessionalController.reportProfessional)

router.route('/professionalForName')
  .post(AuthMiddleware, ProfessionalController.findProfessionalForName) //ok

router.route('/patients')
  .get(AuthMiddleware, PatientController.findAllPatients) //ok

router.route('/patient/:id')
  .post(AuthMiddleware, PatientController.createPatient) //ok
  .get(AuthMiddleware, PatientController.findPatient) //ok
  .put(AuthMiddleware, PatientController.updatePatient) //ok
  .delete(AuthMiddleware, PatientController.deletePatient) //ok

router.route('/patientForName')
  .post(AuthMiddleware, PatientController.findPatientForName) //ok 

router.route('/patientForDateOfBirth')
  .post(AuthMiddleware, PatientController.findPatientForDateOfBirth) // ok

router.route('/patientForCPF')
  .post(AuthMiddleware, PatientController.findPatientForCPF) //ok

router.route('/procediments')
  .get(AuthMiddleware, ProcedimentController.findAllProcediments) //ok

router.route('/procediment/:id')
  .post(AuthMiddleware, ProcedimentController.createProcediment) //ok
  .get(AuthMiddleware, ProcedimentController.findProcediment) //ok
  .put(AuthMiddleware, ProcedimentController.updateProcediment) //ok
  .delete(AuthMiddleware, ProcedimentController.deleteProcediment) //ok

router.route('/procedimentsForName')
  .post(AuthMiddleware, ProcedimentController.findProcedimentsForName) //ok

router.route('/procedimentsForType/:id')
  .get(AuthMiddleware, ProcedimentController.findProcedimentsForType) //ok

router.route('/procedimentTypes')
  .get(AuthMiddleware, ProcedimentTypeController.findAllProcedimentTypes) //ok

router.route('/procedimentType/:id')
  .post(AuthMiddleware, ProcedimentTypeController.createProcedimentType) //ok
  .get(AuthMiddleware, ProcedimentTypeController.findProcedimentType) //ok
  .put(AuthMiddleware, ProcedimentTypeController.updateProcedimentType) //ok
  .delete(AuthMiddleware, ProcedimentTypeController.deleteProcedimentType) //ok

router.route('/procedimentTypesForName/:id')
  .post(AuthMiddleware, ProcedimentTypeController.findProcedimentTypesForName) //ok

router.route('/consults')
  .get(AuthMiddleware, ConsultController.findAllConsults) //ok

router.route('/consult/:id')
  .post(AuthMiddleware, ConsultController.createConsult) //ok
  .put(AuthMiddleware, ConsultController.updateConsult) //ok
  .delete(AuthMiddleware, ConsultController.deleteConsult) //ok

router.route('/consultForPeriod/:id')
  .get(AuthMiddleware, ConsultController.findConsultForPeriod) //ok

router.route('/consultsForPatient/:pacienteId')
  .get(AuthMiddleware, ConsultController.findConsultForPatient) //ok

router.route('/consultForProfessional')
  .get(AuthMiddleware, ConsultController.findConsultForProfessional) //ok

router.route('/consultForProcediment')
  .get(AuthMiddleware, ConsultController.findConsultForProcediment) //ok

router.route('/schedulings')
.get(AuthMiddleware, SchedulingController.findAllSchedulings) // ok


router.route('/scheduling/:id')
  .post(AuthMiddleware, SchedulingController.createScheduling) //ok
  .put(AuthMiddleware, SchedulingController.updateScheduling) //ok
  .delete(AuthMiddleware, SchedulingController.deleteScheduling) //ok

router.route('/upcomingSchedulings')
  .get(AuthMiddleware, SchedulingController.upcomingSchedulings) // ok. mas oq faz?

router.route('/schedulingsForDate')
  .get(AuthMiddleware, SchedulingController.findSchedulingsForDate) // ok. mas oq faz?    // ESTAVA PUT 

router.route('/schedulingsForPatient')
  .get(AuthMiddleware, SchedulingController.findSchedulingsForPatient) //ok

router.route('/schedulingsForProfessional')
  .get(AuthMiddleware, SchedulingController.findSchedulingsForProfessional) //ok

router.route('/schedulingsForProcediment')
  .get(AuthMiddleware, SchedulingController.findSchedulingsForProcediment) //ok

router.route('/confirmScheduling/:id')
  .put(AuthMiddleware, SchedulingController.confirmScheduling) //ok

router.route('/dailyData/:id')
  .put(AuthMiddleware, DashboardController.dailyData) //ok

router.route('/monthlyData/:id')
  .put(AuthMiddleware, DashboardController.monthlyData) // ok

router.route('/monthlyDataforDay/:id')
  .put(AuthMiddleware, DashboardController.monthlyDataforDay) //ok

router.route('/dataForPeriod/:id')
  .put(AuthMiddleware, DashboardController.dataForPeriod) // ok


export { router }
