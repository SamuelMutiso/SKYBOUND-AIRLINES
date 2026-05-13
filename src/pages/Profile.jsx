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
    const [isLoggedIn, setIsLoggedIn] = useState(false);  //Switch for login wall
    const [emailInput, setEmailInput] = useState("");     //Captures the text typed into login input in real-time

    /**
     * Phase 2: Data Fetching
     * Here, we'll put 'useEffect' and 'fetchUserData' logic - bridges gap between my envt and db.json
    */

    /**
     * Phase 3: Authentication logic
     * Here, we'll define 'handleLogin' to verify 'emailInput' against users array, before flipping 'isLoggedIn' to true
    */

    // GATEKEEPER
    if (!isLoggedIn) {
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                {/* Phase 3 logic goes here; onSubmit will go here*/}
                <form className='bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 w-full max-w-md'>
                    <div className='bg-sky-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-sky-200'>
                        <Lock size={28} />
                    </div>

                    <h2 className='text-3xl font-black tracking-tight mb-2 text-slate-900'>SkyBound Portal</h2>
                    <p className='text-slate-400 font-bold mb-8 italic text-sm text-left'>Welcome to SkyBound. Please sign in to access your flight dashoard.</p>

                    <input 
                      type='email'
                      placeholder='Enter your Email (SkyID)'
                      className='w-full p-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-sky-100 font bold mb-4 placeholder:text-slate-300 text-slate-900'
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />

                    {/* Phase 3: conditional error message for failed logins go here */}

                    <button type='submit' className='w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-sky-600 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest tesxt-xs' >
                        Authorize Access
                    </button>
                </form>
            </div>
        );
    }

    return(
        <div className='p-10'>
            {/* Phase 4: Tailwind layout (SideBar + Profile Cards) will go here */}
            <div className='animate-pulse flex flex-col gap-4 text-left'>
                <div className='h-8 w-48 bg-slate-100 rounded-full'></div>
                <p className='text-slate-400 fonnt-bold italic'>Access Granted. Synchronizing with SkyBound HQ...</p>
            </div>
        </div>
    );

}