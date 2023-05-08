import React, { useEffect, useState } from 'react'
import appStyles from "../../App.module.css";
import Container from 'react-bootstrap/Container';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';

const PopularProfiles = () => {

    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const {popularProfiles} = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {
                console.log(err)
            }
        };
        handleMount();
    }, [currentUser]);

  return (
    <Container className={`${appStyles.Content} mb-3`}>
        {popularProfiles.results.length ? (
            <>
                <h4 className='text-center'>Follow these Popular Profiles</h4>
                {popularProfiles.results.slice(0,5).map((profile) => (
                    <p key={profile.id}>{profile.owner}</p>
                ))}
            </>
            
        ) : (
            <Asset spinner />
        )}
        
    </Container>

  )
}

export default PopularProfiles