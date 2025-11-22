import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <div className="text-center mt-6 text-sm text-gray-500">
            <p>
                © 2025 Sport Body Gym. Desarrollada por: José Bermúdez. Todos
                los derechos reservados.
            </p>
            <p className="mt-1">
                Necesita ayuda?{" "}
                <Button
                    variant="link"
                    className="px-1 text-orange-600 hover:text-orange-700 text-sm"
                >
                    support@sportbodygym.com
                </Button>
            </p>
        </div>
    );
}
