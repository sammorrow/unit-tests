import React from 'react';

export default class Schedule extends React.Component {

  constructor(props){
    super(props);
    this.state = {notes: 'Write...'}
  }

  render(){
    return (
      <div>
      <h1> To-Dos </h1>
      <h4 className="userName">For {this.props.userName}</h4>
      <ul>
        {this.props.tasks.map(task => {
          return (
            <li key={task}> {task} </li>
          )
        })}
      </ul>
    <p className="notepad">{this.state.notes}</p>
    <button className="addTask" onClick={this.props.addTask}>Add</button>
      </div>
    )
  }
}
