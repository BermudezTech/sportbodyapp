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

export default function MembersView() {
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

    const [members, setMembers] = useState<any>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await fetch("http://localhost:3000/api/afiliados");
            let data = await response.json();
            data = data.map((member: any) => ({
                id: member.id_afiliado,
                name: `${member.Usuario.nombre} ${member.Usuario.apellido}`,
                email: member.Usuario.correo,
                phone: member.Usuario.telefono,
                birthdate: member.Usuario.fecha_nacimiento,
                membershipType: member.tipo_membresia,
                status: "Active",
                joinDate: member.fecha_afiliacion,
                expiryDate: member.fecha_vencimiento,
                qrCode: member.qr_code,
                avatar: "/placeholder.svg?height=40&width=40",
            }));
            setMembers(data);
        };
        fetchMembers();
    }, [isNewMemberDialogOpen, isEditDialogOpen, isDeleteDialogOpen]);

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
                        Ver Afiliados
                    </h1>
                    <p className="text-gray-600">
                        Vista de afiliados e información
                    </p>
                </div>

                {/* <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() =>
                        setIsNewMemberDialogOpen(!isNewMemberDialogOpen)
                    }
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {isNewMemberDialogOpen ? "Cancelar" : "Nuevo Afiliado"}
                </Button> */}
            </div>
            {alertSucess.show && (
                <div className="bg-green-500 text-white p-4 w-full">
                    {alertSucess.message}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {members.length}
                        </div>
                        <p className="text-sm text-gray-600">Total Afiliados</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {members.length}
                        </div>
                        <p className="text-sm text-gray-600">
                            Afiliados Activos
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {members.length}
                        </div>
                        <p className="text-sm text-gray-600">
                            Expirando Pronto
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                            {members.length}
                        </div>
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
        </div>
    );
}
