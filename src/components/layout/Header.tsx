import { Bell, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileMenu from "@/components/mobile-menu";

type HeaderProps = {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
};

export default function Header({
    isMobileMenuOpen,
    setIsMobileMenuOpen,
}: HeaderProps) {
    const user = {
        name: "John Doe",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-4 py-4">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <MobileMenu
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        navigationItems={[
                            {
                                id: "dashboard",
                                label: "Dashboard",
                                icon: Dumbbell,
                                path: "/dashboard",
                            },
                            {
                                id: "membership",
                                label: "Membership",
                                icon: Dumbbell,
                                path: "/membership",
                            },
                            {
                                id: "billing",
                                label: "Billing",
                                icon: Dumbbell,
                                path: "/billing",
                            },
                        ]}
                        user={user}
                    />

                    {/* Logo for mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">
                            Sport Body Gym
                        </span>
                    </div>

                    <h1 className="hidden md:block text-2xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs">
                            3
                        </Badge>
                    </Button>

                    {/* User info */}
                    <div className="hidden md:flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
