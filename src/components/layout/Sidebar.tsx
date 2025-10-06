import { Button } from "@/components/ui/button";
import { Dumbbell, Home, Users, CreditCard } from "lucide-react";
import { NavLink } from "react-router";

export default function Sidebar() {
    return (
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-black text-white">
            <div className="flex items-center gap-2 p-6 border-b border-gray-800">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">Sport Body Gym</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/dashboard">
                    {({ isActive }) => (
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                                isActive ? "bg-orange-500" : ""
                            }`}
                        >
                            <Home className="mr-3 h-5 w-5" /> Dashboard
                        </Button>
                    )}
                </NavLink>

                <NavLink to="/membership">
                    {({ isActive }) => (
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                                isActive ? "bg-orange-500" : ""
                            }`}
                        >
                            <Users className="mr-3 h-5 w-5" /> Membership
                        </Button>
                    )}
                </NavLink>

                <NavLink to="/billing">
                    {({ isActive }) => (
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                                isActive ? "bg-orange-500" : ""
                            }`}
                        >
                            <CreditCard className="mr-3 h-5 w-5" /> Billing
                        </Button>
                    )}
                </NavLink>
            </nav>
        </div>
    );
}
