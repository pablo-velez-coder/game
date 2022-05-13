import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'state/redux';
import { useSocket } from 'hooks/useSocket';
import { useDispatch } from 'react-redux';
import { saveAllPlayers } from 'state/redux/users/userSlice';
interface UserFormProps { 
    setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const UserForm: React.FC<UserFormProps> = ({setIsSubmitted}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState<string>('');
    const user = useSelector((state : RootState )=> state.user);
    const dispatch = useDispatch()
    const socket =  useSocket()

    const handleSubmit = (e:any) =>{
        e.preventDefault()
        setIsSubmitted(true)
        socket?.emit('addUser', {userName:text, gameSessionId: user.currentSession})
        socket?.on('getUsers', (users: any) =>
        dispatch(saveAllPlayers({players: users})))
      }

    useEffect(() => {
      inputRef?.current?.focus()
    }, []);

  return <div className={styles.loginMainContainer}>
   <div>Your id session is {user.currentSession}
     <span
     style={{cursor:'pointer'}}
     onClick={()=> user.currentSession && navigator.clipboard.writeText(`${user.currentSession}`)}>
      📋 
     </span>
     </div>
   <form className={styles.loginMainForm} onSubmit={handleSubmit}>
      <div>Choose your username</div>
      <input
      ref={inputRef}
      value={text}
      onChange={(e)=> setText(e.target.value)}
      />
      <button type="submit">Go</button>
      </form>
  </div>;
};