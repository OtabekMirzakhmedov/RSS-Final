/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

const projectKey = 'rss-final-commerce';
const host = 'https://api.eu-central-1.aws.commercetools.com';

interface RawProduct {
  id: string;
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  masterVariant: {
    id: number;
    sku: string;
    key: string;
    attributes: {
      name: string;
      value: string;
    }[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    prices: {
      id: string;
      key: string;
      value: {
        centAmount: number;
      };
    }[];
  };
}

interface MainPageProduct {
  id: string;
  title: string;
  author?: string;
  image?: string;
  price: number;
}

interface ProductResponse {
  limit: number;
  count: number;
  offset: number;
  results: RawProduct[];
}

const ConvertToMainPageProductData = (products: RawProduct[]): MainPageProduct[] => {
  return products.map((product) => ({
    id: product.id,
    title: product.name['en-US'],
    author: product.masterVariant.attributes[0]?.value,
    image: product.masterVariant.images[0]?.url,
    price: (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100,
  }));
};

export async function GetProducts(): Promise<MainPageProduct[] | null> {
  const initialToken = localStorage.getItem('initial_token');
  const tokenValue = `Bearer ${initialToken}`;

  try {
    const response = await axios.get<ProductResponse>(`${host}/${projectKey}/product-projections`, {
      headers: {
        Authorization: tokenValue,
      },
    });

    const productData = response.data;
    console.log(productData.results);
    const cleanedProducts = ConvertToMainPageProductData(productData.results);
    console.log(cleanedProducts);
    return cleanedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}
