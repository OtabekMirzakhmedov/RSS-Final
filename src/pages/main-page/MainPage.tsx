import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { GetProducts } from '../../service/ProductService';

interface MainPageProduct {
  id: string;
  title: string;
  author?: string;
  image?: string;
  price: number;
}

function MainPage() {
  const [products, setProducts] = useState<MainPageProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await GetProducts();
        if (fetchedProducts) {
          setProducts(fetchedProducts);
        } else {
          setError(new Error('Failed to fetch products'));
        }
      } catch (fetchError) {
        setError(fetchError as Error);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProducts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <h1>MainPage</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Author: {product.author}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            {product.image && <img src={product.image} alt={product.title} />}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MainPage;
