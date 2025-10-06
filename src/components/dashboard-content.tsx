import AdminDashboard from "./admin-dashboard";
import MedicalDashboard from "./medical-dashboard";
import MemberDashboard from "./member-dashboard";
import ReceptionistDashboard from "./recepcionist-dashboard";

function DashboardContent({
    userRole,
    currentView,
    setCurrentView,
}: {
    userRole: string;
    currentView: string;
    setCurrentView: (view: string) => void;
}) {
    switch (userRole) {
        case "Member":
            return <MemberDashboard setCurrentView={setCurrentView} />;
        case "Receptionist":
            return <ReceptionistDashboard setCurrentView={setCurrentView} />;
        case "Medical Staff":
            return <MedicalDashboard setCurrentView={setCurrentView} />;
        case "Administrator":
            return <AdminDashboard setCurrentView={setCurrentView} />;
        default:
            return <MemberDashboard setCurrentView={setCurrentView} />;
    }
}

export default DashboardContent;
