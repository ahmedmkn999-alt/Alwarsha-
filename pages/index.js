import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <Head>
        <title>الورشة | الرئيسية</title>
      </Head>
      <Navbar />
      <header className="bg-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-orange-500">الورشة</h1>
        <p className="text-xl text-gray-300">كل قطع الغيار في مكان واحد</p>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center">جاري التحميل...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">المخزن فارغ حالياً</div>
        )}
      </main>
    </div>
  );
    }
  
