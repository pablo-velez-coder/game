import { useState } from 'react';
import { CreateSession } from '../createSession';
import { JoinForm } from '../joinForm';
import { UserForm } from '../userForm';
import styles from './styles.module.scss';

export const InitialPage = ({setIsSubmitted}:{setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>}) => {

   const [isCreate, setIsCreate] = useState<boolean>(false);
   const [isjoined, setIsjoined] = useState<boolean>(false);

  return <section className={styles.loginMain}>
   {(!isCreate && !isjoined) ? <div>
     <CreateSession
      setIsCreate={setIsCreate}
      />
    <p>Or</p>
    <JoinForm setIsjoined={setIsjoined} />
   </div> :
   <UserForm  setIsSubmitted={setIsSubmitted} />
      }
    </section>
};