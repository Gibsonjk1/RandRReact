export default function exerciseConstructor(exerciseData: any[], userData: any) {

    const focusRegion = userData ? userData.activity.nextSessionFocus : "upper_body";
    console.log(`Focus Region: ${focusRegion}`);

    // 1. Filter by body region
    const exercisesInRegion = exerciseData.filter((item: any) => {
        return item.bodyRegion === focusRegion;
    });

    // Helper to get user strength from nested structure
    function getUserStrength(muscleId: string): number {
        if (!userData?.strength) return 0;

        const { upperBody, core, lowerBody } = userData.strength;
        console.log(`Getting strength for muscleId: ${muscleId}, UpperBody: ${upperBody?.[muscleId]}, Core: ${core?.[muscleId]}, LowerBody: ${lowerBody?.[muscleId]}`);
        return (
            upperBody?.[muscleId] ??
            core?.[muscleId] ??
            lowerBody?.[muscleId] ??
            0
        );
    }

    // 2. Filter by strength profile
    const strengthMatchedExercises = exercisesInRegion.filter((exercise: any) => {

        if (!exercise.strengthProfile || exercise.strengthProfile.length === 0) {
            return true; // allow if no strength profile defined
        }

        return exercise.strengthProfile.some((muscle: any) => {
            const userStrength = getUserStrength(muscle.muscleId);

            return (
                userStrength >= muscle.minStrength &&
                userStrength <= muscle.maxStrength
            );
        });
    });

    const exerciseSessionLength: number =
        userData?.preferences?.workoutDurationMinutes ?? 30;

    function shuffleArray<T>(arr: T[]): T[] {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const shuffledExercises = shuffleArray(strengthMatchedExercises);

    // limit to available exercises if fewer than requested
    const randomExercises = shuffledExercises.slice(
        0,
        Math.min(exerciseSessionLength, shuffledExercises.length)
    );

    const finalExerciseList = randomExercises.map((exercise: any) => {
        const primaryMuscles = exercise.strengthProfile
            ? exercise.strengthProfile.filter((muscle: any) => muscle.role === "primary")
            : [];
            let strengthProfile = 0;
            //calculate user strength for each primary muscle
            primaryMuscles.forEach((muscle: any) => {
                const userStrength = getUserStrength(muscle.muscleId);
                const minStrength = muscle.minStrength;
                const maxStrength = muscle.maxStrength;
                strengthProfile += (userStrength - minStrength) / (maxStrength - minStrength);
            });
            const difficultyRatio = strengthProfile / primaryMuscles.length; // average strength profile across primary muscles
            console.log(`Exercise: ${exercise.name}, Strength Profile: ${strengthProfile.toFixed(2)}, Difficulty Ratio: ${difficultyRatio.toFixed(2)}`);
            const reps = Math.round((10 * difficultyRatio)+1.65); 
            exercise.reps = Math.max(reps, 1); // ensure at least 1 rep
            return exercise;
        });

console.log("Final Exercise List:", finalExerciseList);
    const exerciseSession =
        "<ul>" +
        finalExerciseList
            .map((exercise: any) => {
                return `<li>Exercise: ${exercise.name} Reps: ${exercise.reps}</li>`;
            })
            .join("") +
        "</ul>";

    return exerciseSession;
}
