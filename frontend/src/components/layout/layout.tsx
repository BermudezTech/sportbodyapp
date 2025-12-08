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
import Footer from "./Footer";

export default function Layout({ user, setUser }: { user: any; setUser: any }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navigationItems, setNavigationItems] = useState<any>([]);

    const getNavigationItems = (role: string) => {
        const baseItems = [
            {
                icon: Home,
                label: "Dashboard",
                id: "dashboard",
                to: "/dashboard",
            },
        ];

        switch (role) {
            case "afiliado":
                return [
                    ...baseItems,
                    { icon: User, label: "Mi perfil", id: "profile" },
                    { icon: QrCode, label: "Acceso QR", id: "qr-access" },
                    {
                        icon: Key,
                        label: "Mi locker",
                        id: "locker",
                        to: "/locker-view",
                    },
                    { icon: CreditCard, label: "Pagos", id: "payments" },
                    {
                        icon: Dumbbell,
                        label: "Mis entrenamientos",
                        id: "workouts",
                    },
                ];
            case "recepcionista":
                return [
                    ...baseItems,
                    {
                        icon: Users,
                        label: "Afiliados",
                        id: "members",
                        to: "/membership-management",
                    },
                    {
                        icon: QrCode,
                        label: "Control de acceso",
                        id: "access-control",
                    },
                    {
                        icon: Key,
                        label: "Locker",
                        id: "locker",
                        to: "/locker-management",
                    },
                    {
                        icon: CreditCard,
                        label: "Pagos",
                        id: "billing",
                        to: "/billing",
                    },
                ];
            case "medico":
                return [
                    ...baseItems,
                    { icon: Users, label: "Afiliados", id: "members" },
                    {
                        icon: Dumbbell,
                        label: "Planes de entrenamiento",
                        id: "workout-plans",
                    },
                    { icon: FileText, label: "Medical Records", id: "medical" },
                ];
            case "administrador":
                return [
                    ...baseItems,
                    {
                        icon: Users,
                        label: "Usuarios",
                        id: "members",
                        to: "/user-management",
                    },
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
                    setUser={setUser}
                />

                {/* Contenido de la página */}
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
