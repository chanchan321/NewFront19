import React,{useState,useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from '../Picture/cabanganLogo.png'
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";


import useStore from '../Store/store';

export default function Login() {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const userRef = useRef()

  const navigate = useNavigate();

  const addcredentials = useStore( state => state.addCredentials)
  
  const [loading,setloading] = useState(true)

    useEffect(() => {

     setTimeout(()=>{
        setloading(false)
    },500)
      setTimeout(()=>{
        userRef.current.focus();
    },1000)

  },[])

  
    const handleSubmit = async (e) =>{
      e.preventDefault(); 
      setloading(true)
        try{
          const response= await Axios.get(`https://newback19.onrender.com/login/${user}/${pwd}`)
                
                setTimeout(()=>{
                  setloading(false)
              
                      if(response.data === '404 Not Found') {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Please Enter Credentials'
                        })
                        
                      }else if(response.data[0]) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Logged In',
                            showConfirmButton: false,
                            timer: 1500
                          })

                        addcredentials(response.data[0])
                        navigate(`/nav/home/${response.data[0].type}`)
                      }else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'INVALID INPUT'
                        })
                      }
                        setUser('');
                        setPwd('');
                    },1500)

        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
      }

      const [forgotPass,setforgotPass] = useState(false)

      const GetNewPass = async () =>{
        if(!user)
        return  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Enter username/Lrn'
        })
        try{
            const response= await Axios.patch(`https://newback19.onrender.com/getstudAccDetails/${user}`)
            if(response.data){
              setUser('')
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your Temporary password is sent to your Contact Number'
              })
            
          }
        }catch (err){
            console.log(err)
        }
        

      }
  return (
    <>
         
            {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 '>
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
}
                
      <div className='bg-blue-400 bg h-[100vh] flex justify-center items-center z-10 overflow-hidden'>

        <form  onSubmit={handleSubmit} className='sm:rounded-lg w-[370px] h-full sm:h-[400px] bg-black bg-opacity-30 flex flex-col justify-around items-center text-white'>

          <img src={logo} alt='logo' className='w-[170px] z-40'/>
              {!forgotPass ? 
                <>
                     <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username Or LRN'
                          className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px]  z-40'>
                        <input
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          type="password"
                          placeholder='Password'
                          className='bg-[#71A1CC] w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white text-black focus:outline-none'/>
                        <RiLockPasswordFill size={30} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>
                      <div className='z-50 underline cursor-pointer' onClick={()=> {
                        setUser('')
                        setforgotPass(!forgotPass)}}>Forgot password ?</div>
                      
                        <div className='relative flex justify-center mt-[15px] z-40'>
                          <input
                            type="submit"
                            value="Log In"
                            className='bg-[#71A1CC] p-2 px-32 m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-500 focus:outline-none'/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username Or LRN'
                          className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px] z-40 underline cursor-pointer'
                      onClick={()=>{
                        Swal.fire({
                          icon: 'info',
                          title: 'Enter your Username',
                          text: '"Click get new password and the new password will be send to your saved Contact-Number in your account but if you dont have registered account this action will be useless"'
                        })
                      }}>
                         INSTUCTION?
                      </div>
                      <div className='z-50 underline cursor-pointer' onClick={()=> {
                        setUser('')
                        setforgotPass(!forgotPass)}}>Back</div>
                      
                        <div className='relative flex justify-center mt-[15px] z-40'>
                          <div onClick={()=> GetNewPass()} className='bg-[#71A1CC] text-center p-2 w-full m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-500 focus:outline-none'>Get new pass</div>
                        </div>
                    </div>
                </>
                  }
                 

          </form>

      </div>
     
      <div className="opacity-20 fixed inset-0 z-0 bg-black "></div>
    </>
    
  )
}
