import React from 'react';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <ul key={id}>
            <li>
              {title}
              <div>
                <button type="button" onClick={() => editItem(id)}>
                  Edit
                </button>
                <button type="button" onClick={() => removeItem(id)}>
                  Delete
                </button>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default List;
