import { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Edit,
    QrCode,
    Phone,
    Mail,
    Calendar,
    Filter,
    Download,
    Eye,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [alertSucess, setAlertSuccess] = useState({
        show: false,
        message: "",
    });

    const [newMemberForm, setNewMemberForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        fecha_nacimiento: "",
        tipo_usuario: "",
    });

    const [editMemberForm, setEditMemberForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        fecha_nacimiento: "",
        tipo_usuario: "",
    });

    const [members, setMembers] = useState<any>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await fetch("http://localhost:3000/api/usuarios");
            let data = await response.json();
            data = data.map((member: any) => ({
                id: member.id_usuario,
                name: `${member.nombre} ${member.apellido}`,
                nombre: member.nombre,
                apellido: member.apellido,
                email: member.correo,
                phone: member.telefono,
                user_type: member.tipo_usuario,
                avatar: "/placeholder.svg?height=40&width=40",
            }));
            setMembers(data);
        };
        fetchMembers();
    }, [isNewMemberDialogOpen, isEditDialogOpen, isDeleteDialogOpen]);

    const addAfiliado = async () => {
        let afiliadoData = {
            ...newMemberForm,
            // Convert to ISO-8601 datetime string
            fecha_nacimiento: new Date(
                newMemberForm.fecha_nacimiento
            ).toISOString(),
            nombre_usuario: newMemberForm.correo,
            password: "123456",
        };
        let response = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(afiliadoData),
        });
        if (response.ok) {
            setIsNewMemberDialogOpen(false);
            setAlertSuccess({
                show: true,
                message: "Usuario agregado exitosamente",
            });
            setTimeout(() => {
                setAlertSuccess({
                    show: false,
                    message: "",
                });
            }, 3000);
            setNewMemberForm({
                nombre: "",
                apellido: "",
                correo: "",
                telefono: "",
                fecha_nacimiento: "",
                tipo_usuario: "",
            });
        }
    };

    const updateUsuario = async () => {
        let selectedMemberID = selectedMember.id;
        let response = await fetch(
            `http://localhost:3000/api/usuarios/${selectedMemberID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editMemberForm),
            }
        );
        if (response.ok) {
            setIsEditDialogOpen(false);
            setAlertSuccess({
                show: true,
                message: "Afiliado actualizado exitosamente",
            });
            setTimeout(() => {
                setAlertSuccess({
                    show: false,
                    message: "",
                });
            }, 3000);
        }
    };

    const deleteUsuario = async () => {
        let selectedMemberID = selectedMember.id;
        let response = await fetch(
            `http://localhost:3000/api/usuarios/${selectedMemberID}`,
            {
                method: "DELETE",
            }
        );
        if (response.ok) {
            setIsDeleteDialogOpen(false);
            setAlertSuccess({
                show: true,
                message: "Afiliado eliminado exitosamente",
            });
            setTimeout(() => {
                setAlertSuccess({
                    show: false,
                    message: "",
                });
            }, 3000);
        }
    };

    const filteredMembers = members.filter((member: any) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" ||
            member.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestionar Usuarios
                    </h1>
                    <p className="text-gray-600">
                        Gestión de todos los usuarios del sistema
                    </p>
                </div>

                <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() =>
                        setIsNewMemberDialogOpen(!isNewMemberDialogOpen)
                    }
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {isNewMemberDialogOpen ? "Cancelar" : "Nuevo Usuario"}
                </Button>
            </div>
            {alertSucess.show && (
                <div className="bg-green-500 text-white p-4 w-full">
                    {alertSucess.message}
                </div>
            )}
            {/* New Member Form (shown when button is clicked) */}
            {isNewMemberDialogOpen && (
                <Card className="mb-6 border-2 border-orange-500">
                    <CardHeader>
                        <CardTitle>Registro de nuevo usuario</CardTitle>
                        <CardDescription>
                            Llenar la información del usuario para crear un
                            nuevo usuario.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre">Nombre *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Nombre"
                                        value={newMemberForm.nombre}
                                        onChange={(e) =>
                                            setNewMemberForm({
                                                ...newMemberForm,
                                                nombre: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="apellido">Apellido *</Label>
                                    <Input
                                        id="apellido"
                                        placeholder="Apellido"
                                        value={newMemberForm.apellido}
                                        onChange={(e) =>
                                            setNewMemberForm({
                                                ...newMemberForm,
                                                apellido: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={newMemberForm.correo}
                                    onChange={(e) =>
                                        setNewMemberForm({
                                            ...newMemberForm,
                                            correo: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefono *</Label>
                                <Input
                                    id="phone"
                                    placeholder="Telefono"
                                    value={newMemberForm.telefono}
                                    onChange={(e) =>
                                        setNewMemberForm({
                                            ...newMemberForm,
                                            telefono: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthdate">
                                    Fecha de Nacimiento *
                                </Label>
                                <Input
                                    id="birthdate"
                                    type="date"
                                    onChange={(e) =>
                                        setNewMemberForm({
                                            ...newMemberForm,
                                            fecha_nacimiento: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="membershipType">
                                    Tipo de Usuario *
                                </Label>
                                <Select
                                    onValueChange={(e: any) => {
                                        setNewMemberForm({
                                            ...newMemberForm,
                                            tipo_usuario: e,
                                        });
                                    }}
                                    defaultValue={newMemberForm.tipo_usuario}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Tipo de Usuario" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="administrador">
                                            Administrador
                                        </SelectItem>
                                        <SelectItem value="recepcionista">
                                            Recepcionista
                                        </SelectItem>
                                        <SelectItem value="medico">
                                            Personal Médico
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                                    onClick={addAfiliado}
                                >
                                    Registrar Usuario
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsNewMemberDialogOpen(false)
                                    }
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre, correo electrónico o ID de miembro..."
                                value={searchTerm}
                                // onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={filterStatus}
                            onValueChange={setFilterStatus}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">
                                    Todos los estados
                                </SelectItem>
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="expired">
                                    Expirado
                                </SelectItem>
                                <SelectItem value="suspended">
                                    Suspendido
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Members Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Usuarios ({filteredMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Contacto
                                    </TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Tipo de usuario
                                    </TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map((member: any) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            member.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {member.name
                                                            .split(" ")
                                                            .map(
                                                                (n: any) => n[0]
                                                            )
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {member.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Mail className="h-3 w-3" />
                                                    {member.email}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Phone className="h-3 w-3" />
                                                    {member.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <Badge variant="outline">
                                                {member.user_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedMember(
                                                            member
                                                        );
                                                        setEditMemberForm({
                                                            nombre: member.nombre,
                                                            apellido:
                                                                member.apellido,
                                                            correo: member.correo,
                                                            telefono:
                                                                member.telefono,
                                                            fecha_nacimiento:
                                                                member.fecha_nacimiento,
                                                            tipo_usuario:
                                                                member.tipo_usuario,
                                                        });
                                                        setIsEditDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedMember(
                                                            member
                                                        );
                                                        setIsDeleteDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Member Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Editar Información del Usuario
                        </DialogTitle>
                        <DialogDescription>
                            Actualizar detalles del usuario.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedMember && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="editFirstName">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="editFirstName"
                                        defaultValue={
                                            selectedMember.name.split(" ")[0]
                                        }
                                        onChange={(e) =>
                                            setEditMemberForm({
                                                ...editMemberForm,
                                                nombre: e.target.value,
                                            })
                                        }
                                        value={editMemberForm.nombre}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="editLastName">
                                        Apellido
                                    </Label>
                                    <Input
                                        id="editLastName"
                                        defaultValue={selectedMember.apellido}
                                        onChange={(e) =>
                                            setEditMemberForm({
                                                ...editMemberForm,
                                                apellido: e.target.value,
                                            })
                                        }
                                        value={editMemberForm.apellido}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editEmail">
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="editEmail"
                                    defaultValue={selectedMember.email}
                                    onChange={(e) =>
                                        setEditMemberForm({
                                            ...editMemberForm,
                                            correo: e.target.value,
                                        })
                                    }
                                    value={editMemberForm.correo}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editPhone">
                                    Número de Teléfono
                                </Label>
                                <Input
                                    id="editPhone"
                                    defaultValue={selectedMember.phone}
                                    onChange={(e) =>
                                        setEditMemberForm({
                                            ...editMemberForm,
                                            telefono: e.target.value,
                                        })
                                    }
                                    value={editMemberForm.telefono}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editMembershipType">
                                    Tipo de Usuario
                                </Label>
                                <Select
                                    defaultValue={selectedMember.user_type.toLowerCase()}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="administrador">
                                            Administrador
                                        </SelectItem>
                                        <SelectItem value="recepcionista">
                                            Recepcionista
                                        </SelectItem>
                                        <SelectItem value="medico">
                                            Médico
                                        </SelectItem>
                                        <SelectItem value="afiliado">
                                            Afiliado
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                                    onClick={updateUsuario}
                                >
                                    Actualizar Usuario
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Member Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Eliminar Usuario</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de eliminar este usuario?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 pt-4">
                        <Button
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            onClick={deleteUsuario}
                        >
                            Eliminar Usuario
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
