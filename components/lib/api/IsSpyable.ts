"use server";

import axios from 'axios';

export default async function isSpyable(url: string) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        if (url.includes('myshopify.com')) {
            return true;
        }

        const shopifyIndicators = [
            /shopify\.com/i,
            /cdn\.shopify\.com/i,
            /Shopify\.Buy\.SDK/i,
            /var Shopify =/i,
            /{{ '.*' | asset_url }}/i,
        ];

        return shopifyIndicators.some(pattern => pattern.test(html));
    } catch (error) {
        return false;
    }
}