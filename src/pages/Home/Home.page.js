import React, { useState, useEffect } from 'react';
import { useList } from 'react-firebase-hooks/database';

import Firebase from 'components/Firebase';
import './Home.css';

const db = new Firebase().database();

const renderSnapshot = snap => <li key={snap.val().id}>{snap.val().text}</li>;
const messageRef = React.createRef();

export default function Home() {
  const [msg, setMsg] = useState('');
  const [snapshots, loading, error] = useList(db.ref('/messages'));
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [snapshots]);

  const handleSubmit = async e => {
    e.preventDefault();
    await db.ref('/messages').push({
      text: msg,
    });
    setMsg('');
  };

  return (
    <div className="container">
      <h1>Messenger</h1>
      {loading && <div>loading messages...</div>}
      {error && <div>{error.message}</div>}
      <div ref={messageRef} className="messages">
        <lu>{snapshots.map(renderSnapshot)}</lu>
      </div>
      <div className="new-message">
        <form onSubmit={handleSubmit}>
          <input
            value={msg}
            onChange={({ target: { value } }) => setMsg(value)}
            placeholder="enter a new message"
          />
        </form>
      </div>
    </div>
  );
}
