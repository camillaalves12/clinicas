import { Router } from "express";

import UserController from "./controller/UserController";
import ClinicController from "./controller/ClinicController";
import ConsultController from "./controller/ConsultController";
import AuthController from "./controller/AuthController";
import { AuthMiddleware } from "./middlewares/auth";
import ProfessionalController from "./controller/ProfessionalController";
import PatientController from "./controller/PatientController";
import ProcedimentTypeController from "./controller/ProcedimentTypeController";
import ProcedimentController from "./controller/ProcedimentController";
import SchedulingController from "./controller/SchedulingController";
import DashboardController from "./controller/DashboardController";

const router = Router();

router.route("/user").get(AuthMiddleware, UserController.findAllUsers);

router
  .route("/user/:id")
  .post(AuthMiddleware, UserController.createUser)
  .get(AuthMiddleware, UserController.findUser)
  .put(AuthMiddleware, UserController.updateUser)
  .delete(AuthMiddleware, UserController.deleteUser);

router.route("/auth").post(AuthController.authenticate);

router.route("/refresh-token").post(AuthController.refreshToken);

router
  .route("/clinic")
  .post(AuthMiddleware, ClinicController.createClinic)
  .get(AuthMiddleware, ClinicController.findAllClinics);

router
  .route("/clinic/:id")
  .get(AuthMiddleware, ClinicController.findClinic)
  .put(AuthMiddleware, ClinicController.updateClinic)
  .delete(AuthMiddleware, ClinicController.deleteClinic);

router
  .route("/clinicReport/:id")
  .post(AuthMiddleware, ClinicController.reportClinic);

router
  .route("/clinicForName")
  .post(AuthMiddleware, ClinicController.ClinicForName);

router
  .route("/professional")
  .get(AuthMiddleware, ProfessionalController.findAllProfessionals);

router
  .route("/professional/:id")
  .post(AuthMiddleware, ProfessionalController.createProfessional)
  .get(AuthMiddleware, ProfessionalController.findProfessional)
  .put(AuthMiddleware, ProfessionalController.updateProfessional)
  .delete(AuthMiddleware, ProfessionalController.deleteProfessional);

router
  .route("/professionalReport/:id")
  .post(AuthMiddleware, ProfessionalController.reportProfessional);

router
  .route("/professionalForName")
  .post(AuthMiddleware, ProfessionalController.findProfessionalForName);

router
  .route("/patients")
  .get(AuthMiddleware, PatientController.findAllPatients);

router
  .route("/patient/:id")
  .post(AuthMiddleware, PatientController.createPatient)
  .get(AuthMiddleware, PatientController.findPatient)
  .put(AuthMiddleware, PatientController.updatePatient)
  .delete(AuthMiddleware, PatientController.deletePatient);

router
  .route("/patientForName")
  .post(AuthMiddleware, PatientController.findPatientForName);

router
  .route("/patientForDateOfBirth")
  .post(AuthMiddleware, PatientController.findPatientForDateOfBirth);

router
  .route("/patientForCPF")
  .post(AuthMiddleware, PatientController.findPatientForCPF);

router
  .route("/procediments")
  .get(AuthMiddleware, ProcedimentController.findAllProcediments);

router
  .route("/procediment/:id")
  .post(AuthMiddleware, ProcedimentController.createProcediment)
  .get(AuthMiddleware, ProcedimentController.findProcediment)
  .put(AuthMiddleware, ProcedimentController.updateProcediment)
  .delete(AuthMiddleware, ProcedimentController.deleteProcediment);

router
  .route("/procedimentsForName")
  .post(AuthMiddleware, ProcedimentController.findProcedimentsForName);

router
  .route("/procedimentsForType/:id")
  .get(AuthMiddleware, ProcedimentController.findProcedimentsForType);

router
  .route("/procedimentTypes")
  .get(AuthMiddleware, ProcedimentTypeController.findAllProcedimentTypes);

router
  .route("/procedimentType/:id")
  .post(AuthMiddleware, ProcedimentTypeController.createProcedimentType)
  .get(AuthMiddleware, ProcedimentTypeController.findProcedimentType)
  .put(AuthMiddleware, ProcedimentTypeController.updateProcedimentType)
  .delete(AuthMiddleware, ProcedimentTypeController.deleteProcedimentType);

router
  .route("/procedimentTypesForName/:id")
  .post(AuthMiddleware, ProcedimentTypeController.findProcedimentTypesForName);

router
  .route("/consults")
  .get(AuthMiddleware, ConsultController.findAllConsults);

router
  .route("/consult/:id")
  .post(AuthMiddleware, ConsultController.createConsult)
  .put(AuthMiddleware, ConsultController.updateConsult)
  .delete(AuthMiddleware, ConsultController.deleteConsult);

router
  .route("/consultForPeriod/:id")
  .post(AuthMiddleware, ConsultController.findConsultForPeriod);

router
  .route("/consultsForPatient/:pacienteId")
  .get(AuthMiddleware, ConsultController.findConsultForPatient);

router
  .route("/consultForProfessional")
  .get(AuthMiddleware, ConsultController.findConsultForProfessional);

router
  .route("/consultForProcediment")
  .get(AuthMiddleware, ConsultController.findConsultForProcediment);

router
  .route("/schedulings")
  .get(AuthMiddleware, SchedulingController.findAllSchedulings);

router
  .route("/scheduling/:id")
  .post(AuthMiddleware, SchedulingController.createScheduling)
  .put(AuthMiddleware, SchedulingController.updateScheduling)
  .delete(AuthMiddleware, SchedulingController.deleteScheduling);

router
  .route("/upcomingSchedulings")
  .get(AuthMiddleware, SchedulingController.upcomingSchedulings);

router
  .route("/schedulingsForDate")
  .get(AuthMiddleware, SchedulingController.findSchedulingsForDate);

router
  .route("/schedulingsForPatient")
  .get(AuthMiddleware, SchedulingController.findSchedulingsForPatient);

router
  .route("/schedulingsForProfessional")
  .get(AuthMiddleware, SchedulingController.findSchedulingsForProfessional);

router
  .route("/schedulingsForProcediment")
  .get(AuthMiddleware, SchedulingController.findSchedulingsForProcediment);

router
  .route("/confirmScheduling/:id")
  .put(AuthMiddleware, SchedulingController.confirmScheduling);

router
  .route("/dailyData/:id")
  .put(AuthMiddleware, DashboardController.dailyData);

router
  .route("/monthlyData/:id")
  .put(AuthMiddleware, DashboardController.monthlyData);

router
  .route("/monthlyDataforDay/:id")
  .put(AuthMiddleware, DashboardController.monthlyDataforDay);

router
  .route("/dataForPeriod/:id")
  .put(AuthMiddleware, DashboardController.dataForPeriod);

export { router };
