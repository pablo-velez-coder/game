import { useSocket } from "hooks/useSocket";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentSession } from "state/redux/users/userSlice";

interface JoinFormProps {
  setIsjoined: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JoinForm = ({setIsjoined}:JoinFormProps) => {
  const [sessionText, setSessionText] = useState<string>('');
  const socket = useSocket()
  const dispatch = useDispatch()

  const handleSubmit =  (e:any) =>{
    e.preventDefault();
    socket?.emit('joiningSession',{ gameSessionId: sessionText}) 
    dispatch(saveCurrentSession({gameSessionId: sessionText}))
    setIsjoined(true)
  }

  return <form onSubmit={handleSubmit}>
    <p>Join game:</p>
        <input
        value={sessionText}
        onChange={e=> setSessionText(e.target.value)}
        placeholder="Paste code here..." />
        <button type="submit">Join</button>
    </form>
};