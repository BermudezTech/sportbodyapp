import { useState } from "react";
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

// Mock data for existing members
const mockMembers = [
    {
        id: "M001",
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        birthdate: "1990-05-15",
        membershipType: "Premium",
        status: "Active",
        joinDate: "2024-01-15",
        expiryDate: "2024-12-15",
        qrCode: "QR001",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "M002",
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        phone: "+1 (555) 234-5678",
        birthdate: "1985-08-22",
        membershipType: "Basic",
        status: "Active",
        joinDate: "2024-02-01",
        expiryDate: "2024-11-01",
        qrCode: "QR002",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "M003",
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        phone: "+1 (555) 345-6789",
        birthdate: "1992-12-10",
        membershipType: "Premium",
        status: "Expired",
        joinDate: "2023-06-15",
        expiryDate: "2024-06-15",
        qrCode: "QR003",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "M004",
        name: "Emma Davis",
        email: "emma.davis@email.com",
        phone: "+1 (555) 456-7890",
        birthdate: "1988-03-18",
        membershipType: "Standard",
        status: "Active",
        joinDate: "2024-03-10",
        expiryDate: "2025-03-10",
        qrCode: "QR004",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

export default function MembershipManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const filteredMembers = mockMembers.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" ||
            member.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const NewMemberForm = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input id="firstName" placeholder="Nombre" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input id="lastName" placeholder="Apellido" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="Email" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Telefono *</Label>
                <Input id="phone" placeholder="Telefono" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="birthdate">Fecha de Nacimiento *</Label>
                <Input id="birthdate" type="date" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="membershipType">Tipo de Membresia *</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Tipo de Membresia" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="basic">Basic - $49/month</SelectItem>
                        <SelectItem value="standard">
                            Standard - $69/month
                        </SelectItem>
                        <SelectItem value="premium">
                            Premium - $89/month
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                <Input
                    id="emergencyContact"
                    placeholder="Contacto de emergencia"
                />
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                    <QrCode className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-800">
                        Generacion de QR
                    </span>
                </div>
                <p className="text-sm text-orange-700">
                    Un codigo QR unico sera generado automaticamente al momento
                    de la inscripcion del miembro para el control de acceso al
                    gimnasio.
                </p>
            </div>

            <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Registrar Afiliado
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setIsNewMemberDialogOpen(false)}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestionar Afiliados
                    </h1>
                    <p className="text-gray-600">
                        Gestión de registro de afiliados e información
                    </p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() =>
                        setIsNewMemberDialogOpen(!isNewMemberDialogOpen)
                    }
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {isNewMemberDialogOpen ? "Cancelar" : "Nuevo Afiliado"}
                </Button>
            </div>

            {/* New Member Form (shown when button is clicked) */}
            {isNewMemberDialogOpen && (
                <Card className="mb-6 border-2 border-orange-500">
                    <CardHeader>
                        <CardTitle>Registro de nuevo afiliado</CardTitle>
                        <CardDescription>
                            Llenar la información del miembro para crear un
                            nuevo miembro.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NewMemberForm />
                    </CardContent>
                </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-sm text-gray-600">Total Afiliados</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">1,189</div>
                        <p className="text-sm text-gray-600">
                            Afiliados Activos
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">43</div>
                        <p className="text-sm text-gray-600">
                            Expirando Pronto
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-sm text-gray-600">Expirados</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre, correo electrónico o ID de miembro..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                            <SelectContent>
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
                    <CardTitle>Afiliados ({filteredMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Afiliado</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Contacto
                                    </TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Miembro
                                    </TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Expiración
                                    </TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMembers.map((member) => (
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
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {member.id}
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
                                                {member.membershipType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    member.status === "Active"
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className={
                                                    member.status === "Active"
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : ""
                                                }
                                            >
                                                {member.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="flex items-center gap-1 text-sm">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(
                                                    member.expiryDate
                                                ).toLocaleDateString()}
                                            </div>
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
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <QrCode className="h-4 w-4" />
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
                            Editar Información del Afiliado
                        </DialogTitle>
                        <DialogDescription>
                            Actualizar detalles del miembro y la información de
                            la membresía.
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
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="editLastName">
                                        Apellido
                                    </Label>
                                    <Input
                                        id="editLastName"
                                        defaultValue={
                                            selectedMember.name.split(" ")[1]
                                        }
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
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editPhone">
                                    Número de Teléfono
                                </Label>
                                <Input
                                    id="editPhone"
                                    defaultValue={selectedMember.phone}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editMembershipType">
                                    Tipo de Membresía
                                </Label>
                                <Select
                                    defaultValue={selectedMember.membershipType.toLowerCase()}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basic">
                                            Básico - $49/mes
                                        </SelectItem>
                                        <SelectItem value="standard">
                                            Standard - $69/mes
                                        </SelectItem>
                                        <SelectItem value="premium">
                                            Premium - $89/mes
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                    Actualizar Afiliado
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
        </div>
    );
}
