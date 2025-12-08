import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "./ui/button";

export default function AccessControl() {
    let [isPaused, setIsPaused] = useState<boolean>(false);
    let [afiliadoInfo, setAfiliadoInfo] = useState<any>({});
    let [status, setStatus] = useState<
        "success" | "invalid" | "expired" | null
    >(null);

    let handleValidate = async (result: any) => {
        if (result[0].format !== "qr_code") return;
        setIsPaused(true);
        let validation = await fetch(
            "http://localhost:3000/api/qr-code/validate",
            {
                body: JSON.stringify({
                    qr_code: result[0].rawValue,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
            }
        );
        if (!validation.ok) {
            setStatus("invalid");
            return;
        }
        let afiliado = await validation.json();
        console.log(afiliado);
        setAfiliadoInfo(afiliado);
        // comparar fecha de vencimiento con actual ISO
        let expirationDate = new Date(afiliado.fecha_vencimiento);
        let currentDate = new Date();

        if (expirationDate.getTime() <= currentDate.getTime()) {
            setStatus("expired");
            return;
        }
        setStatus("success");
    };

    return (
        <Card>
            <CardHeader className="text-3xl text-bold">
                Control de Acceso
            </CardHeader>
            <CardContent>
                Bienvenido al módulo de lectura de QR. Habilite los permisos de
                cámara para continuar
                <div className="flex flex-between w-full gap-4 mt-2">
                    <div className="flex flex-col align-center">
                        <div className="w-full">
                            <Scanner
                                onScan={(result) => handleValidate(result)}
                                paused={isPaused}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                setIsPaused(false);
                                setAfiliadoInfo({});
                                setStatus(null);
                            }}
                            className="mt-4 bg-green-500 hover:bg-green-600"
                        >
                            Leer otro
                        </Button>
                    </div>
                    <div className="w-full text-xl">
                        <div className="grid grid-cols-2 mb-4">
                            <p>
                                <b>Nombre de usuario: </b>
                                {afiliadoInfo?.Usuario?.nombre || ""}
                            </p>
                            <p>
                                <b>Apellido de usuario: </b>
                                {afiliadoInfo?.Usuario?.apellido || ""}
                            </p>
                            <p>
                                <b>Correo: </b>
                                {afiliadoInfo?.Usuario?.correo || ""}
                            </p>
                            <p>
                                <b>Documento: </b>
                                {afiliadoInfo?.documento || ""}
                            </p>
                        </div>
                        {status === "success" && (
                            <div className="text-green-500 w-full p-4 bg-green-100">
                                ✅ Acceso permitido
                            </div>
                        )}
                        {status === "invalid" && (
                            <div className="text-red-500 w-full p-4 bg-red-100">
                                ⚠️ Código QR Inválido
                            </div>
                        )}
                        {status === "expired" && (
                            <div className="text-red-500 w-full p-4 bg-red-100">
                                🗓️ La membresía del usuario ya ha vencido
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
