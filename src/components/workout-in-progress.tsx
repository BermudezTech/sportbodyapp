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

// Mock workout data
const workoutPlan = {
    name: "Upper Body Strength",
    duration: "45 minutes",
    exercises: [
        {
            id: 1,
            name: "Bench Press",
            sets: 3,
            reps: 12,
            weight: "135 lbs",
            restTime: 90,
            instructions:
                "Keep your back flat on the bench. Lower the bar to your chest and press up explosively.",
            completed: true,
            currentSet: 3,
        },
        {
            id: 2,
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: 10,
            weight: "45 lbs each",
            restTime: 90,
            instructions:
                "Set bench to 45-degree incline. Press dumbbells up and together at the top.",
            completed: true,
            currentSet: 3,
        },
        {
            id: 3,
            name: "Pull-ups",
            sets: 3,
            reps: 8,
            weight: "Body weight",
            restTime: 120,
            instructions:
                "Hang from bar with palms facing away. Pull up until chin clears the bar.",
            completed: false,
            currentSet: 2,
        },
        {
            id: 4,
            name: "Barbell Rows",
            sets: 3,
            reps: 10,
            weight: "115 lbs",
            restTime: 90,
            instructions:
                "Bend at hips, keep back straight. Pull bar to lower chest, squeeze shoulder blades.",
            completed: false,
            currentSet: 0,
        },
        {
            id: 5,
            name: "Overhead Press",
            sets: 3,
            reps: 8,
            weight: "95 lbs",
            restTime: 90,
            instructions:
                "Press bar overhead, keep core tight. Lower to shoulder level and repeat.",
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
                    Back
                </Button>
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        {workoutPlan.name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {workoutPlan.duration}
                    </p>
                </div>
                <Button variant="ghost" size="sm">
                    <Home className="h-4 w-4" />
                </Button>
            </div>

            {/* Progress Overview */}
            <Card className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5" />
                            <span className="font-medium">
                                Workout Progress
                            </span>
                        </div>
                        <span className="text-sm">
                            {completedExercises}/{totalExercises} exercises
                        </span>
                    </div>
                    <Progress
                        value={progressPercentage}
                        className="h-3 bg-orange-400"
                    />
                    <p className="text-sm mt-2 opacity-90">
                        {Math.round(progressPercentage)}% complete
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
                                Rest Time
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
                                {isTimerRunning ? "Pause" : "Resume"}
                            </Button>
                            <Button
                                onClick={skipRest}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                <SkipForward className="h-4 w-4 mr-2" />
                                Skip Rest
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
                            Exercise {currentExerciseIndex + 1} of{" "}
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
                            <p className="text-sm text-gray-600">Reps</p>
                            <p className="font-bold">{currentExercise.reps}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <Dumbbell className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                            <p className="text-sm text-gray-600">Weight</p>
                            <p className="font-bold text-sm">
                                {currentExercise.weight}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">
                            Instructions:
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
                            Complete Set {currentExercise.currentSet + 1}
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
                    <CardTitle className="text-lg">Exercise List</CardTitle>
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
                            Workout Complete! 🎉
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Great job completing your {workoutPlan.name}{" "}
                            workout!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-green-800 font-medium">
                                Workout Summary
                            </p>
                            <p className="text-green-700">
                                {totalExercises} exercises completed
                            </p>
                            <p className="text-green-700">
                                Estimated duration: {workoutPlan.duration}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                Save Workout
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowCompleteDialog(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
