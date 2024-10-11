
export const maxDuration = 60;
import axios from 'axios';
import isSpyable from './IsSpyable';

export default async function fetchProducts(url: string, setProgress: (progress: { page: number, items: number }) => void) {
    const isValid = isSpyable(url);
    if (!isValid) {
        return null;
    }
    let page = 0;
    const data = [];

    while (true) {
        const { data: requestedData } = await axios.get(`${url}/products.json/?limit=250&page=${page}`);
        if (requestedData?.products?.length > 0) {
            data.push(...requestedData.products)
            setProgress({ page, items: data.length })
            console.log(page);
        } else {
            return data
            break;
        }
        console.log(page);
        page++
    }
}