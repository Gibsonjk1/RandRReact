import './Header.css'
import {useNavigate} from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header" onClick={() => navigate('/')}>
      <h1>Ripped and Rugged</h1>
    </header>
  )
}

export default Header