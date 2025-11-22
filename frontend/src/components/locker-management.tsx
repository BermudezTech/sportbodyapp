import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

interface Locker {
    id: number;
    id_locker?: number;
    estado: string;
    id_afiliado: number;
    Afiliado?: any;
}

export default function LockerManagement() {
    const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [lockers1, setLockers1] = useState([]);
    const [lockers2, setLockers2] = useState([]);
    const [idUser, setIDUser] = useState<string>("");
    const [afiliados, setAfiliados] = useState([]);
    const [afiliadoName, setAfiliadoName] = useState<string>(
        "Aún no se ha seleccionado el usuario"
    );
    const [afiliadoID, setAfiliadoID] = useState<number>(0);

    let updateChanges = () => {
        if (selectedState === "disponible") {
            fetch(
                "http://localhost:3000/api/lockers/" +
                    selectedLocker?.id +
                    "/free",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estado: selectedState,
                    }),
                }
            );
        } else {
            console.log(selectedState, afiliadoID);
            fetch(
                "http://localhost:3000/api/lockers/" +
                    selectedLocker?.id +
                    "/assign",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estado: selectedState,
                        id_afiliado: afiliadoID,
                    }),
                }
            );
        }
        setIsDialogOpen(false);
        setIDUser("");
        setAfiliadoName("Aún no se ha seleccionado el usuario");
    };

    useEffect(() => {
        let loadAfiliados = async () => {
            const afiliados = await fetch(
                "http://localhost:3000/api/afiliados"
            );
            let res = await afiliados.json();
            setAfiliados(res);
        };
        loadAfiliados();
    }, []);

    useEffect(() => {
        let loadLockers = async () => {
            const lockers = await fetch("http://localhost:3000/api/lockers");
            let res = await lockers.json();
            res = res.map((locker: Locker) => ({
                ...locker,
                id: locker.id_locker,
            }));
            setLockers1(res.filter((locker: Locker) => locker.id <= 50));
            setLockers2(res.filter((locker: Locker) => locker.id > 50));
        };
        loadLockers();
    }, [isDialogOpen]);

    const handleLockerClick = (locker: Locker) => {
        setSelectedLocker(locker);
        setSelectedState(locker.estado); // carga estado actual del locker
        setIsDialogOpen(true);
        if (locker.estado !== "disponible") {
            setIDUser(locker.Afiliado.documento);
            setAfiliadoName(
                `${locker.Afiliado.Usuario.nombre} ${locker.Afiliado.Usuario.apellido}`
            );
            setAfiliadoID(locker.id_afiliado);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Gestión de Lockers</h2>

            <center>
                {/* CASILLERO 1 */}
                <h2 className="text-xl font-semibold mb-4 mt-4">Casillero 1</h2>
                <div className="grid grid-cols-10 gap-2 w-1/2">
                    {lockers1.map((locker: Locker) => (
                        <button
                            key={locker.id}
                            onClick={() => handleLockerClick(locker)}
                            className={`w-12 h-12 rounded-md border flex items-center justify-center text-sm font-medium 
                                ${
                                    locker.estado === "disponible"
                                        ? "bg-green-200"
                                        : ""
                                }
                                ${
                                    locker.estado === "ocupado"
                                        ? "bg-orange-200"
                                        : ""
                                }
                                ${
                                    locker.estado === "alquilado"
                                        ? "bg-red-200"
                                        : ""
                                }
                            `}
                        >
                            {locker.id}
                        </button>
                    ))}
                </div>

                {/* CASILLERO 2 */}
                <h2 className="text-xl font-semibold mb-4 mt-4">Casillero 2</h2>
                <div className="grid grid-cols-10 gap-2 w-1/2">
                    {lockers2.map((locker: Locker) => (
                        <button
                            key={locker.id}
                            onClick={() => handleLockerClick(locker)}
                            className={`w-12 h-12 rounded-md border flex items-center justify-center text-sm font-medium 
                                ${
                                    locker.estado === "disponible"
                                        ? "bg-green-200"
                                        : ""
                                }
                                ${
                                    locker.estado === "ocupado"
                                        ? "bg-orange-200"
                                        : ""
                                }
                                ${
                                    locker.estado === "alquilado"
                                        ? "bg-red-200"
                                        : ""
                                }
                            `}
                        >
                            {locker.id}
                        </button>
                    ))}
                </div>
            </center>

            {/* DIALOG */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Locker #{selectedLocker?.id}</DialogTitle>
                        <DialogDescription>
                            Actualiza el estado del locker o asigna un afiliado.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Select Estado */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            Estado del locker
                        </label>
                        <Select
                            value={selectedState}
                            onValueChange={(value) => setSelectedState(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el estado" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="disponible">
                                    Disponible
                                </SelectItem>
                                <SelectItem value="ocupado">
                                    Ocupado provisional
                                </SelectItem>
                                <SelectItem value="alquilado">
                                    Alquilado
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 mt-2">
                        {/* Campo afiliado visible solo si NO está libre */}
                        {(selectedState === "ocupado" ||
                            selectedState === "alquilado") && (
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">
                                    Afiliado
                                </label>
                                <Label>
                                    Número de identificación del afiliado
                                </Label>
                                <Input
                                    placeholder="Ingresa el ID del afiliado"
                                    type="number"
                                    value={idUser}
                                    onChange={(e) => {
                                        setIDUser(e.target.value);
                                        // Convertimos el input a string para comparar
                                        const encontrado: any = afiliados.find(
                                            (afiliado: any) =>
                                                afiliado.documento ===
                                                e.target.value.toString()
                                        );

                                        if (encontrado) {
                                            setAfiliadoName(
                                                `${encontrado.Usuario.nombre} ${encontrado.Usuario.apellido}`
                                            );
                                            console.log(encontrado);
                                            setAfiliadoID(
                                                encontrado.id_afiliado
                                            );
                                        } else {
                                            setAfiliadoName(
                                                "Aún no se ha seleccionado el usuario"
                                            );
                                        }
                                    }}
                                />

                                <Label>
                                    <b>Afiliado:</b>
                                </Label>
                                <p
                                    className={`text-${
                                        afiliadoName ===
                                        "Aún no se ha seleccionado el usuario"
                                            ? "red"
                                            : "black"
                                    }-500`}
                                >
                                    {afiliadoName}
                                </p>
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                onClick={updateChanges}
                                disabled={
                                    afiliadoName ===
                                        "Aún no se ha seleccionado el usuario" &&
                                    selectedState !== "disponible"
                                }
                            >
                                Guardar Cambios
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setAfiliadoName(
                                        "Aún no se ha seleccionado el usuario"
                                    );
                                    setIDUser("");
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
