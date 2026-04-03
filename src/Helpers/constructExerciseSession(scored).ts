export default function exerciseConstructor(exerciseData: any[], userData: any) {

        const focusRegion = userData ? userData.activity.nextSessionFocus : "upper_body";
          const exerciseSessionLength: number =
        userData?.preferences?.workoutDurationMinutes ?? 10;

    // 1. Filter by body region
    const exercisesInRegion = exerciseData.filter((item: any) => {
        return item.bodyRegion === focusRegion;
    });

    const ROLE_WEIGHTS = {
      primary: 1.0,
      secondary: 0.7,
      stabilizer: 0.4
    };

    function getRoleWeight(role: string | undefined): number {
      const normalizedRole = role?.toString().trim().toLowerCase();
      return ROLE_WEIGHTS[normalizedRole as keyof typeof ROLE_WEIGHTS] ?? 0.5;
    }

    exercisesInRegion.forEach(exercise => {
        exercise.mobilityScore = scoreMobility(exercise, userData?.mobility);
        exercise.strengthScore = scoreExercise(exercise);
        exercise.totalScore = 0.6 * exercise.strengthScore + 0.4 * exercise.mobilityScore;
    });

function scoreMuscle(user: number, min: number, max: number): number {
  if (user < min) {
    return user / min; // underqualified → low score
  }
  if (user > max) {
    return max / user; // overqualified → diminishing returns
  }
  return 1; // perfect match
}

function getUserStrength(muscleId: string): number {
        if (!userData?.strength) return 0;

        const { upperBody, core, lowerBody } = userData.strength;

        return (
            upperBody?.[muscleId] ??
            core?.[muscleId] ??
            lowerBody?.[muscleId] ??
            0
        );
    }

function scoreExercise(exercise: any): number {
  if (!exercise.strengthProfile) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  exercise.strengthProfile.forEach((muscle: any) => {
    const userStrength = getUserStrength(muscle.muscleId);

    const muscleScore = scoreMuscle(
      userStrength,
      muscle.minStrength,
      muscle.maxStrength
    );

    const weight = getRoleWeight(muscle.role);

    totalScore += muscleScore * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

function scoreMobility(exercise: any, userMobility: any): number {
  if (!exercise.mobility?.rangeOfMotion) return 1;

  let score = 0;
  let count = 0;

  Object.entries(exercise.mobility.rangeOfMotion).forEach(
    ([joint, required]: any) => {
      const userValue = userMobility?.[joint] ?? 0;

      score += Math.min(userValue / required, 1);
      count++;
    }
  );

  return count > 0 ? score / count : 1;
}

function totalScore(exercise: any, userData: any): number {
  const strengthScore = scoreExercise(exercise);
  const mobilityScore = scoreMobility(exercise, userData.mobility);

  return (strengthScore * 0.7) + (mobilityScore * 0.3);
}


const scoredExercises = exercisesInRegion.map(exercise => ({
  exercise,
  score: totalScore(exercise, userData)
}));

function weightedShuffle(scored: any[]) {
  return scored
    .map(e => ({
      ...e,
      randomScore: e.score * (0.8 + Math.random() * 0.4)
    }))
    .sort((a, b) => b.randomScore - a.randomScore);
}
const finalExercises = weightedShuffle(scoredExercises)
  .slice(0, exerciseSessionLength)
  .map(e => e.exercise);

    console.log("Final Exercises:", finalExercises);


    const exerciseSession =
        "<ul>" +
        finalExercises
            .map((exercise: any) => {
                console.log("Selected exercise:", exercise);
                return `<li>Exercise: ${exercise.name} Reps: ${exercise.reps? exercise.reps : 'N/A'}</li>`;
            })
            .join("") +
        "</ul>";
    return exerciseSession;
}