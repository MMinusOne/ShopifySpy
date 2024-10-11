import { Product } from "@/types";

interface ChartData {
    labels: string[];
    data: number[];
}

export default function constructChartData(
    products: Product[],
    setProducts: (data: ChartData) => void,
    setVendors: (data: ChartData) => void
) {
    setProducts(constructCategoryData(products, 'product_type'));
    setVendors(constructCategoryData(products, 'vendor'));
}

function constructCategoryData(products: Product[], categoryKey: 'product_type' | 'vendor'): ChartData {
    const categoryMap = new Map<string, number>();
    const limit = 12;

    products.forEach(product => {
        const category = product[categoryKey];
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const sortedCategories = Array.from(categoryMap.entries())
        .sort((a, b) => b[1] - a[1]);

    let chartData: [string, number][];

    if (sortedCategories.length <= limit) {
        chartData = sortedCategories;
    } else {
        chartData = sortedCategories.slice(0, limit - 1);
        const othersCount = sortedCategories.slice(limit - 1).reduce((sum, [, count]) => sum + count, 0);
        chartData.push(['Others', othersCount]);
    }

    return {
        labels: chartData.map(([category]) => truncateLabel(category)),
        data: chartData.map(([, count]) => count)
    };
}

function truncateLabel(label: string): string {
    return label.length > 20 ? `${label.slice(0, 20)}...` : label;
}