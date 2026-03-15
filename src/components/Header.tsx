import './Header.css'
import {useNavigate} from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header" onClick={() => navigate('/')}>
      <h1>Mountain Man</h1>
      <h2>Fitness</h2>
    </header>
  )
}

export default Header