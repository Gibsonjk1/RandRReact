import './Home.css'

function Home() {
    const name: string = "GET NAME"
  return (
    <div className="home">
      <h1>Welcome to RandR</h1>
      <h2>{name}</h2>
      <p>Discover your fitness potential with our personalized workout plans.</p>
    </div>
  )
}

export default Home