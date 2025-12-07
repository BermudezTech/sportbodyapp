import AdminDashboard from "./admin-dashboard";
import MedicalDashboard from "./medical-dashboard";
import MemberDashboard from "./member-dashboard";
import ReceptionistDashboard from "./recepcionist-dashboard";

function DashboardContent({ userRole }: { userRole: string }) {
    switch (userRole) {
        case "afiliado":
            return <MemberDashboard />;
        case "recepcionista":
            return <ReceptionistDashboard />;
        case "medico":
            return <MedicalDashboard />;
        case "administrador":
            return <AdminDashboard />;
        default:
            return <MemberDashboard />;
    }
}

export default DashboardContent;
