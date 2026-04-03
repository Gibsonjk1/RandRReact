import './Profile.css'
import type { User } from '../interfaces/User'

interface HomeProps {
  userData: User | null;
}

function Profile({ userData }: HomeProps) {
console.log('userdata', userData)
  return (
    
    <div className="profileMain">
      <h1>{userData?.profile.firstName}'s Profile</h1>
      <div className="profile">
      <div className="strengthProfile">
      <h2>Strength Profile:</h2>
      <div className='upperBodyProfile'>
      <h3>upper body</h3>
      <ul>
        {Object.entries(userData?.strength.upperBody || {}).map(([muscle, strength]) => <li key={muscle}>{`${muscle}: ${strength}`}</li>)}
      </ul>
      </div>
      <div className="coreProfile">
      <h3>core</h3>
      <ul>
        {Object.entries(userData?.strength.core || {}).map(([muscle, strength]) => <li key={muscle}>{`${muscle}: ${strength}`}</li>)}
      </ul>
      </div>
      <div className='lowerBodyProfile'>
      <h3>lower body</h3>
      <ul>
        {Object.entries(userData?.strength.lowerBody || {}).map(([muscle, strength]) => <li key={muscle}>{`${muscle}: ${strength}`}</li>)}
      </ul>
      </div>
      </div>
      
      <div className="mobilityProfile">
        <h2>Mobility Profile:</h2>
        <h3>Upper Body</h3>
        <ul>
           {Object.entries(userData?.mobility.upperBody || {}).map(([joint, mobility]) => <li key={joint}>{`${joint}: ${mobility}`}</li>)}
        </ul>
        <h3>Lower Body</h3>
        <ul>
           {Object.entries(userData?.mobility.lowerBody || {}).map(([joint, mobility]) => <li key={joint}>{`${joint}: ${mobility}`}</li>)}
        </ul>
        <h3>Balance</h3>
        <ul>
          <li>{`Balance: ${userData?.mobility.balance}`}</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Profile