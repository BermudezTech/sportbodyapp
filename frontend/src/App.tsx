import { Routes, Route, Navigate } from "react-router";
import Layout from "@/components/layout/layout";
import DashboardContent from "@/components/dashboard-content";
// import MembershipPage from "@/pages/MembershipPage";
// import BillingPage from "@/pages/BillingPage";
// import WorkoutPage from "@/pages/WorkoutPage";
import LoginPage from "@/pages/login";
import { useEffect, useState } from "react";
import MembershipManagement from "./components/membership-management";
import BillingPayment from "./components/billing-payment";
import WorkoutInProgress from "./components/workout-in-progress";
import LockerManagement from "./components/locker-management";
import UserManagement from "./components/user-management";
import ChangePasswordPage from "./pages/changePassword";

function App() {
    let [user, setUser] = useState<{
        email: string;
        role: string;
        name: string;
    }>({
        email: "",
        role: "",
        name: "",
    });

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser({
                email: localStorage.getItem("user") || "",
                role: localStorage.getItem("role") || "",
                name: localStorage.getItem("name") || "",
            });
        }
    }, []);

    return (
        <Routes>
            {/* Login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />

            {/* Rutas con layout del dashboard */}
            <Route element={<Layout user={user} setUser={setUser} />}>
                <Route
                    path="/dashboard"
                    element={<DashboardContent userRole={user.role} />}
                />
                <Route
                    path="/membership-management"
                    element={<MembershipManagement />}
                />
                <Route path="/user-management" element={<UserManagement />} />
                <Route
                    path="/locker-management"
                    element={<LockerManagement />}
                />
                <Route path="/billing" element={<BillingPayment />} />
                <Route
                    path="/workout-progress"
                    element={<WorkoutInProgress />}
                />
                {/* 404 route */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Route>
        </Routes>
    );
}

export default App;
