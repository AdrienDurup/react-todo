import React from 'react';
import { PropTypes } from 'prop-types';

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  handleCheckbox = (e) => {
    const { setTask, isChecked, id } = this.props;
    /* we execute checkTask in ToDo comp, toggling isChecked */
    setTask(id, { isChecked: !isChecked });
  }

  addFav = (e) => {
    const { setTask, isFav, id } = this.props;
    console.log("isFav before", isFav);
    setTask(id, { isFav: !isFav });
  }

  render() {
    const { newTask, isChecked, isFav } = this.props;
    console.log('OK', newTask);
    return (
      <li className={isChecked ? 'todo-item todo-item--checked' : 'todo-item'}>
        <button className='todo-item__fav-button' onClick={this.addFav}><i className={isFav ? "fas fa-star" : "far fa-star"}></i></button>
        <input type="checkbox" className="todo-item__checkbox" checked={isChecked} onChange={this.handleCheckbox} />{newTask}
      </li>
    )
  }
}


ListItem.propTypes = {
  newTask: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isFav: PropTypes.bool.isRequired,
  setTask: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
