import React, { useEffect } from 'react'
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/userPlaceholder.jpg"

const Header = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/dashboard");
      console.log("photoURL:", user?.photoURL);
    }
  }, [user, loading])
  

  function logoutFunc(){
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out!");
        navigate("/")
      }).catch((err) => {
        toast.error(err.message);
      })
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <nav className='navbar'>
      <p className='logo'>Financely.</p>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'0.7rem'}}>
        <img src={user?.photoURL || userImg} style={{width: '2.2rem', height:'2.2rem', borderRadius:'50%'}} alt="user photo" />
        {user && <p onClick={logoutFunc} className='logo link'>Logout</p>}
      </div>
    </nav>
  )
}

export default Header