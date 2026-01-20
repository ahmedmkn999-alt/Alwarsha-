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
        <title>الورشة | لقطع الغيار</title>
      </Head>

      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-orange-500 drop-shadow-lg">الورشة</h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">أصلح جهازك بنفسك.. كل قطع الغيار في مكان واحد</p>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-1.5 bg-orange-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-slate-800">وصل حديثاً</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
             ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl font-medium">المخزن فاضي حالياً..</p>
            <p className="text-gray-400 text-sm mt-2">جرب تضيف منتج من لوحة التحكم في Firebase</p>
          </div>
        )}
      </main>
    </div>
  );
        }
               
