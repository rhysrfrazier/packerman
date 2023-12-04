import { redirect } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'

export default function Login (){

    const navigate = useNavigate()

    async function getUsers (uuid){
        try {
          const userList = (await axios.get(`${BASE_URL}users/`)).data
          const userFound = userList.find((element) => element.user_id === uuid)

          if (userFound){
            sessionStorage.setItem('user_id', uuid)
            console.log(`Welcome, ${userFound.name}!`)
            navigate('/home')
          } else {
            console.log('gtfo')
          }

        } catch (error) {
          console.error(error)
        }
      }
    
      function submit(){
        const uuid = userID.value
        getUsers(uuid)
      }
    
      function handleKeyDown(e){
        if (e.key ==='Enter'){
          submit()
        }
      }

   return(
    <div className='scanIn'>
      <label className='welcome'>
        Welcome! Please scan your ID card or enter your UUID to continue.
        <br/>
        <input onKeyDown={handleKeyDown} id='userID' type='text'/>
      </label>
      <button onClick={submit}>Submit</button>
    </div>
   )   
}