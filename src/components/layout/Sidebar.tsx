import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export default function Sidebar({ navigationItems, user }: any) {
    return (
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow bg-black text-white">
                <div className="flex items-center gap-2 p-6 border-b border-gray-800">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-lg">SB</span>
                    </div>
                    <span className="font-bold text-xl">Sport Body Gym</span>
                </div>

                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {navigationItems.map((item: any) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className="w-full justify-start text-white hover:bg-orange-500 hover:text-white"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={user?.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{user.name}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-white">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-400">{user.role}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-red-600"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
