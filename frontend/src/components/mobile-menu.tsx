"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut } from "lucide-react";

export default function MobileMenu({
    isOpen,
    setIsOpen,
    user,
    navigationItems,
}: any) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 bg-black text-white">
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 p-4 border-b border-gray-800">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold">
                            SB
                        </div>
                        <span className="font-bold text-lg">
                            Sport Body Gym
                        </span>
                    </div>

                    <nav className="flex-1 p-4">
                        {navigationItems.map((item: any) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                className="w-full justify-start text-white hover:bg-orange-500"
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                    {user?.name || ""}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-white">
                                    {user?.name || ""}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {user.role}
                                </p>
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
            </SheetContent>
        </Sheet>
    );
}
