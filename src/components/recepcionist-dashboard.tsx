import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";
import { CardDescription } from "@/components/ui/card";
import { Key, CreditCard } from "lucide-react";

function ReceptionistDashboard({
    setCurrentView,
}: {
    setCurrentView: (view: string) => void;
}) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Today's Check-ins
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">127</div>
                        <p className="text-xs text-gray-500">
                            +12% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Active Members
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-gray-500">
                            Currently in gym: 89
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Available Lockers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-gray-500">
                            Out of 150 total
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Pending Payments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,340</div>
                        <p className="text-xs text-gray-500">
                            15 overdue accounts
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-orange-500" />
                            Quick Access Control
                        </CardTitle>
                        <CardDescription>
                            Scan member QR codes for entry
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center space-y-4">
                            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                                <QrCode className="h-16 w-16 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Ready to scan member QR codes
                            </p>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                Start Scanning
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-orange-500" />
                            Recent Member Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                {
                                    name: "John Doe",
                                    action: "Checked In",
                                    time: "2 min ago",
                                    status: "in",
                                },
                                {
                                    name: "Sarah Wilson",
                                    action: "Checked Out",
                                    time: "5 min ago",
                                    status: "out",
                                },
                                {
                                    name: "Mike Johnson",
                                    action: "Checked In",
                                    time: "8 min ago",
                                    status: "in",
                                },
                                {
                                    name: "Emma Davis",
                                    action: "Locker Assigned",
                                    time: "12 min ago",
                                    status: "locker",
                                },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {member.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {member.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {member.action}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">
                                            {member.time}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={
                                                member.status === "in"
                                                    ? "text-green-600 border-green-600"
                                                    : member.status === "out"
                                                    ? "text-red-600 border-red-600"
                                                    : "text-blue-600 border-blue-600"
                                            }
                                        >
                                            {member.status === "in"
                                                ? "In"
                                                : member.status === "out"
                                                ? "Out"
                                                : "Locker"}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                            onClick={() =>
                                setCurrentView("membership-management")
                            }
                        >
                            <Users className="h-6 w-6" />
                            <span className="text-sm">New Member</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                        >
                            <Key className="h-6 w-6" />
                            <span className="text-sm">Assign Locker</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                            onClick={() => setCurrentView("billing-payment")}
                        >
                            <CreditCard className="h-6 w-6" />
                            <span className="text-sm">Process Payment</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                        >
                            <FileText className="h-6 w-6" />
                            <span className="text-sm">Generate Report</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ReceptionistDashboard;
