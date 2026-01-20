import { useState } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import { Upload, Loader } from 'lucide-react';

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('NEW');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        model,
        condition,
        image: imageUrl,
        createdAt: new Date(),
        sellerId: "admin"
      });
      alert("تمت الإضافة بنجاح!");
      setName(''); setPrice('');
    } catch (error) {
      console.error(error);
      alert("حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 py-10">
        <h1 className="text-2xl font-bold mb-6">إضافة منتج</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم المنتج" className="w-full p-2 border rounded" />
          <input required type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="السعر" className="w-full p-2 border rounded" />
          <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="الموديل" className="w-full p-2 border rounded" />
          <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full p-2 border rounded">
            <option value="NEW">جديد</option>
            <option value="USED">مستعمل</option>
          </select>
          <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full" />
          <button disabled={loading} type="submit" className="w-full bg-slate-900 text-white p-3 rounded font-bold">
            {loading ? "جاري الرفع..." : "نشر"}
          </button>
        </form>
      </div>
    </div>
  );
                                        }
    
