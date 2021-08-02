import 'antd/dist/antd.css';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

function cleanUp(text) {
  if(typeof text !== 'string') return text;
  if(text.match(/<script/i)) {
    let el = document.createElement('div');
    el.innerText = text;
    return `<h1>SUPER HACKER CODE:</h1><pre>${el.innerHTML}</pre>`;
  }
  return text;
}

const Message = ( { item: { nick,message,timestamp } } ) => {
  return (
    // <>
      // {/* <p>{message} </p> */}
  <Comment
    // actions={actions}
    // author={<b>{nick}</b>}
    author={<b dangerouslySetInnerHTML={{__html: cleanUp( nick )}}></b>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="User Name"
      />
    }
    content={
      <p dangerouslySetInnerHTML={{__html: cleanUp( message )}}></p>
    }
    datetime={
      <Tooltip title={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(timestamp).fromNow()}</span>
      </Tooltip>
    }
  />
  // {/* </> */}
  )
}

export default Message