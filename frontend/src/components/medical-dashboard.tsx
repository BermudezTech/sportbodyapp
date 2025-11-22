import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { Dumbbell } from "lucide-react";
import { FileText } from "lucide-react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

function MedicalDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Pacientes activos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-gray-500">
                            Bajo supervisión médica
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Planes de entrenamiento
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-xs text-gray-500">
                            Prescripciones activas
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Citas de hoy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-gray-500">
                            3 citas pendientes
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Progreso de recuperación
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94%</div>
                        <p className="text-xs text-gray-500">
                            Promedio de completación
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-orange-500" />
                            Agenda de hoy
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    time: "09:00",
                                    patient: "John Doe",
                                    type: "Evaluación inicial",
                                    status: "Completada",
                                },
                                {
                                    time: "10:30",
                                    patient: "Sarah Wilson",
                                    type: "Revisión de progreso",
                                    status: "Actual",
                                },
                                {
                                    time: "14:00",
                                    patient: "Mike Johnson",
                                    type: "Actualización de plan de entrenamiento",
                                    status: "Proxima",
                                },
                                {
                                    time: "15:30",
                                    patient: "Emma Davis",
                                    type: "Revisión de recuperación",
                                    status: "Proxima",
                                },
                            ].map((appointment, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm font-mono text-gray-500">
                                            {appointment.time}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {appointment.patient}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {appointment.type}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={
                                            appointment.status === "Completada"
                                                ? "text-green-600 border-green-600"
                                                : appointment.status ===
                                                  "Actual"
                                                ? "text-orange-600 border-orange-600"
                                                : "text-blue-600 border-blue-600"
                                        }
                                    >
                                        {appointment.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-orange-500" />
                            Planes de entrenamiento recientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    patient: "John Doe",
                                    plan: "Recuperación por lesión",
                                    progress: 85,
                                    updated: "2 days ago",
                                },
                                {
                                    patient: "Sarah Wilson",
                                    plan: "Fortalecimiento",
                                    progress: 92,
                                    updated: "1 day ago",
                                },
                                {
                                    patient: "Mike Johnson",
                                    plan: "Rehabilitación cardiovascular",
                                    progress: 67,
                                    updated: "3 days ago",
                                },
                            ].map((plan, index) => (
                                <div
                                    key={index}
                                    className="space-y-2 p-3 border rounded-lg"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-sm">
                                                {plan.patient}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {plan.plan}
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            {plan.progress}%
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={plan.progress}
                                        className="h-2"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Updated {plan.updated}
                                    </p>
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
                        >
                            <Users className="h-6 w-6" />
                            <span className="text-sm">Nueva evaluación</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                        >
                            <Dumbbell className="h-6 w-6" />
                            <span className="text-sm">Nuevo plan</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                        >
                            <FileText className="h-6 w-6" />
                            <span className="text-sm">
                                Nuevos registros médicos
                            </span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex-col gap-2 bg-transparent"
                        >
                            <Calendar className="h-6 w-6" />
                            <span className="text-sm">Agenda</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default MedicalDashboard;
