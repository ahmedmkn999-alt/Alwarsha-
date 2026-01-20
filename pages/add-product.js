import { useState } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import { Upload, CheckCircle, Loader } from 'lucide-react';

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // بيانات المنتج
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('غسالات');
  const [condition, setCondition] = useState('NEW');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. رفع الصورة لو موجودة
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. حفظ البيانات في الداتابيز
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        model,
        category,
        condition,
        image: imageUrl,
        createdAt: new Date(),
        sellerId: "admin" // مؤقتاً لحد ما نعمل تسجيل دخول
      });

      setSuccess(true);
      // تصفير الخانات
      setName(''); setPrice(''); setModel(''); setImageFile(null);
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("حدث خطأ أثناء الرفع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-4 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <Upload className="text-orange-600" />
          إضافة قطعة غيار جديدة
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          
          {/* اسم القطعة */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">اسم القطعة</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: موتور غسالة توشيبا 10 كيلو"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* السعر */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">السعر (ج.م)</label>
              <input 
                required
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="00"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            
            {/* الحالة */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">الحالة</label>
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none bg-white"
              >
                <option value="NEW">جديد (أصلي)</option>
                <option value="USED">مستعمل (خلاع)</option>
              </select>
            </div>
          </div>

          {/* الموديلات المتوافقة */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">الموديلات المتوافقة</label>
            <input 
              type="text" 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="مثال: تعمل على جميع موديلات العربي"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* رفع الصورة */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden" 
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              {imageFile ? (
                <span className="text-green-600 font-bold">{imageFile.name}</span>
              ) : (
                <span className="text-gray-500">اضغط هنا لرفع صورة المنتج</span>
              )}
            </label>
          </div>

          {/* زر الإرسال */}
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition flex justify-center items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" /> : "نشر المنتج الآن"}
          </button>

          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center gap-2 animate-bounce">
              <CheckCircle size={20} />
              تم إضافة المنتج بنجاح للمخزن!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
