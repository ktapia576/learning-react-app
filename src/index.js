import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props){
    return (
        <p>
            Hello, {props.user}
        </p>
    );
}

function GuestGreeting(props){
    return (
        <p>
            Please sign up.
        </p>
    );
}

function Greeting(props){
    const isLoggedOn = props.isLoggedOn;
    if(isLoggedOn){
        return <UserGreeting user={props.user}/>
    }
    return <GuestGreeting />
}

function ActionLink(props) {
    function handleClick(e) {
        e.preventDefault();
        console.log('The button+ was clicked!');
    }

    return (
        <button onClick={handleClick}>
          {props.name}
        </button>
    );
}

class Toggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {isToggleOn : true};

        //  If you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
    
    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On' : 'Off'}
            </button>
        );
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);   // 'super' keyword is for making super-constructor calls and allows access to parent methods
        this.state = {date: new Date()};
    }

    componentDidMount() {   // Runs after the component output has been rendered to the DOM
        this.timerID = setInterval( // this.props is setup by React itself and this.timerID is setup by me. Setinterval() returns an id that can be used to clearInterval()
            () => this.tick(),
            1000    
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
          date: new Date()
        }); 
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>      
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2> 
            </div>
        );
    }
}

function Avatar(props){
    return (
        <img className = "Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
    );
}

function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
}

class Welcome extends React.Component {
    render () {
        return <h1> Hello, {this.props.name}</h1>;
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                <Welcome name="Sara" />
                <Comment 
                    date={comment.date}
                    text={comment.text}
                    author={comment.author}
                />
                <Clock />
                <ActionLink name="test"/>
                <Toggle /><br />
                <Greeting 
                    isLoggedOn={true}   // Set to false for "Please Sign up" component
                    user={'unic0rns2013'}
                />
            </div>
        );
    }
}

const comment = {   // Example comment data
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
      name: 'Hello Kitty',
      avatarUrl: 'https://placekitten.com/g/64/64',
    },
};

// ------------------------------------

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

function formatDate(date) {
    return date.toLocaleDateString();
  }
  