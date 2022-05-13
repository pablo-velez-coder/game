import { useSocket } from 'hooks/useSocket';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayersQuantity } from 'state/redux/users/userSlice';
import styles from './styles.module.scss';

export const CreateSession = ({setIsCreate}:{
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState<number>(3);
  const socket =  useSocket()

  return <div className={styles.CreateSession}>
    <select
    onChange={e=> setQuantity(Number(e.target.value))}
    >
     {Array.from(Array(7).keys()).slice(3).map(option=>(
       <option key={option} value={option}>
         {option}
       </option>
     ))}
     </select>
    <button
    onClick={()=>{
      const newSessionId = Date.now()
      socket?.emit('numberOfPlayers',{ quantity, gameSessionId: newSessionId})
      socket?.on('getNumberOfPlayers', (num: number) =>{
        dispatch(savePlayersQuantity({quantity:num,  gameSessionId: newSessionId}))
      })   
      setIsCreate(true)
    }}
    >Create new game</button>
  </div>;
};