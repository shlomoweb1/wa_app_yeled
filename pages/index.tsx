import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'


const Sent = (props: { message: string, date: Date }) => {
  return (
    <div className="message sent" style={{ whiteSpace: "pre-line" }}>
      {props.message}
      <span className="metadata">
        <span className="time"></span>
        <span className="tick">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076">
            <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7" />
          </svg>
        </span>
      </span>
    </div>
  )
}

const Recived = (props: { message: string, date: Date }) => {

  return (
    <div className="message received" style={{ whiteSpace: "pre-line" }}>
      {props.message}
      <span className="metadata"><span className="time">{props.date.getHours()}:{props.date.getMinutes()} {props.date.getHours() < 12 ? "AM" : "PM"}</span></span>
    </div>
  )
}

const Home: NextPage = () => {

  const mockMsg = [
    { type: "sent", message: ["הי מה העניינים?", "איך היה החוג במתנ\"ס"], date: new Date() },
    { type: "received", message: ["סבבה"], date: new Date() },
    { type: "sent", message: ["תרצי אחרי החוג לעבור אצלי", "נעשה משהוא כיפי ביחד!"], date: new Date() }
  ]
  const [messages, setMessages] = useState([] as typeof mockMsg);
  const [type, setType] = useState("");
  const [showFriendly, setShowFreindly] = useState(false);



  useEffect(() => {
    if (!showFriendly && messages.length && messages[messages.length - 1].message.filter(m => m.match(/עבור אצלי/)).length) setShowFreindly(true);
  }, [messages]);

  useEffect(()=>{
      setMessages((prev)=>[...prev, ...mockMsg]);
  }, [])

  const Freindly = () => {
    return (
      <div className={["freindly-alert", !showFriendly ? "hidden" : ""].join(" ")}>
        <h2>זיהינו תוכן פוגעני</h2>
        <div className="friendly-tools">
          <a href="#" className="btn continueChat" onClick={(e) => { e.preventDefault(); setShowFreindly(false) }}>להמשיך בשיחה</a>
          <a href="#" className="btn continueHelp">קבל ייעוץ</a>
          <a href="#" className="btn continueRate">דרג אותי</a>
        </div>
      </div>
    )
  }


  return (
    <div className="page">
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,300" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.1.2/css/material-design-iconic-font.min.css" rel="stylesheet" />
        <link href="https://rawgit.com/marvelapp/devices.css/master/assets/devices.min.css" rel="stylesheet" />
      </Head>
      <div className="marvel-device nexus5" style={{ marginTop: "5em" }}>
        <Freindly />
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="volume"></div>
        <div className="camera"></div>
        <div className="screen">
          <div className="screen-container">
            <div className="status-bar">
              <div className="time"></div>
              <div className="battery">
                <i className="zmdi zmdi-battery"></i>
              </div>
              <div className="network">
                <i className="zmdi zmdi-network"></i>
              </div>
              <div className="wifi">
                <i className="zmdi zmdi-wifi-alt-2"></i>
              </div>
              <div className="star">
                <i className="zmdi zmdi-star"></i>
              </div>
            </div>
            <div className="chat">
              <div className="chat-container">
                <div className="user-bar">
                  <div className="back">
                    <i className="zmdi zmdi-arrow-left"></i>
                  </div>
                  <div className="avatar">
                    {/* <img src="" alt="Avatar" /> */}
                  </div>
                  <div className="name">
                    <span>אנונימי לא מוכר</span>
                    <span className="status">אונליין</span>
                  </div>
                  <div className="actions more">
                    <i className="zmdi zmdi-more-vert"></i>
                  </div>
                  <div className="actions attachment">
                    <i className="zmdi zmdi-attachment-alt"></i>
                  </div>
                  <div className="actions">
                    <i className="zmdi zmdi-phone"></i>
                  </div>
                </div>
                <div className="conversation">
                  <div className="conversation-container">
                    {
                      messages.map((m, index) => {
                        if (m.type == "received") return <Recived message={m.message.join("\n")} date={m.date} key={index} />
                        return (<Sent message={m.message.join("\n")} date={m.date} key={index} />)
                      })
                    }
                  </div>
                  <form className="conversation-compose" onSubmit={(e) => {
                    e.preventDefault();
                    if (type) {
                      const m = [...messages];
                      m.push({ type: "received", message: [type], date: new Date() });
                      setMessages(m);
                      setType("");
                    }
                  }}>
                    <div className="emoji">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209"><path fillRule="evenodd" clipRule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489" /></svg>
                    </div>
                    <input className="input-msg" name="input" placeholder="הקלד הודעה" autoComplete="off" autoFocus value={type} onChange={(e) => setType(e.target.value)}></input>
                    <div className="photo">
                      <i className="zmdi zmdi-camera"></i>
                    </div>
                    <button className="send">
                      <div className="circle">
                        <i className="zmdi zmdi-mail-send"></i>
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
