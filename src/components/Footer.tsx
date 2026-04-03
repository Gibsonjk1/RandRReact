import './footer.css';
import exerciseIcon from '../assets/exercise.png';
import { useNavigate } from 'react-router-dom';
import { House, PersonCircle } from 'react-bootstrap-icons';




export default function Footer() {
    const navigate = useNavigate();
    return (
        <div className="footer">
            <button onClick={() => navigate('/')}>
                <House />
            </button>
            <button onClick={() => navigate('/exercise')}>
                <img src={exerciseIcon} alt="Exercise" />
            </button>
            <button onClick={() => navigate('/profile')}>
                <PersonCircle />
            </button>
        </div>
    );
}