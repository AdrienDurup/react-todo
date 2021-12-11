import React from 'react';
// import PropTypes

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  render() {
    const { newTask, checkTask, isChecked, id } = this.props;
    console.log("OK",id,newTask);
    console.log(id);
    return (
      <li key={id}><input type="checkbox" checked={isChecked} onChange={checkTask} />{newTask}</li>
    )
  }
}
