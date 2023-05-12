import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id)
                 ? acc 
                 : [...acc, cur];
            }, prevResource.results)
        }))
    } catch (error) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count +1,
        following_id,
    }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1
    }
    : 
    profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
    }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count - 1
    }
    : profile;
}

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
}

export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
}

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
}