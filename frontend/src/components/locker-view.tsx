import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function LockerInfo() {
    let [locker, setLocker] = useState({
        id_locker: 0,
        status: "",
    });
    let [noAssigned, setNoAssigned] = useState<boolean>(false);

    let getLocker = async () => {
        let lockerInfo = await fetch(
            "http://localhost:3000/api/lockers/getbymail",
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
        if (lockerInfo.status === 404) {
            setNoAssigned(true);
            return;
        }
        let locker = await lockerInfo.json();
        setLocker({
            id_locker: locker.id_locker,
            status: locker.estado,
        });
    };

    useEffect(() => {
        getLocker();
    }, []);

    if (noAssigned) {
        return (
            <center>
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            No tiene ningún locker asignado en el momento
                        </CardTitle>
                        <CardContent>
                            Si requiere un locker, solicitelo en recepción
                        </CardContent>
                    </CardHeader>
                </Card>
            </center>
        );
    }

    return (
        <center>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Locker #{locker.id_locker}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    <div className="flex justify-between">
                        <span className="font-medium">Ubicación:</span>
                        <span>
                            {locker.id_locker < 50
                                ? "Casillero 1"
                                : "Casillero 2"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Estado:</span>
                        <span
                            className={
                                locker.status === "disponible"
                                    ? "text-green-600"
                                    : locker.status === "alquilado"
                                    ? "text-blue-600"
                                    : "text-orange-600"
                            }
                        >
                            {locker.status === "alquilado"
                                ? "Alquilado"
                                : "Uso provisional"}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </center>
    );
}
