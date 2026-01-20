import Link from 'next/link';
import { ShoppingCart, User, Wrench, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-2 rounded-lg group-hover:bg-orange-500 transition">
              <Wrench size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wide">الورشة</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 mx-8 relative">
            <input 
              type="text" 
              placeholder="ابحث برقم الموديل أو اسم القطعة..." 
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-orange-500 transition"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative hover:text-orange-500 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">0</span>
            </Link>
            <Link href="/login" className="flex items-center gap-2 hover:text-orange-500 transition">
              <User size={24} />
              <span className="hidden md:inline text-sm font-medium">دخول</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
            }
                
