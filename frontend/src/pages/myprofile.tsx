import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface UserProfile {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    contacto_emergencia: string;
}

export default function MyProfile() {
    const [form, setForm] = useState<UserProfile>({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        contacto_emergencia: "",
    });

    const [afiliadoId, setAfiliadoId] = useState<number>(0);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    let updateAfiliado = async () => {
        let update = await fetch(
            `http://localhost:3000/api/afiliados/${afiliadoId}`,
            {
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
            }
        );
        if (update.ok) {
            setAlertOpen(true);

            // Cerrar en 3 segundos
            setTimeout(() => {
                setAlertOpen(false);
            }, 3000);
        }
    };

    useEffect(() => {
        let getProfile = async () => {
            let profile = await fetch(
                "http://localhost:3000/api/afiliados/profile",
                {
                    body: JSON.stringify({
                        correo: localStorage.getItem("user"),
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PATCH",
                }
            );
            let profileInfo = await profile.json();
            if (profile.ok) {
                setForm({
                    nombre: profileInfo.Usuario.nombre,
                    apellido: profileInfo.Usuario.apellido,
                    correo: profileInfo.Usuario.correo,
                    telefono: profileInfo.Usuario.telefono,
                    contacto_emergencia: profileInfo.contacto_emergencia,
                });
                setAfiliadoId(profileInfo.id_afiliado);
            }
        };
        getProfile();
    }, []);

    const handleChange = (field: keyof UserProfile, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const handleSubmit = () => {
        updateAfiliado();
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Mi Perfil</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Alerta */}
                {alertOpen && (
                    <Alert className="border-green-600/60 bg-green-100/50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle className="font-semibold">
                            Usuario Actualizado
                        </AlertTitle>
                        <AlertDescription>
                            El usuario se ha actualizado correctamente
                        </AlertDescription>
                    </Alert>
                )}

                {/* Nombre */}
                <div className="space-y-1">
                    <Label>Nombre</Label>
                    <Input
                        value={form.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        disabled
                    />
                </div>

                {/* Apellido */}
                <div className="space-y-1">
                    <Label>Apellido</Label>
                    <Input
                        value={form.apellido}
                        onChange={(e) =>
                            handleChange("apellido", e.target.value)
                        }
                        disabled
                    />
                </div>

                {/* Correo */}
                <div className="space-y-1">
                    <Label>Correo</Label>
                    <Input
                        type="email"
                        value={form.correo}
                        onChange={(e) => handleChange("correo", e.target.value)}
                    />
                </div>

                {/* Teléfono */}
                <div className="space-y-1">
                    <Label>Teléfono</Label>
                    <Input
                        value={form.telefono}
                        onChange={(e) =>
                            handleChange("telefono", e.target.value)
                        }
                    />
                </div>

                {/* Contacto de Emergencia */}
                <div className="space-y-1">
                    <Label>Contacto de emergencia</Label>
                    <Input
                        value={form.contacto_emergencia}
                        onChange={(e) =>
                            handleChange("contacto_emergencia", e.target.value)
                        }
                    />
                </div>

                <Button className="w-full mt-2" onClick={handleSubmit}>
                    Guardar cambios
                </Button>
            </CardContent>
        </Card>
    );
}
