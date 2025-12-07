import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Dumbbell, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router";

// URL base de tu API de NestJS. ¡Ajusta esto!
const API_BASE_URL = "http://localhost:3000";

export default function LoginPage({
    setUser,
}: {
    setUser: (user: any) => void;
}) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    let navigate = useNavigate();

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Limpiar el error cuando el usuario comienza a escribir
        if (error) {
            setError(null);
        }
    };

    /**
     * @function handleLogin
     * Maneja el envío del formulario de login y se conecta al backend.
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: formData.email, // Nombre del campo en tu DTO de NestJS
                    password: formData.password,
                }),
            });
            let json = await response.json();
            if (response.status === 404) {
                setShowErrorModal(true);
                setError(json.error);
            }
            if (response.status === 403) {
                setShowErrorModal(true);
                setError(json.message);
            }
            if (response.status === 200 || response.status === 201) {
                // create in localStorage
                localStorage.setItem("user", json.user.correo);
                localStorage.setItem("role", json.user.rol);
                localStorage.setItem("name", json.user.nombre);
                setUser({
                    email: json.user.correo,
                    role: json.user.rol,
                    name: json.user.nombre,
                });
                if (json?.message === "passwordChangeRequired") {
                    navigate("/change-password");
                } else {
                    navigate("/dashboard");
                }
                // setUser(json);
            }
        } catch (error) {
            // Manejar errores de red (ej: el servidor está caído o inaccesible)
            console.error("Network Error:", error);
            setError(error);
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Mantenemos la función de demo, pero NO llama a la lógica mock
    const fillDemoCredentials = (role: string) => {
        const credentials = {
            admin: { email: "admin@sportbodygym.com", password: "admin123" },
            receptionist: {
                email: "receptionist@sportbodygym.com",
                password: "reception123",
            },
            medical: {
                email: "doctor@sportbodygym.com",
                password: "medical123",
            },
            member: { email: "member@sportbodygym.com", password: "member123" },
        };

        const cred = credentials[role as keyof typeof credentials];
        setFormData((prev) => ({
            ...prev,
            email: cred.email,
            password: cred.password,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
                        <Dumbbell className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sport Body Gym
                    </h1>
                    <p className="text-gray-600">
                        Sistema de Gestión y Control de Acceso
                    </p>
                </div>

                {/* Login Form */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center">
                            Bienvenido
                        </CardTitle>
                        <CardDescription className="text-center">
                            Inicia sesión para acceder a tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Ingrese su correo electrónico"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Ingrese su contraseña"
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                "rememberMe",
                                                checked as boolean
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600"
                                    >
                                        Recuerdame
                                    </Label>
                                </div>
                                <Button
                                    variant="link"
                                    className="px-0 text-orange-600 hover:text-orange-700"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Button>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Iniciando sesión
                                    </div>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 pt-6 border-t">
                            <p className="text-sm text-gray-600 text-center mb-3">
                                Inicia sesión con credenciales de demo:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        fillDemoCredentials("admin");
                                    }}
                                    className="text-xs"
                                >
                                    Administrador
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        fillDemoCredentials("receptionist");
                                    }}
                                    className="text-xs"
                                >
                                    Receptionista
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        fillDemoCredentials("medical");
                                    }}
                                    className="text-xs"
                                >
                                    Personal Medico
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        fillDemoCredentials("member");
                                    }}
                                    className="text-xs"
                                >
                                    Miembro
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Footer />
            </div>

            {/* Error Modal */}
            <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl">{error}</div>
                            <DialogTitle className="text-lg font-semibold text-red-600">
                                {error?.title}
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-gray-600 leading-relaxed">
                            {error?.message}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 mt-6">
                        <Button
                            onClick={() => setShowErrorModal(false)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600"
                        >
                            Intentar de Nuevo
                        </Button>
                        {error?.type === "server" ||
                        error?.type === "network" ? (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowErrorModal(false);
                                    alert(
                                        "Contacto de soporte: support@sportbodygym.com"
                                    );
                                }}
                            >
                                Contactar Soporte
                            </Button>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
