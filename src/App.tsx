import { Routes, Route, Navigate } from "react-router";
import Layout from "@/components/layout/layout";
import DashboardContent from "@/components/dashboard-content";
// import MembershipPage from "@/pages/MembershipPage";
// import BillingPage from "@/pages/BillingPage";
// import WorkoutPage from "@/pages/WorkoutPage";
import LoginPage from "@/pages/login";
import { useState } from "react";

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

    console.log(user);

    return (
        <Routes>
            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas con layout del dashboard */}
            <Route
                element={<Layout user={user} users={users} setUser={setUser} />}
            >
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <DashboardContent
                            userRole={user.role}
                            currentView="dashboard"
                            setCurrentView={() => {}}
                        />
                    }
                />
                {/* <Route path="/membership" element={<MembershipPage />} /> */}
                {/* <Route path="/billing" element={<BillingPage />} /> */}
                {/* <Route path="/workouts" element={<WorkoutPage />} /> */}
                {/* 404 route */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
        </Routes>
    );
}

export default App;
