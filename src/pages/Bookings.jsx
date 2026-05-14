import { useState, useEffect } from 'react';
import { Trash2, ArrowUpCircle } from 'lucide-react';

export default function Bookings() {
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/bookings")
      .then(res => res.json())
      .then(data => setMyTrips(data));
  }, []);

  // DELETE: Remove booking with confirmation guard
  const cancelBooking = (id, destination) => {
    const confirmed = window.confirm(`Are you sure you want to cancel your flight to ${destination}? This action cannot be undone.`);
    
    if (confirmed) {
      fetch(`http://localhost:3001/bookings/${id}`, { method: "DELETE" })
        .then(() => {
          setMyTrips(myTrips.filter(t => t.id !== id));
          alert("Booking cancelled successfully.");
        });
    }
  };

  // PATCH: Update booking 
  const upgradeTrip = (id) => {
    fetch(`http://localhost:3001/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        status: "Business Class", 
        isUpgraded: true 
      })
    })
    .then(res => res.json())
    .then(updatedTrip => {
      setMyTrips(myTrips.map(t => t.id === id ? updatedTrip : t));
      alert("Upgrade successful! Enjoy the lounge access. 🥂");
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900">My Itinerary</h1>
        <p className="text-slate-500 font-medium">Manage your upcoming SkyBound adventures</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <tr>
              <th className="px-10 py-6">Destination</th>
              <th className="px-10 py-6">Date</th>
              <th className="px-10 py-6">Class/Status</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {myTrips.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-10 py-20 text-center text-slate-300 font-bold uppercase tracking-widest">
                  No flights booked yet
                </td>
              </tr>
            ) : (
              myTrips.map(trip => (
                <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 font-bold text-slate-700">{trip.to}</td>
                  <td className="px-10 py-6 text-slate-500 font-medium">{trip.bookingDate}</td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      trip.isUpgraded 
                        ? 'bg-amber-100 text-amber-600 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    }`}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!trip.isUpgraded && (
                        <button 
                          onClick={() => upgradeTrip(trip.id)}
                          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-600 transition-all"
                        >
                          <ArrowUpCircle size={14} />
                          Upgrade
                        </button>
                      )}
                      <button 
                        onClick={() => cancelBooking(trip.id, trip.to)} 
                        className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                        title="Cancel Flight"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}