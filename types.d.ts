export declare interface Product {
    id: string;
    title: string;
    handle: string;
    body_html: string;
    published_at: string,
    created_at: string,
    updated_at: string,
    vendor: string,
    product_type: string,
    tags: string[],
    variants: ProductVariant[],
    images: ProductImage[],
    options: ProductOption[]
}

export declare interface ProductVariant {
    id: number;
    title: string;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    sku: string;
    requires_shipping: boolean;
    taxable: boolean;
    featured_image: ProductImage | null;
    available: boolean;
    price: string;
    grams: number;
    compare_at_price: string;
    position: number;
    product_id: number;
    created_at: string;
    updated_at: string;
}

export declare interface ProductImage {
    id: number,
    created_at: string,
    position: number,
    updated_at: string,
    product_id: number,
    variant_ids: number[],
    src: string,
    width: number,
    height: number
}

export declare interface ProductOption {
    name: string,
    position: number,
    values: string[]
}

export declare interface AnalysisState {
    websiteUrl: string | undefined;
    setWebsiteUrl: (url: string) => void;
    products: Product[];
    setProducts: (products: Product[]) => void;
    reset: () => void
}