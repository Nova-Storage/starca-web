import { CircularProgress } from '@mui/material';
import './Message.css'

import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';
import { useEffect, useState } from 'react'


// Remove element from page using the classname
const removeElementsByClass = className => {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(el => el.parentNode.removeChild(el));
  };

function Message() {

    const [userInfo, setUserInfo] = useState()

    const getUserInfo = () => {
        fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/get-user-names`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: sessionStorage.getItem("email")
          })
        })
          .then(res => res.json())
          .then(data => {
            setUserInfo(data)
          })
          .catch((error) => console.error("Error:", error))
    }

    // Fetch and update current users info to display in the header
    useEffect(() => {
        getUserInfo()
      }, [])

    // Removes the create channel button from the header
    useEffect(() => {
        removeElementsByClass('sendbird-channel-header__right-icon');
    })

    if (userInfo !== undefined) {
        return (
            <div className="Message">
                <SendbirdApp
                    appId={`${process.env.REACT_APP_SENDBIRD_ID}`}     // Specify your Sendbird application ID.
                    userId={sessionStorage.getItem("email")}           // Specify your user ID.
                    nickname={userInfo.ufname + " " + userInfo.ulname}   // Specift the nickname to be displayed in the header
                />
            </div>
        );
    }

    else {
        return (
            <div className='Loading'>
                <CircularProgress />
            </div>
        )
    }
};

export default Message
