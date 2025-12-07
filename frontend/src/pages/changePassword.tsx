import type React from "react";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Dumbbell } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";

// URL base de tu API de NestJS. ¡Ajusta esto!
const API_BASE_URL = "http://localhost:3000";

export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    const [email, setEmail] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        // Traer email de localstorage
        setEmail(localStorage.getItem("user"));
    }, []);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (error) {
            setError(null);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/auth/change-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        correo: email,
                        newPassword: formData.newPassword,
                        confirmNewPassword: formData.confirmNewPassword, // El backend lo validará de nuevo, pero lo enviamos
                    }),
                }
            );
            let json = await response.json();
            if (response.status === 200 || response.status === 201) {
                navigate("/dashboard");
            } else {
                setShowErrorModal(true);
                setError(json.message);
            }
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
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

                {/* Change Password Card */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center">
                            Restablecer Contraseña
                        </CardTitle>
                        <CardDescription className="text-center">
                            Necesitas establecer una nueva contraseña para
                            continuar.
                        </CardDescription>
                        {email && (
                            <p className="text-sm text-center text-orange-600 font-medium">
                                Usuario: {email}
                            </p>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleChangePassword}
                            className="space-y-4"
                        >
                            {/* New Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">
                                    Nueva Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="newPassword"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "newPassword",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 pr-10"
                                        required
                                        minLength={8}
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

                            {/* Confirm New Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmNewPassword">
                                    Confirmar Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="confirmNewPassword"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Repite la nueva contraseña"
                                        value={formData.confirmNewPassword}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "confirmNewPassword",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 pr-10"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 mt-6"
                                disabled={isLoading || !email}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Actualizando...
                                    </div>
                                ) : (
                                    "Cambiar y Continuar"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
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
                            Aceptar
                        </Button>
                        {error?.type === "security" && (
                            <Button
                                variant="outline"
                                // onClick={() => navigate("/login")}
                            >
                                Ir a Iniciar Sesión
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
