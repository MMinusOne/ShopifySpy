import axios from 'axios';

export const LEMONSQUEEZY_ENDPOINT = 'https://api.lemonsqueezy.com/v1/'


export const lemonSqueezyApiInstance = axios.create({
    baseURL: LEMONSQUEEZY_ENDPOINT,
    headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
    }
})