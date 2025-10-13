import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";
import { CardDescription } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NavLink } from "react-router";

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
                            Estado de membresía
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            Activa
                        </div>
                        <p className="text-xs text-gray-500">
                            Expira: 31 de diciembre de 2024
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Casillero actual
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">A-42</div>
                        <p className="text-xs text-gray-500">
                            Nivel 1, Sección A
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Visitas este mes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-gray-500">
                            +3 respecto al mes pasado
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Próximo pago
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$89</div>
                        <p className="text-xs text-gray-500">
                            Vence: 1 de enero de 2025
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-orange-500" />
                            Acceso rápido
                        </CardTitle>
                        <CardDescription>
                            Escanea el código QR para ingresar al gimnasio
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
                                <QrCode className="h-20 w-20 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Muestra este código QR en la entrada
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-orange-500" />
                            Entrenamiento de hoy
                        </CardTitle>
                        <CardDescription>
                            Tu rutina personalizada
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    Fuerza de tren superior
                                </span>
                                <Badge variant="outline">45 min</Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progreso</span>
                                    <span>3/5 ejercicios</span>
                                </div>
                                <Progress value={60} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium">
                                    Próximo ejercicio:
                                </div>
                                <div className="text-sm text-gray-600">
                                    Press de banca - 3 series x 12 repeticiones
                                </div>
                            </div>
                            <NavLink to="/workout-progress">
                                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                    Continuar entrenamiento
                                </Button>
                            </NavLink>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Actividad reciente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                date: "Hoy, 2:30 PM",
                                activity: "Ingreso al gimnasio",
                                status: "success",
                            },
                            {
                                date: "Ayer, 6:00 PM",
                                activity: "Entrenamiento completado",
                                status: "success",
                            },
                            {
                                date: "15 de dic, 3:15 PM",
                                activity: "Pago procesado",
                                status: "success",
                            },
                            {
                                date: "14 de dic, 7:30 AM",
                                activity: "Ingreso al gimnasio",
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
                                    Éxito
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
