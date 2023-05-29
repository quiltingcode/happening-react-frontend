import { rest } from "msw";

const baseURL = "https://happening-api-kelz.herokuapp.com/"

export const handlers = [
    // mocks a request to get the logged in user
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 2,
            "username": "Laura",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 2,
            "profile_image": "https://res.cloudinary.com/dkolsfjkx/image/upload/v1/media/images/20221105_220144_y2vgly"
            })
        );
    }),
    // mocks a request to log a user out
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    // mocks a request for an event
    rest.get(`${baseURL}events/`, (req, res, ctx) => {
        return res(ctx.json({
            "id": 42,
            "owner": "CafeHabana",
            "created_at": "25 May 2023",
            "updated_at": "25 May 2023",
            "title": "Kids Disco",
            "description": "kids love to dance? Then bring them along",
            "image": "https://res.cloudinary.com/dkolsfjkx/image/upload/v1/media/images/flor-disco_kwjol6",
            "event_date": "2023-05-19",
            "tags": [
            "disco, dance, kids"
            ],
            "category": "Kids",
            "is_owner": false,
            "profile_id": 8,
            "profile_image": "https://res.cloudinary.com/dkolsfjkx/image/upload/v1/media/images/flor_xqkgnt",
            "image_filter": "Normal",
            "interested_id": null,
            "going_id": null,
            "comments_count": 0,
            "interested_count": 0,
            "going_count": 0,
            "review_count": 0,
            "average_rating": null,
            "review_id": null
            })
        );
    }),
    // mocks a request for a profile
    rest.get(`${baseURL}profiles/7`, (req, res, ctx) => {
        return res(ctx.json({
            "id": 7,
            "owner": "Sarah",
            "created_at": "11 May 2023",
            "updated_at": "11 May 2023",
            "name": "",
            "bio": "",
            "website": "",
            "instagram_link": "",
            "facebook_link": "",
            "phone_number": null,
            "profile_pic": "https://res.cloudinary.com/dkolsfjkx/image/upload/v1/media/../default-avatar_qvwzg2",
            "is_owner": false,
            "email": "",
            "following_id": null,
            "events_count": 0,
            "followers_count": 2,
            "following_count": 0,
            "going_count": 0
            })
        );
    }),
    // mocks a request for a review
    rest.get(`${baseURL}reviews`, (req, res, ctx) => {
        return res(ctx.json({
            "id": 37,
            "owner": "CafeHabana",
            "created_at": "3 days, 1 hour ago",
            "updated_at": "3 days ago",
            "event": 26,
            "review": "boring. Yawned the whole way through",
            "rating": 0,
            "is_owner": false,
            "profile_id": 8,
            "profile_image": "https://res.cloudinary.com/dkolsfjkx/image/upload/v1/media/images/flor_xqkgnt"
            })
        );
    }),
];