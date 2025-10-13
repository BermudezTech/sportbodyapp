import { useState } from "react";
import {
    Search,
    Plus,
    Download,
    Eye,
    CreditCard,
    AlertTriangle,
    Calendar,
    DollarSign,
    Filter,
    Receipt,
    User,
    Clock,
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
import { Textarea } from "@/components/ui/textarea";

// Mock payment data
const mockPayments = [
    {
        id: "PAY001",
        memberId: "M001",
        memberName: "John Doe",
        membershipType: "Premium",
        amount: 89,
        dueDate: "2024-12-01",
        paidDate: "2024-11-28",
        status: "Pagado",
        method: "Tarjeta de credito",
        invoiceNumber: "INV-2024-001",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "PAY002",
        memberId: "M002",
        memberName: "Sarah Wilson",
        membershipType: "Basic",
        amount: 49,
        dueDate: "2024-12-15",
        paidDate: null,
        status: "Pendiente",
        method: null,
        invoiceNumber: "INV-2024-002",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "PAY003",
        memberId: "M003",
        memberName: "Mike Johnson",
        membershipType: "Premium",
        amount: 89,
        dueDate: "2024-12-20",
        paidDate: null,
        status: "Pendiente",
        method: null,
        invoiceNumber: "INV-2024-003",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "PAY004",
        memberId: "M004",
        memberName: "Emma Davis",
        membershipType: "Standard",
        amount: 69,
        dueDate: "2024-11-30",
        paidDate: "2024-11-29",
        status: "Pagado",
        method: "Transferencia bancaria",
        invoiceNumber: "INV-2024-004",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "PAY005",
        memberId: "M005",
        memberName: "Alex Rodriguez",
        membershipType: "Premium",
        amount: 89,
        dueDate: "2024-12-25",
        paidDate: null,
        status: "Pendiente",
        method: null,
        invoiceNumber: "INV-2024-005",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

export default function BillingPayment() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);

    const filteredPayments = mockPayments.filter((payment) => {
        const matchesSearch =
            payment.memberName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            payment.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.invoiceNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" ||
            payment.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const totalRevenue = mockPayments
        .filter((p) => p.status === "Pagado")
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = mockPayments
        .filter((p) => p.status === "Pendiente")
        .reduce((sum, p) => sum + p.amount, 0);
    const overdueAmount = mockPayments
        .filter((p) => p.status === "Atrasado")
        .reduce((sum, p) => sum + p.amount, 0);
    const overdueCount = mockPayments.filter(
        (p) => p.status === "Atrasado"
    ).length;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pagado":
                return "bg-green-500 hover:bg-green-600";
            case "pendiente":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "atrasado":
                return "bg-red-500 hover:bg-red-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    const NewPaymentForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="paymentMember">Seleccionar Afiliado *</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar Afiliado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="M001">
                            John Doe (M001) - Premium
                        </SelectItem>
                        <SelectItem value="M002">
                            Sarah Wilson (M002) - Basic
                        </SelectItem>
                        <SelectItem value="M003">
                            Mike Johnson (M003) - Premium
                        </SelectItem>
                        <SelectItem value="M004">
                            Emma Davis (M004) - Standard
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="paymentAmount">Monto *</Label>
                    <Input
                        id="paymentAmount"
                        type="number"
                        placeholder="0.00"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Metodo de pago *</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar metodo de pago" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Efectivo</SelectItem>
                            <SelectItem value="credit">
                                Tarjeta de credito
                            </SelectItem>
                            <SelectItem value="debit">
                                Tarjeta de debito
                            </SelectItem>
                            <SelectItem value="transfer">
                                Transferencia bancaria
                            </SelectItem>
                            <SelectItem value="check">Cheque</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="paymentDate">Fecha de pago *</Label>
                <Input
                    id="paymentDate"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="paymentNotes">Notas (Opcional)</Label>
                <Textarea
                    id="paymentNotes"
                    placeholder="Notas adicionales..."
                />
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                    <Receipt className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-800">
                        Generacion de factura
                    </span>
                </div>
                <p className="text-sm text-orange-700">
                    Una factura/recepcion se generara automaticamente y puede
                    ser impresa o enviada por correo electronico al miembro.
                </p>
            </div>

            <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Procesar Pago
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setIsNewPaymentDialogOpen(false)}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );

    const ReceiptView = ({ payment }: { payment: any }) => (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold text-orange-600">
                    Sport Body Gym
                </h2>
                <p className="text-gray-600">Recibo de pago</p>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-medium text-gray-600">
                        Numero de Recibo:
                    </p>
                    <p className="font-bold">{payment.invoiceNumber}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">Fecha:</p>
                    <p className="font-bold">
                        {payment.paidDate || new Date().toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">ID de miembro:</p>
                    <p className="font-bold">{payment.memberId}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-600">Metodo de pago:</p>
                    <p className="font-bold">{payment.method || "Cash"}</p>
                </div>
            </div>

            {/* Member Details */}
            <div className="border-t pt-4">
                <h3 className="font-medium text-gray-600 mb-2">
                    Informacion del miembro:
                </h3>
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={payment.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                            {payment.memberName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{payment.memberName}</p>
                        <p className="text-sm text-gray-600">
                            {payment.membershipType} Miembro
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Details */}
            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                        Pago de membresia ({payment.membershipType}):
                    </span>
                    <span className="font-bold">${payment.amount}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-orange-600">${payment.amount}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm text-gray-600">
                <p>Gracias por su pago!</p>
                <p>Para preguntas, contactenos en (555) 123-4567</p>
            </div>

            <div className="flex gap-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                </Button>
                <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Imprimir Recibo
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
                        Pagos & Facturación
                    </h1>
                    <p className="text-gray-600">
                        Gestione los pagos y facturación de los miembros
                    </p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() =>
                        setIsNewPaymentDialogOpen(!isNewPaymentDialogOpen)
                    }
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {isNewPaymentDialogOpen ? "Cancelar" : "Nuevo Pago"}
                </Button>
            </div>

            {/* New Payment Form (shown when button is clicked) */}
            {isNewPaymentDialogOpen && (
                <Card className="mb-6 border-2 border-orange-500">
                    <CardHeader>
                        <CardTitle>Procesar nuevo pago</CardTitle>
                        <CardDescription>
                            Registre un nuevo pago y genere un recibo para el
                            miembro.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NewPaymentForm />
                    </CardContent>
                </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${totalRevenue}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Total de ingresos
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    ${pendingAmount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Pagos pendientes
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-red-600">
                                    ${overdueAmount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Pagos vencidos
                                </p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {overdueCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Cuentas vencidas
                                </p>
                            </div>
                            <User className="h-8 w-8 text-orange-500" />
                        </div>
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
                                placeholder="Buscar por nombre, ID o número de factura..."
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
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="paid">Pagados</SelectItem>
                                <SelectItem value="pending">
                                    Pendientes
                                </SelectItem>
                                <SelectItem value="overdue">
                                    Vencidos
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

            {/* Payments Table */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Registros de pagos ({filteredPayments.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Afiliado</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Membresía
                                    </TableHead>
                                    <TableHead>Importe</TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Fecha de vencimiento
                                    </TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Metodo
                                    </TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.map((payment) => (
                                    <TableRow
                                        key={payment.id}
                                        className={
                                            payment.status === "Overdue"
                                                ? "bg-red-50"
                                                : ""
                                        }
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            payment.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {payment.memberName
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {payment.memberName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {payment.memberId}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="outline">
                                                {payment.membershipType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-bold">
                                                ${payment.amount}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="flex items-center gap-1 text-sm">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(
                                                    payment.dueDate
                                                ).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={getStatusColor(
                                                    payment.status
                                                )}
                                            >
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm">
                                                {payment.method || "-"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedPayment(
                                                            payment
                                                        );
                                                        setIsReceiptDialogOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Receipt className="h-4 w-4" />
                                                </Button>
                                                {payment.status !== "Paid" && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-green-600"
                                                    >
                                                        <CreditCard className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Receipt Dialog */}
            <Dialog
                open={isReceiptDialogOpen}
                onOpenChange={setIsReceiptDialogOpen}
            >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Recibo de pago</DialogTitle>
                        <DialogDescription>
                            Detalles del recibo para{" "}
                            {selectedPayment?.memberName}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPayment && (
                        <ReceiptView payment={selectedPayment} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
