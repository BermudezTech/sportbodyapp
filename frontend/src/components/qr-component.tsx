import { QrCode } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "./ui/card";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function QRComponent() {
    let [QR, setQR] = useState<string>("");

    let getQR = async () => {
        let qrCode = await fetch("http://localhost:3000/api/qr-code", {
            body: JSON.stringify({
                correo: localStorage.getItem("user"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
        });
        const QR = await qrCode.json();
        setQR(QR.qr_code);
        return;
    };

    useEffect(() => {
        getQR();
    }, []);
    return (
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
                <div className="w-48 h-48 mx-auto  rounded-lg flex items-center justify-center mb-4">
                    <div className="w-40 h-40  rounded-lg flex items-center justify-center">
                        <QRCode value={QR} size={256} />
                    </div>
                </div>
                <p className="text-sm text-gray-600">
                    Muestra este código QR en la entrada
                </p>
            </CardContent>
        </Card>
    );
}

export default QRComponent;
