import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import {
    Home,
    Key,
    QrCode,
    User,
    Users,
    CreditCard,
    Dumbbell,
    FileText,
    BarChart3,
    Settings,
} from "lucide-react";

export default function Layout({
    user,
    users,
    setUser,
}: {
    user: any;
    users: any;
    setUser: any;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navigationItems, setNavigationItems] = useState<any>([]);

    const getNavigationItems = (role: string) => {
        const baseItems = [{ icon: Home, label: "Dashboard", id: "dashboard" }];

        switch (role) {
            case "Member":
                return [
                    ...baseItems,
                    { icon: User, label: "Mi perfil", id: "profile" },
                    { icon: QrCode, label: "Acceso QR", id: "qr-access" },
                    { icon: Key, label: "Mi locker", id: "locker" },
                    { icon: CreditCard, label: "Pagos", id: "payments" },
                    {
                        icon: Dumbbell,
                        label: "Mis entrenamientos",
                        id: "workouts",
                    },
                ];
            case "Receptionist":
                return [
                    ...baseItems,
                    { icon: Users, label: "Miembros", id: "members" },
                    {
                        icon: QrCode,
                        label: "Control de acceso",
                        id: "access-control",
                    },
                    { icon: Key, label: "Locker", id: "locker" },
                    { icon: CreditCard, label: "Pagos", id: "billing" },
                ];
            case "Medical Staff":
                return [
                    ...baseItems,
                    { icon: Users, label: "Miembros", id: "members" },
                    {
                        icon: Dumbbell,
                        label: "Planes de entrenamiento",
                        id: "workout-plans",
                    },
                    { icon: FileText, label: "Medical Records", id: "medical" },
                ];
            case "Administrator":
                return [
                    ...baseItems,
                    { icon: Users, label: "Miembros", id: "members" },
                    { icon: BarChart3, label: "Reportes", id: "reports" },
                    { icon: CreditCard, label: "Financiero", id: "financial" },
                    { icon: Settings, label: "Configuración", id: "settings" },
                ];
            default:
                return baseItems;
        }
    };

    useEffect(() => {
        let navigationItems = getNavigationItems(user.role);
        setNavigationItems(navigationItems);
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar user={user} navigationItems={navigationItems} />

            {/* Main */}
            <div className="flex-1 flex flex-col md:pl-64">
                <Header
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    user={user}
                    navigationItems={navigationItems}
                    users={users}
                    setUser={setUser}
                />

                {/* Contenido de la página */}
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
