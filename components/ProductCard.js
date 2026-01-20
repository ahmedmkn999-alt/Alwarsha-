import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative h-56 bg-white p-4 flex items-center justify-center border-b border-gray-50">
          <img 
            src={product.image || "https://placehold.co/400x400/png?text=No+Image"} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.condition === 'USED' && (
            <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
              مستعمل
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-orange-600 transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-4 bg-gray-100 inline-block px-2 py-1 rounded">موديل: {product.model || "عام"}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-black text-orange-600">{product.price} ج.م</span>
            <div className="bg-slate-900 text-white p-2.5 rounded-full group-hover:bg-orange-600 transition-all shadow-md">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
