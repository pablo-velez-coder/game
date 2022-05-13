import {  useState } from 'react';
import { InitialPage } from './initialPage';
import styles from './styles.module.scss';
import { WaitingRoom } from './waitingRoom';

export const LoginForm = () => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return <div className={styles.login}>
   <section className={styles.loginLogo}>
   <img src='https://play-dixit.online/dixit.png' alt='dixit-logo' />
   </section>
   <section>
     Play this amazing card game with your friends!
   </section>
    {isSubmitted ? <WaitingRoom /> : <InitialPage setIsSubmitted={setIsSubmitted}  />}

    <footer className={styles.loginFooter}>
      Made by Pablo Vélez
    </footer>
  </div>;
};