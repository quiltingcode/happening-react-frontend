import appStyles from "../../App.module.css";
import Container from 'react-bootstrap/Container';
import Asset from '../../components/Asset';
import Profile from './Profile';
import { useProfileData } from '../../contexts/ProfileDataContext';

const PopularProfiles = () => {

    const { popularProfiles } = useProfileData();

  return (
    <Container className={`${appStyles.Content} mb-3`}>
        {popularProfiles.results.length ? (
            <>
                <h4 className='text-center'>Follow these Popular Profiles</h4>
                {popularProfiles.results.slice(0,6).map((profile) => (
                    <Container key={profile.id} className='d-inline justify-content-center align-items-center'>
                        <Profile profile={profile} mobile />
                    </Container>
                    
                ))}
            </>
            
        ) : (
            <Asset spinner />
        )}
        
    </Container>

  )
}

export default PopularProfiles