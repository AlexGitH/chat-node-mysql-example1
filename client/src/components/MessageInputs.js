import { Input, Button, Space } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';

const MessageInputs = ({sendAndCheck, setCheckLoopOn,setCheckLoopOff,isCheckLoopOn}) => {
  const [nick, setNick] = useState('')
  const [message, setMessage] = useState('')
  const style = { padding: '5px'}

  return (
    <div >
            <div style={style} ><Input value={nick} onChange={e=>{setNick(e.target.value) }} placeholder="Nickname" /></div>
            <div style={style} ><Input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message"/></div>
        <Space justify="start">

        <Button htmlType="button" type="primary" 
                onClick={async()=>{
                  try {
                    console.log('onSendButtonClick:', 'nick,message:', nick,message);
                    await sendAndCheck( nick, message ) 
                    setMessage( null );
                  }
                  catch(e){
                    console.error('MESSAGE NOT SENT: ', e)
                    // throw e
                  }
                }
              }
        >
          Send
        </Button>

        <Button htmlType="button"
                // onClick={onStopCheckMessages}
                onClick={()=>{
                  // console.log( 'CHeckMessage button clicked, isCheckLoopOn', isCheckLoopOn)
                  isCheckLoopOn ? setCheckLoopOff() : setCheckLoopOn();
                }}
                >
          {`${isCheckLoopOn ? 'Disable' : 'Enable'} auto-check new messages`}
        </Button>

        </Space>
        </div>
  );
};

export default MessageInputs
