import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Dumbbell } from "lucide-react";
import MobileMenu from "../mobile-menu";

export default function Header({
    user,
    navigationItems,
    isMenuOpen,
    setIsMenuOpen,
    users,
    setUser,
}: any) {
    return (
        <>
            <header className="bg-white shadow-sm border-b">
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-4">
                        <MobileMenu
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            user={user}
                            navigationItems={navigationItems}
                        />
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

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-xs flex items-center justify-center text-white">
                                3
                            </span>
                        </Button>
                        <div className="hidden md:flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user?.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                    {user?.name || ""}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                                {user?.name || ""}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            {/* Role Switcher for Demo */}
            <div className="p-4 bg-orange-50 border-b">
                <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                        Demo - Cambiar rol:
                    </span>
                    {users.map((currentUser: any) => (
                        <Button
                            key={user.id}
                            variant={
                                user.email === currentUser.email
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setUser(currentUser)}
                            className={
                                user.email === currentUser.email
                                    ? "bg-orange-500 hover:bg-orange-600"
                                    : ""
                            }
                        >
                            {currentUser.role}
                        </Button>
                    ))}
                    {/* {Object.entries(users).map(([key, userData]) => (
                        <Button
                            key={key}
                            variant={user === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setUser(key as keyof typeof users)}
                            className={
                                user === key
                                    ? "bg-orange-500 hover:bg-orange-600"
                                    : ""
                            }
                        >
                            {user.role}
                        </Button>
                    ))} */}
                </div>
            </div>
        </>
    );
}
