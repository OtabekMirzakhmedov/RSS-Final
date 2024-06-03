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
      discounted?: {
        value: {
          centAmount: number;
        };
      };
      id: string;
      key: string;
      value: {
        centAmount: number;
      };
    }[];
  };
}

export interface MainPageProduct {
  id: string;
  title: string;
  author?: string;
  image?: string;
  price: number;
  discount?: number;
}

interface ProductDetails {
  id: string;
  title: string;
  author?: string;
  images?: string[];
  price: number;
  description: string;
  isbn: string;
  publisherName: string;
  pages: number;
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
    discount: (product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0) / 100,
  }));
};

const ConvertToProductDetailData = (product: RawProduct): ProductDetails => {
  const author = product.masterVariant.attributes.find(
    (attr) => attr.name === 'author-name'
  )?.value;
  const isbn = product.masterVariant.attributes.find((attr) => attr.name === 'isbn-number')?.value;
  const publisherName = product.masterVariant.attributes.find(
    (attr) => attr.name === 'publisher-name'
  )?.value;
  const numberOfPages = product.masterVariant.attributes.find(
    (attr) => attr.name === 'number-of-pages'
  )?.value;

  return {
    id: product.id,
    title: product.name['en-US'],
    author: author ?? '',
    images: product.masterVariant.images.map((image) => image.url),
    price: (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100,
    description: product.description['en-US'],
    isbn: isbn ?? '',
    publisherName: publisherName ?? '',
    pages: parseInt(numberOfPages!, 10),
  };
};

export async function GetProducts(
  sortOption?: string,
  searchQuery?: string
): Promise<MainPageProduct[] | null> {
  const initialToken = localStorage.getItem('initial_token');
  const tokenValue = `Bearer ${initialToken}`;
  let url = `${host}/${projectKey}/product-projections`;

  if (sortOption && searchQuery) {
    url = `${url}/search?sort=${sortOption}&text.en-US=${searchQuery}`;
  } else if (searchQuery) {
    url = `${url}/search?text.en-US=${searchQuery}`;
  } else if (sortOption) {
    url = `${url}/search?sort=${sortOption}`;
  }

  try {
    const response = await axios.get<ProductResponse>(url, {
      headers: {
        Authorization: tokenValue,
      },
    });

    const productData = response.data;
    // console.log(productData.results);
    const cleanedProducts = ConvertToMainPageProductData(productData.results);
    // console.log(cleanedProducts);
    return cleanedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function GetProductById(productId: string): Promise<ProductDetails | null> {
  const initialToken = localStorage.getItem('initial_token');
  const tokenValue = `Bearer ${initialToken}`;
  const url = `${host}/${projectKey}/product-projections/${productId}`;

  try {
    const response = await axios.get<RawProduct>(url, {
      headers: {
        Authorization: tokenValue,
      },
    });

    const productData = response.data;
    console.log(productData);
    const cleanedProduct = ConvertToProductDetailData(productData);
    console.log(cleanedProduct);
    return cleanedProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
