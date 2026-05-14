import { useState, useEffect } from 'react';
import { User, Mail, Award, MapPin, Settings, ChevronRight,Lock } from 'lucide-react';

/**
 * Profile component
 * Here, user authentication and profile display is managed, ensures only authorized members see data.
 */

export default function Profile() {
  //State management
  const [users, setUsers] = useState([]); //Holds full array of members from db.json
  const [currentUser, setCurrentUser] = useState(null); //Tracks which specific member is currently being viewed
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Switch for login wall
  const [emailInput, setEmailInput] = useState(""); //Captures the text typed into login input in real-time
  const [loginError, setLoginError] = useState(""); //New state to track failed login attempts

  /**
   * Phase 2: Data Fetching
   * Here, we'll put 'useEffect' and 'fetchUserData' logic - bridges gap between my envt and db.json
   */
  useEffect(() => {
    async function fetchUserData() {
      try {
        //Connects to json-server
        const response = await fetch("http://localhost:3001/users");
        //Manual check for server response status
        if (!response.ok) {
          throw new Error("HQ Connection Failed");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Sync Error:", error.message);
      }
    }

    fetchUserData();
  }, []);

  /**
   * Phase 3: Authentication logic
   * Here, we'll define 'handleLogin' to verify 'emailInput' against users array, before flipping 'isLoggedIn' to true
   */
  const handleLogin = (e) => {
    e.preventDefault(); //Prevents browser from reloading page

    const auth = emailInput.toLowerCase();
    //Search our fetched users for a case-insensitive eamil match
    const authenticatedUser = users.find(
      (user) => user.email.toLowerCase() === auth,
    );

    if (authenticatedUser) {
      //Update identity and lift Gatekeeper wall
      setCurrentUser(authenticatedUser);
      setIsLoggedIn(true);
      setLoginError(""); //Clear any previous errors on success
    } else {
      setLoginError("Invalid SkyID. Please check your email and try again.");
    }
  };

  // GATEKEEPER
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {/* Phase 3 logic goes here; onSubmit will go here*/}
        <form
          onSubmit={handleLogin} //Added onSubmit listener to trigger phase 3 logic
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 w-full max-w-md"
        >
          <div className="bg-sky-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-sky-200">
            <Lock size={28} />
          </div>

          <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900">
            SkyBound Portal
          </h2>
          <p className="text-slate-400 font-bold mb-8 italic text-sm text-left">
            Welcome to SkyBound. Please sign in to access your flight dashoard.
          </p>

          <input
            type="email"
            placeholder="Enter your Email (SkyID)"
            className="w-full p-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-sky-100 font bold mb-4 placeholder:text-slate-300 text-slate-900"
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />

          {/* Phase 3: conditional error message for failed logins go here */}
          {loginError && (
            <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mb-4 px-2 animate-bounce">
              ⚠️ {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest tesxt-xs"
          >
            Authorize Access
          </button>
        </form>
      </div>
    );
  }

  if (!currentUser) return null; //Prevents "cannot read property avatar of null"

  return (
    <div className="flex gap-10">
      {/* Phase 4: Tailwind layout (SideBar + Profile Cards) will go here */}
      <div className="w-64 space-y-4">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-4">
          SkyBound Squad
        </h3>
        <div className="bg-white rounded-4xl border border-slate-100 p-2 shadow-sm">
          {/* Dynamic Sidebar: maps through all squad members and applies "active" styling if ID matches 'currentUser' */}
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setCurrentUser(user)} //Updates view to clicked user
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition all ${
                currentUser.id === user.id
                  ? "bg-sky-50 text-sky-600 shadow-inner" //Status: Active
                  : "text-slate-400 hover:bg-slate-50" //Status: Inactive
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xs font-black text-left flex-1">
                {user.name.split(" ")[0]}
              </span>
              {currentUser.id === user.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-10">
        {/* Profile Card */}
        <div className="bg-white rounded-[3rem] border-slate-100 overflow-hidden shadow-sm text-left">
          <div className="h-32 bg-sky-600 w-full relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent]"></div>
          </div>
          <div className="px-12 pb-12">
            <div className="relative -my-16">
              <img
                //Reactive view: All profile details are bound to currentUser state; clicking the sidebar triggers a re-render with new data
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-[2.5rem] border-8 border-white shadow-xl object-cover"
              />
              <div className="absolute bottom-0 left-24 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full"></div>
            </div>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
                  {currentUser.name}
                </h1>
                <p className="text-slate-400 font-bold flex items-center gap-2 text-sm">
                  <MapPin size={16} /> SkyBound HQ, Nairobi
                </p>
              </div>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 roinded-2xl font-black text-xs hover:bg-sky-600 transition-all shadow-lg shadow-slate-200">
                <Settings size={16} /> Edit Profile
              </button>
            </div>
            {/* Data Grid: Membership, Miles, SkyID */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-50">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Membership
                </p>
                <p className="text-sky-600 font-black flex items-center gap-2">
                  <Award size={18} /> {currentUser.tier}
                </p>
              </div>
              <div className="space-y-1">
                {/* Metric display: Renders raw numerical data from db.json with descriptive units */}
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Total Miles
                </p>
                <p className="text-slate-900 font-black italic">
                  {currentUser.totalMiles}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  SkyID
                </p>
                <p className="text-slate-900 font-bold text-sm underline opacity-60">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Wallet & Flight History */}
        <div className="grid grid-cols-2 gap-6 text-left">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="font-black text-xl mb-2">SkyPass Wallet</h3>
            <p className="text-white/40 text-xs mb-6 font-medium">
              Digital boarding passes and crypto-miles
            </p>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] transition-all uppercase tracking-widest">
              View All Passes
            </button>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
            <h3 className="font-black text-xl mb-2 text-slate-900">
              Flight History
            </h3>
            <p className="text-slate-400 text-xs mb-6 font-medium">
              Review your past Domestic and International flights
            </p>
            <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl font-black text-[10px] transition-all uppercase tracking-widest text-slate-900">
              Download Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
