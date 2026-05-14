import { NavLink, Outlet } from 'react-router-dom';
import { Plane, Search, Ticket, User } from 'lucide-react';

export default function MainLayout()  {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="bg-sky-600 p-2 rounded-xl text-white shadow-lg shadow-sky-200">
              <Plane size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">SkyBound</span>
          </div>

          <div className="flex gap-10">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 font-bold text-sm transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <Search size={18} /> Search Flights
            </NavLink>
            <NavLink to="/bookings" className={({ isActive }) => `flex items-center gap-2 font-bold text-sm transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <Ticket size={18} /> My Bookings
            </NavLink>
          </div>

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            <User size={20} />
          </NavLink>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}