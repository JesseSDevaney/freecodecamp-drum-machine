import React from "react";
import './App.scss';
import KEY_DATA from "./key_data";

class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.triggerDrumEvent = this.triggerDrumEvent.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyAssigned.charCodeAt(0)) {
        this.triggerDrumEvent();
    }
  }

  triggerDrumEvent(){
    this.props.handleKeyPress(this.props.keyAssigned);
    this.playSound()
  }

  playSound(){
    const sound = document.getElementById(this.props.keyAssigned);
    sound.currentTime = 0;
    sound.play();
  }

  render() {
    const keyAssigned = this.props.keyAssigned;
    const audioId = this.props.id;
    const audioSrc = this.props.audioSrc;

    let classNames = "drum-pad";
    classNames += " " + keyAssigned + "Class";

    return (
      <button className={classNames} id={audioId} onClick={this.triggerDrumEvent} >
        <audio className="clip" id={keyAssigned} src={audioSrc}></audio>
        <span className="key">
          {keyAssigned}
        </span>
      </button>
    );
  }
}


function DrumPadContainer(props){
  return (
    <div id="drum-pad-container">
      {KEY_DATA.map(({key,  audioDesc, audioSrc}) => {

        return <DrumPad 
                  key={key} 
                  id={audioDesc} 
                  keyAssigned={key} 
                  audioSrc={audioSrc} 
                  handleKeyPress={props.handleKeyPress}
                />;
      })}
    </div>
  );
}



function Display(props){
  const keyPressed = props.keyPressed;
  let audioDescription = "";

  const matchingKey = KEY_DATA.filter(({ key }) => key === keyPressed);
  
  if (matchingKey.length === 1){
    audioDescription = matchingKey[0]["audioDesc"];
  }

  return (
    <div id="display">
      <p>
        {audioDescription}
      </p>
    </div>
  );
}


function DrumMachine(props) {
  return (
    <div id="drum-machine">
      <Display keyPressed={props.keyPressed}/>
      <DrumPadContainer handleKeyPress={props.handleKeyPress}/>
    </div>
  );
}


class Stage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keyPressed: ""
    };
    
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(key){
    this.setState({keyPressed: key});
  }
  
  render(){
    const keyPressed = this.state.keyPressed;
    let classNames = "stage";
    classNames += keyPressed !== "" 
      ? " " + keyPressed + "ClassLight" 
      : "";

    return (
      <div className={classNames}>
        <DrumMachine keyPressed={keyPressed} handleKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}


function App(){
  return (
    <Stage />
  );
}

export default App;