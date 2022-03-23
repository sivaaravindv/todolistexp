import React, { useState } from 'react';
import Alert from './Alert';
import List from './List';
const FormComp = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIdEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
            };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIdEditing(false);
      showAlert(true, 'Success', 'Value Changes');
    } else {
      showAlert(true, 'success', 'Item added to the list');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setName('');
      setList([...list, newItem]);
    }
  };
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item Removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty List');
    setList([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>ToDo List app using LocalStorage</h3>
        <div>
          <input
            type="text"
            placeholder="e.g: yoga, reading..etc"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
          <button type="submit">{isEditing ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <div>
            <button onClick={clearList}>Clear Items</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComp;
