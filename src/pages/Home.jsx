import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // State for sorting

  useEffect(() => {
    fetch("http://localhost:3001/flights")
      .then(res => res.json())
      .then(data => setFlights(data));
  }, []);

  const handleBook = (flight) => {
    fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...flight, 
        bookingDate: new Date().toLocaleDateString(), 
        status: "Economy Confirmed",
        isUpgraded: false 
      })
    }).then(() => alert(`Flight to ${flight.to} booked successfully!`));
  };

  // Smart Indexing & Ranking Logic
  const filteredAndSorted = flights
    .filter(f => f.to.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="space-y-10">
      {/* Search Hero */}
      <div className="bg-sky-600 rounded-[3rem] p-16 text-white text-center space-y-6 shadow-2xl shadow-sky-100">
        <h1 className="text-5xl font-black tracking-tight">Explore the World.</h1>
        <div className="max-w-xl mx-auto space-y-4">
          <input 
            type="text" 
            placeholder="Where are you flying to?" 
            className="w-full p-5 rounded-2xl text-slate-900 font-bold outline-none shadow-2xl focus:ring-4 focus:ring-sky-300 transition-all"
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* Sorting Controls */}
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => setSortBy("price-low")}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'price-low' ? 'bg-white text-sky-600' : 'bg-sky-500 text-white hover:bg-sky-400'}`}
            >
              Price: Low to High
            </button>
            <button 
              onClick={() => setSortBy("price-high")}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'price-high' ? 'bg-white text-sky-600' : 'bg-sky-500 text-white hover:bg-sky-400'}`}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>

      {/* Flight Results Header */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
          Available Flights ({filteredAndSorted.length})
        </h2>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
          <ArrowUpDown size={14} />
          <span>Ranking by {sortBy === 'default' ? 'relevance' : sortBy.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Flight Results Grid - Now Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {filteredAndSorted.map(f => (
          <div key={f.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="relative h-52 overflow-hidden">
              <img src={f.image} alt={f.to} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase text-sky-600">
                {f.airline}
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Destination</p>
                  <h3 className="text-2xl font-black text-slate-900 italic">{f.to}</h3>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Starting at</p>
                  <p className="text-sky-600 font-black text-xl">
                    <span className="text-xs mr-1">KES</span>
                    {f.price.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold border-y border-slate-50 py-4">
                <span>{f.duration}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span>Direct Flight</span>
              </div>

              <button 
                onClick={() => handleBook(f)} 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                Book Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
