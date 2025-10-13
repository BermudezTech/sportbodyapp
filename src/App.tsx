import { Routes, Route, Navigate } from "react-router";
import Layout from "@/components/layout/layout";
import DashboardContent from "@/components/dashboard-content";
// import MembershipPage from "@/pages/MembershipPage";
// import BillingPage from "@/pages/BillingPage";
// import WorkoutPage from "@/pages/WorkoutPage";
import LoginPage from "@/pages/login";
import { useState } from "react";
import MembershipManagement from "./components/membership-management";
import BillingPayment from "./components/billing-payment";
import WorkoutInProgress from "./components/workout-in-progress";

const users = [
    {
        name: "John Doe",
        role: "Member",
        email: "member@sportbodygym.com",
    },
    {
        name: "Sarah Wilson",
        role: "Receptionist",
        email: "receptionist@sportbodygym.com",
    },
    {
        name: "Dr. Mike Johnson",
        role: "Medical Staff",
        email: "doctor@sportbodygym.com",
    },
    {
        name: "Alex Rodriguez",
        role: "Administrator",
        email: "admin@sportbodygym.com",
    },
];

function App() {
    let [user, setUser] = useState<{
        email: string;
        role: string;
        name: string;
    }>({
        email: "member@sportbodygym.com",
        role: "Member",
        name: "John Doe",
    });

    return (
        <Routes>
            {/* Login */}
            <Route
                path="/login"
                element={<LoginPage setUser={setUser} users={users} />}
            />

            {/* Rutas con layout del dashboard */}
            <Route
                element={<Layout user={user} users={users} setUser={setUser} />}
            >
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                    path="/dashboard"
                    element={<DashboardContent userRole={user.role} />}
                />
                <Route
                    path="/membership-management"
                    element={<MembershipManagement />}
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
