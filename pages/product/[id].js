import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Navbar from '../../components/Navbar';
import { ShoppingCart, Check, Truck } from 'lucide-react';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; // بنجيب رقم المنتج من الرابط
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-20">جاري تحميل التفاصيل...</div>;
  if (!product) return <div className="text-center p-20">المنتج غير موجود</div>;

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* صورة المنتج */}
          <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center border border-gray-100">
            <img 
              src={product.image || "https://placehold.co/600x600/png?text=No+Image"} 
              alt={product.name} 
              className="max-h-[500px] object-contain"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
                {product.condition === 'NEW' ? 
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">جديد / أصلي</span> 
                    : 
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">استعمال خارج</span>
                }
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-500 mb-6">موديل: {product.model}</p>
            
            <div className="text-4xl font-bold text-orange-600 mb-8">{product.price} ج.م</div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                    <Check className="text-green-500" />
                    <span>متوفر في المخزن (شحن فوري)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <Truck className="text-slate-900" />
                    <span>شحن للقاهرة والجيزة (100ج) وباقي المحافظات متاح.</span>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition">
                    <ShoppingCart />
                    أضف إلى العدة
                </button>
                <button className="px-6 border-2 border-slate-200 rounded-xl hover:bg-gray-50 font-bold transition">
                    واتساب
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
    }
    
