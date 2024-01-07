import React ,{useState}from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signinImage from '../assets/signup.jpg'







const cookies = new Cookies()





function Auth() {
const[form,setForm]=useState({
    fullName:'',
    username:'',
    password:"",
    confirmPassword:'',
    phoneNumber:"",
    avatarURL:'',
})

const[isSignup,setIsSignup] = useState(true);

const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form)
}



const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { username, password, phoneNumber, avatarURL } = form;
    const URL = 'https://chatappbackend-mi2v.onrender.com/auth';
  
    try {
      const {
        data: { token, userId, hashedPassword, fullName }
      } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username,
        password,
        fullName: form.fullName,
        phoneNumber,
        avatarURL,
      });
  
      console.log('Response Data:', token, userId, hashedPassword, fullName);
  
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);
  
      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarUrl', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }
  
      window.location.reload();
  
    } catch (error) {
      // Log the error details
      console.error('Axios Error:', error);
  
      // You can also check error.response for more information if available
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
  };


const switchMode=()=>{
    setIsSignup((prevIsSignup)=> !prevIsSignup)
}   

  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>
                    {
                        isSignup ? 'Sign Up' : 'Sign In'
                    }

                </p>
                <form action="" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input 
                            name='fullName'
                            type='text'
                            placeholder='Full Name'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                    )}
                       <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Username</label>
                            <input 
                            name='username'
                            type='text'
                            placeholder='Username'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Phone Number</label>
                            <input
                            name='phoneNumber'
                            type='text'
                            placeholder='Phone Number'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                        )}
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input 
                            name='avatarURL'
                            type='text'
                            placeholder='avatar URL'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Password</label>
                            <input 
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='ConfirmPassword'>Confirm Password</label>
                            <input type="password"
                            name='confirmPassword'
                           
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            required
                            
                            />
                        </div>
                        )}
                        <div className='auth__form-container_fields-container_button'>
                            <button>{isSignup?"sign up": "sign in"}</button>
                        </div>
                </form>
                        <div className='auth__form-container_fields-account'>
                            <p>{isSignup?"Already have an account?":"Don't have an account?"}<span onClick={switchMode}>{isSignup?"Sign In":"Sign Up"}</span></p>
                        </div>
            </div>

        </div>
        <div className='auth__form-container_image'>
            <img src={signinImage} alt="sign in" />

        </div>
        
    </div>
  )
}

export default Auth