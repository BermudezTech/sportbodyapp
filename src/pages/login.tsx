import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Dumbbell, User, Lock } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";

// Mock user credentials for demo
const mockUsers = {
    "admin@sportbodygym.com": {
        password: "admin123",
        role: "Administrator",
        name: "Alex Rodriguez",
    },
    "receptionist@sportbodygym.com": {
        password: "reception123",
        role: "Receptionist",
        name: "Sarah Wilson",
    },
    "doctor@sportbodygym.com": {
        password: "medical123",
        role: "Medical Staff",
        name: "Dr. Mike Johnson",
    },
    "member@sportbodygym.com": {
        password: "member123",
        role: "Member",
        name: "John Doe",
    },
};

// Error types for different scenarios
const errorMessages = {
    invalidCredentials: {
        title: "Invalid Credentials",
        message:
            "The email or password you entered is incorrect. Please check your credentials and try again.",
        type: "user",
    },
    serverError: {
        title: "Server Error",
        message:
            "We're experiencing technical difficulties. Please try again in a few moments or contact support if the problem persists.",
        type: "server",
    },
    networkError: {
        title: "Connection Error",
        message:
            "Unable to connect to the server. Please check your internet connection and try again.",
        type: "network",
    },
    accountLocked: {
        title: "Account Locked",
        message:
            "Your account has been temporarily locked due to multiple failed login attempts. Please contact support or try again in 30 minutes.",
        type: "security",
    },
    maintenanceMode: {
        title: "System Maintenance",
        message:
            "The system is currently under maintenance. Please try again later or contact support for more information.",
        type: "maintenance",
    },
};

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error when user starts typing
        if (error) {
            setError(null);
        }
    };

    const simulateRandomError = () => {
        const errorTypes = Object.keys(errorMessages);
        const randomError =
            errorTypes[Math.floor(Math.random() * errorTypes.length)];
        return errorMessages[randomError as keyof typeof errorMessages];
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            // Simulate random server errors (20% chance)
            if (Math.random() < 0.2) {
                const randomError = simulateRandomError();
                setError(randomError);
                setShowErrorModal(true);
                setIsLoading(false);
                return;
            }

            // Check credentials
            const user = mockUsers[formData.email as keyof typeof mockUsers];

            if (!user || user.password !== formData.password) {
                setError(errorMessages.invalidCredentials);
                setShowErrorModal(true);
                setIsLoading(false);
                return;
            }

            // Successful login
            console.log("Login successful:", {
                email: formData.email,
                role: user.role,
            });

            // Store user info (in real app, this would be handled by auth system)
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: formData.email,
                    role: user.role,
                    name: user.name,
                })
            );

            // Redirect to dashboard
            navigate("/");
        } catch (error) {
            setError(errorMessages.serverError);
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorIcon = (errorType: string) => {
        switch (errorType) {
            case "server":
            case "network":
                return "🔧";
            case "security":
                return "🔒";
            case "maintenance":
                return "⚠️";
            default:
                return "❌";
        }
    };

    const fillDemoCredentials = (role: string) => {
        const credentials = {
            admin: { email: "admin@sportbodygym.com", password: "admin123" },
            receptionist: {
                email: "receptionist@sportbodygym.com",
                password: "reception123",
            },
            medical: {
                email: "doctor@sportbodygym.com",
                password: "medical123",
            },
            member: { email: "member@sportbodygym.com", password: "member123" },
        };

        const cred = credentials[role as keyof typeof credentials];
        setFormData((prev) => ({
            ...prev,
            email: cred.email,
            password: cred.password,
        }));
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
                        Management & Access Control System
                    </p>
                </div>

                {/* Login Form */}
                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-center">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center">
                            Sign in to access your gym management dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className="pl-10 pr-10"
                                        required
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                "rememberMe",
                                                checked as boolean
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600"
                                    >
                                        Remember me
                                    </Label>
                                </div>
                                <Button
                                    variant="link"
                                    className="px-0 text-orange-600 hover:text-orange-700"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 pt-6 border-t">
                            <p className="text-sm text-gray-600 text-center mb-3">
                                Demo Credentials:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemoCredentials("admin")}
                                    className="text-xs"
                                >
                                    Administrator
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        fillDemoCredentials("receptionist")
                                    }
                                    className="text-xs"
                                >
                                    Receptionist
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        fillDemoCredentials("medical")
                                    }
                                    className="text-xs"
                                >
                                    Medical Staff
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        fillDemoCredentials("member")
                                    }
                                    className="text-xs"
                                >
                                    Member
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>© 2024 Sport Body Gym. All rights reserved.</p>
                    <p className="mt-1">
                        Need help? Contact{" "}
                        <Button
                            variant="link"
                            className="px-1 text-orange-600 hover:text-orange-700 text-sm"
                        >
                            support@sportbodygym.com
                        </Button>
                    </p>
                </div>
            </div>

            {/* Error Modal */}
            <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl">
                                {error && getErrorIcon(error.type)}
                            </div>
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
                            Try Again
                        </Button>
                        {error?.type === "server" ||
                        error?.type === "network" ? (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowErrorModal(false);
                                    // In real app, this would open support contact
                                    alert(
                                        "Support contact: support@sportbodygym.com"
                                    );
                                }}
                            >
                                Contact Support
                            </Button>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
