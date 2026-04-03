export default function exerciseConstructor(exerciseData: any[], userData: any) {
    const allExercisesInCategory = exerciseData.filter((item: any) => {
        return item.bodyRegion === (userData ? userData?.activity.nextSessionFocus : "upper_body");
    });
    const exerciseListLength: number = allExercisesInCategory.length;
    console.log("Exercises in category:", exerciseListLength);
    const exerciseSessionLength: number = userData ? userData.preferences.workoutDurationMinutes : 30;

    function shuffleArray<T>(arr: T[]): T[] {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    const shuffledExercises = shuffleArray(allExercisesInCategory);
    const randomExercises = shuffledExercises.slice(0, exerciseSessionLength);
    const exerciseSession = "<ul>" + randomExercises.map((exercise: any) => {
        console.log("Selected exercise:", exercise);
        return `<li>${exercise.name}</li>`;
    }).join("") + "</ul>";
    
return exerciseSession;
};