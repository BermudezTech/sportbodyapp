import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Key } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Settings } from "lucide-react";
import { QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdminDashboard({
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
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$47,892</div>
                        <p className="text-xs text-gray-500">
                            +8.2% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Members
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-gray-500">
                            +23 new this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Gym Utilization
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-gray-500">
                            Peak hours: 6-8 PM
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Staff Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">96%</div>
                        <p className="text-xs text-gray-500">
                            Customer satisfaction
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-orange-500" />
                            Revenue Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="monthly" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="daily">Daily</TabsTrigger>
                                <TabsTrigger value="monthly">
                                    Monthly
                                </TabsTrigger>
                                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                            </TabsList>
                            <TabsContent value="monthly" className="space-y-4">
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            Revenue chart would be displayed
                                            here
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">
                                            This Month
                                        </p>
                                        <p className="font-bold text-lg">
                                            $47,892
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">
                                            Last Month
                                        </p>
                                        <p className="font-bold text-lg">
                                            $44,231
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-orange-500" />
                            Member Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    Active Memberships
                                </span>
                                <span className="font-bold">1,247</span>
                            </div>
                            <Progress value={85} className="h-2" />

                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    Expired (Grace Period)
                                </span>
                                <span className="font-bold">43</span>
                            </div>
                            <Progress value={15} className="h-2" />

                            <div className="flex justify-between items-center">
                                <span className="text-sm">New This Month</span>
                                <span className="font-bold">23</span>
                            </div>
                            <Progress value={60} className="h-2" />

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">
                                        94%
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Retention Rate
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-orange-600">
                                        $89
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Avg. Monthly Fee
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                            <QrCode className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                            <p className="font-bold text-lg">2,847</p>
                            <p className="text-sm text-gray-500">
                                QR Scans Today
                            </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <Key className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                            <p className="font-bold text-lg">127/150</p>
                            <p className="text-sm text-gray-500">
                                Lockers Occupied
                            </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-500" />
                            <p className="font-bold text-lg">$2,340</p>
                            <p className="text-sm text-gray-500">
                                Pending Payments
                            </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                            <p className="font-bold text-lg">99.8%</p>
                            <p className="text-sm text-gray-500">
                                System Uptime
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminDashboard;
