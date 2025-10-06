import { Routes, Route, Navigate } from "react-router";
import Layout from "@/components/layout/layout";
// import DashboardPage from "@/pages/DashboardPage";
// import MembershipPage from "@/pages/MembershipPage";
// import BillingPage from "@/pages/BillingPage";
// import WorkoutPage from "@/pages/WorkoutPage";
import LoginPage from "@/pages/login";

function App() {
    return (
        <Routes>
            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas con layout del dashboard */}
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
                {/* <Route path="/membership" element={<MembershipPage />} /> */}
                {/* <Route path="/billing" element={<BillingPage />} /> */}
                {/* <Route path="/workouts" element={<WorkoutPage />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
