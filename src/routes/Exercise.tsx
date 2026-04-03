import type { User } from '../interfaces/User';
import './exercise.css';
import { useState, useEffect } from 'react';
import exerciseConstructor from '../Helpers/constructExerciseSession';
import exerciseHeader from '../assets/exerciseHeader.jpg';


interface HomeProps {
  userData: User | null;
}



export default function Exercise({ userData }: HomeProps) {
  function ExerciseList() {
    const [exercises, setExercises] = useState<string>('Loading exercises...');
    useEffect(() => {
        const fetchExercises = async () => {
            const res = await fetch("/api/exercise");
            const exerciseData = await res.json();
          const exerciseSession = exerciseConstructor(exerciseData, userData);
          console.log(exerciseSession);

            setExercises(exerciseSession);
        }
        fetchExercises();
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: exercises }} />;
}
    return (
        <div className='exercise'>
            <h1>Exercise</h1>
            <div className='exerciseHeader'>
                <img src={exerciseHeader} alt="Exercise Header" />
            </div>
            <ExerciseList />
        </div>
    );
}