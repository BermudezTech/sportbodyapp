import AdminDashboard from "./admin-dashboard";
import MedicalDashboard from "./medical-dashboard";
import MemberDashboard from "./member-dashboard";
import ReceptionistDashboard from "./recepcionist-dashboard";

function DashboardContent({ userRole }: { userRole: string }) {
    switch (userRole) {
        case "Member":
            return <MemberDashboard />;
        case "Receptionist":
            return <ReceptionistDashboard />;
        case "Medical Staff":
            return <MedicalDashboard />;
        case "Administrator":
            return <AdminDashboard />;
        default:
            return <MemberDashboard />;
    }
}

export default DashboardContent;
