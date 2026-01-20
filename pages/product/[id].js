import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Navbar from '../../components/Navbar';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) setProduct(docSnap.data());
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-10">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-50 p-10 rounded-xl flex items-center justify-center">
          <img src={product.image || "https://placehold.co/600x600"} className="max-h-96" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-4xl font-bold text-orange-600 mb-8">{product.price} ج.م</div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex justify-center gap-2">
            <ShoppingCart /> أضف للعدة
          </button>
        </div>
      </main>
    </div>
  );
}
