import Link from 'next/link';
import { ShoppingCart, User, Wrench, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-2 rounded-lg group-hover:bg-orange-500 transition">
              <Wrench size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wide">الورشة</span>
          </Link>

          <div className="hidden md:block flex-1 mx-8 relative">
            <input 
              type="text" 
              placeholder="ابحث برقم الموديل..." 
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-orange-500 transition"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/add-product" className="text-sm font-bold text-orange-400 hover:text-orange-300">
              بيع قطعة
            </Link>
            <Link href="/cart" className="relative hover:text-orange-500 transition">
              <ShoppingCart size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
    }
                
