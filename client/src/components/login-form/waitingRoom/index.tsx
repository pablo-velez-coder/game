import { useSocket } from "hooks/useSocket";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "state/redux";
import { saveAllPlayers, savePlayersQuantity } from "state/redux/users/userSlice";

export const WaitingRoom = () => {

  const user = useSelector((state : RootState )=> state.user);
  const socket =  useSocket()
  const dispatch = useDispatch()
  useEffect(() => {
/*     socket?.emit('requestUsers', user.currentSession)
    socket?.on('getUsers', (users: any)=>{
      dispatch(saveAllPlayers({players: users}))
    }) */
    socket?.emit('requestNumberOfPlayers')
    socket?.on('getNumberOfPlayers',( quantity: number)=>{
      dispatch(savePlayersQuantity({quantity}))
    })

  }, [socket]);  

  return <div >
    We are {user.allPlayers.length}
    <div>
      {
        user.allPlayers.map((user, i)=>(
          <p key={i}>{i+1}. {user.userName}</p>
        ))
      }
    </div>
Let's wait till we are {user.playersQuantity}
  </div>;
};