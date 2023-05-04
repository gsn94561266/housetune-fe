import React from 'react';
import './Chaticon.scss';
import { useAuth } from '../Context/Authcontext';
import { useChat } from '../Context/Chatcontext';

function Chaticon() {
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const { chat, setChat } = useChat();
  return (
    <img
      src={`${process.env.REACT_APP_IMAGE_URL}/images/messenger.svg`}
      alt="聊天室符號"
      className={
        'messenger position-fixed ' +
        (isLoggedIn ? 'd-none d-lg-block' : 'd-none ') +
        (chat ? 'a' : '')
      }
      onClick={() => {
        setChat(!chat);
      }}
    />
  );
}

export default Chaticon;
