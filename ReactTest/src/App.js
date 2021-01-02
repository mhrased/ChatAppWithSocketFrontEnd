import React, { Component } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './App.css'

const socket = io.connect('http://localhost:4000',{transports: ['websocket', 'polling', 'flashsocket']})

class App extends Component{

  state = {
    message: '', 
    name: '',
    chat :[]
  }

  componentDidMount = () =>{
    socket.on('message', ({ name, message }) => {
      console.warn(message)
      this.setState({chat:[...this.state.chat, { name, message }]})
    })
  }

  onTextChange = e =>{
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  onMessageSubmit = e => {
      e.preventDefault()
      const { name, message } = this.state
      // console.log(name,message)
      socket.emit('message', { name, message })
      this.setState({ message: '', name })
    }

  // const [state, setStaet] = useState({ message: '', name: '' })
  // const [chat, setChat] = useState([])

  // useEffect(() => {
  //   socket.on('message', ({ name, message }) => {
  //     setChat([...chat, { name, message }])
  //   })
  // })

  // const onTextChange = e => {
  //   setStaet({ ...state, [e.target.name]: e.target.value })
  // }

  // const onMessageSubmit = e => {
  //   e.preventDefault()
  //   const { name, message } = state
  //   console.log(name,message)
  //   socket.emit('message', { name, message })
  //   setStaet({ message: '', name })
  // }

  renderChat = () => {
    console.warn(this.state.chat)
    return this.state.chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  render(){
    return (
      <div className="card">
        <form onSubmit={this.onMessageSubmit}>
          <h1>Messanger</h1>
          <div className="name-field">
            <TextField
              name="name"
              onChange={e => this.onTextChange(e)}
              value={this.state.name}
              label="Name"
            />
          </div>
          <div>
            <TextField
              name="message"
              onChange={e => this.onTextChange(e)}
              value={this.state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {this.renderChat()}
        </div>
      </div>
    )
  }
}

export default App