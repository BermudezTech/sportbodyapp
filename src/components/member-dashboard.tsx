import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";
import { CardDescription } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function MemberDashboard({
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
                            Membership Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            Active
                        </div>
                        <p className="text-xs text-gray-500">
                            Expires: Dec 31, 2024
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Current Locker
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">A-42</div>
                        <p className="text-xs text-gray-500">
                            Level 1, Section A
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            This Month Visits
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-gray-500">
                            +3 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Next Payment
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$89</div>
                        <p className="text-xs text-gray-500">
                            Due: Jan 1, 2025
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-orange-500" />
                            Quick Access
                        </CardTitle>
                        <CardDescription>
                            Scan QR code for gym entry
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
                                <QrCode className="h-20 w-20 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Show this QR code at the entrance
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-orange-500" />
                            Today's Workout
                        </CardTitle>
                        <CardDescription>
                            Your personalized routine
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    Upper Body Strength
                                </span>
                                <Badge variant="outline">45 min</Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>3/5 exercises</span>
                                </div>
                                <Progress value={60} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium">
                                    Next Exercise:
                                </div>
                                <div className="text-sm text-gray-600">
                                    Bench Press - 3 sets x 12 reps
                                </div>
                            </div>
                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-600"
                                onClick={() =>
                                    setCurrentView("workout-progress")
                                }
                            >
                                Continue Workout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                date: "Today, 2:30 PM",
                                activity: "Gym Entry",
                                status: "success",
                            },
                            {
                                date: "Yesterday, 6:00 PM",
                                activity: "Workout Completed",
                                status: "success",
                            },
                            {
                                date: "Dec 15, 3:15 PM",
                                activity: "Payment Processed",
                                status: "success",
                            },
                            {
                                date: "Dec 14, 7:30 AM",
                                activity: "Gym Entry",
                                status: "success",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 border-b last:border-b-0"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.activity}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.date}
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-600"
                                >
                                    Success
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default MemberDashboard;
