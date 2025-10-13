import { useState, useEffect } from "react";
import {
    Play,
    Pause,
    SkipForward,
    Check,
    Clock,
    Dumbbell,
    Target,
    RotateCcw,
    Home,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { NavLink } from "react-router";

// Mock workout data
const workoutPlan = {
    name: "Entrenamiento de fuerza",
    duration: "45 minutos",
    exercises: [
        {
            id: 1,
            name: "Press de banca",
            sets: 3,
            reps: 12,
            weight: "135 lbs",
            restTime: 90,
            instructions:
                "Mantén tu espalda recta en la banca. Baja el barra hasta tu pecho y presiona explosivamente.",
            completed: true,
            currentSet: 3,
        },
        {
            id: 2,
            name: "Press de banca inclinada",
            sets: 3,
            reps: 10,
            weight: "45 lbs cada una",
            restTime: 90,
            instructions:
                "Coloca la banca a 45 grados. Presiona las mancuernas hacia arriba y juntas en el techo.",
            completed: true,
            currentSet: 3,
        },
        {
            id: 3,
            name: "Pull-ups",
            sets: 3,
            reps: 8,
            weight: "Peso corporal",
            restTime: 120,
            instructions:
                "Sostenerte de la barra con las manos hacia afuera. Saca la barra hasta que tu codo pase por la barra.",
            completed: false,
            currentSet: 2,
        },
        {
            id: 4,
            name: "Filamentos de barra",
            sets: 3,
            reps: 10,
            weight: "115 lbs",
            restTime: 90,
            instructions:
                "Pon la barra sobre la espalda. Baja la barra hasta el pecho y presiona explosivamente.",
            completed: false,
            currentSet: 0,
        },
        {
            id: 5,
            name: "Press de cabeza",
            sets: 3,
            reps: 8,
            weight: "95 lbs",
            restTime: 90,
            instructions:
                "Presiona la barra sobre la cabeza, mantén el core firme. Baja hasta el nivel de los hombros y repite.",
            completed: false,
            currentSet: 0,
        },
    ],
};

export default function WorkoutInProgress({ onBack }: { onBack?: () => void }) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(2); // Starting at Pull-ups
    const [isResting, setIsResting] = useState(false);
    const [restTimer, setRestTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showCompleteDialog, setShowCompleteDialog] = useState(false);

    const currentExercise = workoutPlan.exercises[currentExerciseIndex];
    const completedExercises = workoutPlan.exercises.filter(
        (ex) => ex.completed
    ).length;
    const totalExercises = workoutPlan.exercises.length;
    const progressPercentage = (completedExercises / totalExercises) * 100;

    // Timer effect
    // Timer effect
    useEffect(() => {
        let interval: number;
        if (isTimerRunning && restTimer > 0) {
            interval = window.setInterval(() => {
                setRestTimer((prev) => {
                    if (prev <= 1) {
                        setIsTimerRunning(false);
                        setIsResting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, restTimer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const startRest = () => {
        setRestTimer(currentExercise.restTime);
        setIsResting(true);
        setIsTimerRunning(true);
    };

    const completeSet = () => {
        const updatedExercises = [...workoutPlan.exercises];
        const exercise = updatedExercises[currentExerciseIndex];

        if (exercise.currentSet < exercise.sets) {
            exercise.currentSet += 1;
            if (exercise.currentSet === exercise.sets) {
                exercise.completed = true;
                // Move to next exercise if available
                if (currentExerciseIndex < workoutPlan.exercises.length - 1) {
                    setTimeout(
                        () => setCurrentExerciseIndex(currentExerciseIndex + 1),
                        1000
                    );
                } else {
                    setShowCompleteDialog(true);
                }
            } else {
                startRest();
            }
        }
    };

    const skipRest = () => {
        setIsTimerRunning(false);
        setIsResting(false);
        setRestTimer(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="sm" onClick={onBack}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Regresar
                </Button>
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        {workoutPlan.name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {workoutPlan.duration}
                    </p>
                </div>
                <NavLink to="/dashboard">
                    <Button variant="ghost" size="sm">
                        <Home className="h-4 w-4" />
                    </Button>
                </NavLink>
            </div>

            {/* Progress Overview */}
            <Card className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5" />
                            <span className="font-medium">
                                Progreso del entrenamiento
                            </span>
                        </div>
                        <span className="text-sm">
                            {completedExercises}/{totalExercises} ejercicios
                        </span>
                    </div>
                    <Progress
                        value={progressPercentage}
                        className="h-3 bg-orange-400"
                    />
                    <p className="text-sm mt-2 opacity-90">
                        {Math.round(progressPercentage)}% completado
                    </p>
                </CardContent>
            </Card>

            {/* Rest Timer (when active) */}
            {isResting && (
                <Card className="mb-6 border-2 border-blue-500 bg-blue-50">
                    <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Clock className="h-6 w-6 text-blue-600" />
                            <span className="text-lg font-semibold text-blue-800">
                                Tiempo de descanso
                            </span>
                        </div>
                        <div className="text-4xl font-bold text-blue-600 mb-4">
                            {formatTime(restTimer)}
                        </div>
                        <div className="flex gap-2 justify-center">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setIsTimerRunning(!isTimerRunning)
                                }
                                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                                {isTimerRunning ? (
                                    <Pause className="h-4 w-4 mr-2" />
                                ) : (
                                    <Play className="h-4 w-4 mr-2" />
                                )}
                                {isTimerRunning ? "Pausar" : "Reanudar"}
                            </Button>
                            <Button
                                onClick={skipRest}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                <SkipForward className="h-4 w-4 mr-2" />
                                Salta el descanso
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Current Exercise */}
            <Card className="mb-6 border-2 border-orange-500">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-orange-600">
                            {currentExercise.name}
                        </CardTitle>
                        <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-600"
                        >
                            Ejercicio {currentExerciseIndex + 1} de{" "}
                            {totalExercises}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Exercise Details */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <Target className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                            <p className="text-sm text-gray-600">Sets</p>
                            <p className="font-bold">
                                {currentExercise.currentSet}/
                                {currentExercise.sets}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <RotateCcw className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                            <p className="text-sm text-gray-600">
                                Repeticiones
                            </p>
                            <p className="font-bold">{currentExercise.reps}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <Dumbbell className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                            <p className="text-sm text-gray-600">Peso</p>
                            <p className="font-bold text-sm">
                                {currentExercise.weight}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">
                            Instrucciones:
                        </h4>
                        <p className="text-sm text-orange-700">
                            {currentExercise.instructions}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={completeSet}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3"
                            disabled={isResting}
                        >
                            <Check className="h-5 w-5 mr-2" />
                            Completar Set {currentExercise.currentSet + 1}
                        </Button>
                        {currentExerciseIndex > 0 && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setCurrentExerciseIndex(
                                        currentExerciseIndex - 1
                                    )
                                }
                                disabled={isResting}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        )}
                        {currentExerciseIndex <
                            workoutPlan.exercises.length - 1 && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setCurrentExerciseIndex(
                                        currentExerciseIndex + 1
                                    )
                                }
                                disabled={isResting}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Exercise List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Lista de Ejercicios
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {workoutPlan.exercises.map((exercise, index) => (
                            <div
                                key={exercise.id}
                                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                    index === currentExerciseIndex
                                        ? "border-orange-500 bg-orange-50"
                                        : exercise.completed
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                                onClick={() =>
                                    !isResting && setCurrentExerciseIndex(index)
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            exercise.completed
                                                ? "bg-green-500 text-white"
                                                : index === currentExerciseIndex
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {exercise.completed ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <span className="text-sm font-bold">
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {exercise.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {exercise.sets} sets ×{" "}
                                            {exercise.reps} reps
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">
                                        {exercise.currentSet}/{exercise.sets}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {exercise.weight}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Workout Complete Dialog */}
            <Dialog
                open={showCompleteDialog}
                onOpenChange={setShowCompleteDialog}
            >
                <DialogContent className="text-center">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-green-600">
                            Entrenamiento Completado! 🎉
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Excelente trabajo completando tu {workoutPlan.name}{" "}
                            entrenamiento!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-green-800 font-medium">
                                Resumen del Entrenamiento
                            </p>
                            <p className="text-green-700">
                                {totalExercises} ejercicios completados
                            </p>
                            <p className="text-green-700">
                                Duración estimada: {workoutPlan.duration}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                Guardar Entrenamiento
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowCompleteDialog(false)}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
