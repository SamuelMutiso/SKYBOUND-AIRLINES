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
}