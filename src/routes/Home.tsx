import './Home.css'
import type { User } from '../interfaces/User'
import theMountain from '../assets/theMountain.jpg'

interface HomeProps {
  userData: User | null;
}

function Home({ userData }: HomeProps) {
  const name: string = userData ? userData.profile.firstName : "Random Customer";
  return (
    <div className="home">
      <h1>Welcome to the Mountain</h1>
      <h2>{name}</h2>
      <img src={theMountain} alt="The Mountain" />
      <p>Discover your fitness potential with our personalized workout plans.</p>
    </div>
  );
}

export default Home