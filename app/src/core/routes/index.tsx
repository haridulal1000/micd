import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import CodeVerification from '../../pages/auth/code-verification';
import ForgetPassword from '../../pages/auth/forget-password';
import ChangePassword from '../../pages/auth/change-password';
import Login from '../../pages/auth/login';
import SignUp from '../../pages/auth/register';
import CreateWorkspace from '../../pages/workspace/create';
import Dashboard from '../../pages/dashboard';
import ListPatients from '../../pages/patient/list-patients';
import UpdateUserProfile from '../../pages/profile/update';
import WorkspaceDashboard from '../../pages/workspace/workspaceDashboard';
// import SevenD from '../../pages/7d';
import Discuss7D from '../../pages/7d/discuss';
import Document7D from '../../pages/7d/document';
import Detect7D from '../../pages/7d/detect';
import Design7D from '../../pages/7d/design';
import Display7D from '../../pages/7d/display';
import Decide7D from '../../pages/7d/decide';
import Deliver7D from '../../pages/7d/deliver';
import HFSummary from '../../pages/patient/health-forms/HFSummary';
import HFLifestyle from '../../pages/patient/health-forms/HFLifestyle';
import HFMedicalHistory from '../../pages/patient/health-forms/HFMedicalHistory';
import HFDentalHistory from '../../pages/patient/health-forms/HFDentalHistory';
import HFProblemBox from '../../pages/patient/health-forms/HFProblemBox';
import HFCaseLibrary from '../../pages/patient/health-forms/HFCaseLibrary';
import PatientProfile from '../../pages/patient/profile';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import AppointmentsTodayPage from '../../pages/appointments/appointments-today-page';
import MainLayout from '../../layouts/mainLayout';
import DashboardLayout from '../../layouts/dashboardLayout';
import WorkspaceLayout from '../../layouts/workspaceLayout';
import PatientLayout from '../../layouts/patientLayout';
import DLayout from '../../layouts/dLayout';
import HFGeneralExamination from '../../pages/patient/health-forms/HFGeneralExamination';
import DoctorCheckPage from '../../pages/doctor-check/DoctorCheckPage';
import YourDayPage from '../../pages/doctor-check/YourDayPage';
import ComplaintsPage from '../../pages/doctor-check/ComplaintsPage';
import MonthlyEvaluationPage from '../../pages/doctor-check/MonthlyEvaluationPage';
import MySkillSetPage from '../../pages/doctor-check/MySkillSetPage';
import WorkspaceSettings from '../../pages/workspace/setting';
import DailyEvaluationHistoryPage from '../../pages/doctor-check/DailyEvaluationHistoryPage';
import SharedCases from '../../pages/dashboard/shared-cases';

const NoMatch = () => (
	<div>
		<h2>Nothing to see here!</h2>
		<p>
			<Link to="/">Go to the home page</Link>
		</p>
	</div>
);

const CustomRouter = () => (
	<div className="min-h-screen bg-gray">
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<MainLayout />
					</PublicRoute>
				}
			>
				<Route path="/" element={<Navigate replace to={'/login'} />} />
				<Route path="/register" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route path="/change-password" element={<ChangePassword />} />
			</Route>

			<Route
				path=""
				element={
					<PrivateRoute>
						<MainLayout />
					</PrivateRoute>
				}
			>
				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
				</Route>
				<Route
					path="/dashboard/update-profile"
					element={<UpdateUserProfile />}
				/>
				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route
						path="/dashboard/shared-cases"
						element={<SharedCases />}
					/>
				</Route>
				<Route path="/verify-email" element={<CodeVerification />} />
				<Route path="/workspace/create" element={<CreateWorkspace />} />
				<Route
					path="/workspace/:workspaceSlug"
					element={<WorkspaceLayout />}
				>
					<Route index element={<WorkspaceDashboard />} />
					<Route
						path={'/workspace/:workspaceSlug/appointments'}
						element={<AppointmentsTodayPage />}
					/>
					<Route
						path={'/workspace/:workspaceSlug/doctor-check'}
						element={<DoctorCheckPage />}
					>
						<Route index element={<Navigate to={'your-day'} />} />
						<Route path="your-day" element={<YourDayPage />} />
						<Route path="complaints" element={<ComplaintsPage />} />
						<Route
							path="monthly-evaluation"
							element={<MonthlyEvaluationPage />}
						/>
						<Route
							path="my-skill-set"
							element={<MySkillSetPage />}
						/>
					</Route>

					<Route
						path={
							'/workspace/:workspaceSlug/doctor-check/daily-evaluation-history'
						}
						element={<DailyEvaluationHistoryPage />}
					/>
					<Route
						path="/workspace/:workspaceSlug/patients"
						element={<ListPatients />}
					/>
					<Route
						path="/workspace/:workspaceSlug/patients/:patientId"
						element={<PatientLayout />}
					>
						<Route index element={<Navigate to={'summary'} />} />
						<Route path="summary" element={<HFSummary />} />
						<Route path="lifestyle" element={<HFLifestyle />} />
						<Route
							path="dental-history"
							element={<HFDentalHistory />}
						/>
						<Route
							path="medical-history"
							element={<HFMedicalHistory />}
						/>
						<Route
							path="general-examination"
							element={<HFGeneralExamination />}
						/>
						<Route path="problem-box" element={<HFProblemBox />} />
						<Route
							path="case-library"
							element={<HFCaseLibrary />}
						/>
					</Route>
					<Route
						path="/workspace/:workspaceSlug/patients/case-libray/:caseId"
						element={<DLayout />}
					>
						<Route index element={<Navigate to={'7d/0'} />} />
						<Route path="7d/0" element={<Document7D />} />
						<Route path="7d/1" element={<Detect7D />} />
						<Route path="7d/2" element={<Discuss7D />} />
						<Route path="7d/3" element={<Design7D />} />
						<Route path="7d/4" element={<Display7D />} />
						<Route path="7d/5" element={<Decide7D />} />
						<Route path="7d/6" element={<Deliver7D />} />
					</Route>
					<Route
						path="/workspace/:workspaceSlug/settings"
						element={<WorkspaceSettings />}
					/>
				</Route>
				<Route path="/profile" element={<PatientProfile />} />
			</Route>
			<Route path="*" element={<NoMatch />} />
		</Routes>
	</div>
);

export default CustomRouter;
