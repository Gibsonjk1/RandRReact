import './footer.css';
import exerciseIcon from '../assets/exercise.png';
import { useNavigate } from 'react-router-dom';



export default function Footer() {
    const navigate = useNavigate();
    return (
        <div className="footer">
            <button onClick={() => navigate('/exercise')}>
                <img src={exerciseIcon} alt="Exercise" />
            </button>
        </div>
    );
}