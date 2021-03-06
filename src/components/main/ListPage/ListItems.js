import React, { useState, Fragment } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ITEM } from '../../../graphql/mutations';
//bs imports
import { Accordion } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
const ListItems = ({ items, username, listId }) => {
  const authUsername = useSelector(state => state.user.credentials.username);
  const [isOpen, setIsOpen] = useState([]);
  const [isEditing, setIsEditing] = useState([]);

  const [toUpdate, setToUpdate] = useState(
    items.map(item => ({ name: item.name, description: item.description }))
  );

  const [updateItem] = useMutation(UPDATE_ITEM, {
    update() {
      setIsOpen([]);
      setIsEditing([]);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      listId,
      items: toUpdate
    }
  });

  const handleUpdateItem = e => {
    e.preventDefault();
    updateItem();
  };

  return (
    <div className="list-content">
      {items.map((item, i) => (
        <Fragment key={item.order}>
          <Accordion className="list-item">
            <div className="list-item-header">
              <div className="list-item-info">
                <div className="item-order">
                  <h3>{item.order}</h3>
                </div>
                <div className="item-name">
                  <h4>{item.name}</h4>
                </div>
              </div>

              {item.description === '' ? null : (
                <Accordion.Toggle
                  eventKey="0"
                  className="btn btn-clear"
                  onClick={() => {
                    isOpen.includes(i)
                      ? setIsOpen(isOpen.filter(item => item !== i))
                      : setIsOpen([...isOpen, i]);
                  }}
                >
                  <FontAwesomeIcon icon={isOpen.includes(i) ? faArrowUp : faArrowDown} />
                </Accordion.Toggle>
              )}
            </div>
            <Accordion.Collapse eventKey="0">
              <p className="item-description">{item.description}</p>
            </Accordion.Collapse>
          </Accordion>
          {isEditing.includes(i) ? (
            <form onSubmit={handleUpdateItem}>
              <textarea
                className="description-input form-input"
                type="text"
                placeholder="Add description..."
                value={toUpdate[i].description}
                onChange={e =>
                  setToUpdate(
                    toUpdate.map((element, index) =>
                      index === i ? { ...element, description: e.target.value } : element
                    )
                  )
                }
              />

              <div className="desc-btns">
                <input type="submit" value="Save" className="btn" />
                <div
                  className="btn btn-clear"
                  onClick={() => {
                    isEditing.includes(i)
                      ? setIsEditing(isEditing.filter(item => item !== i))
                      : setIsEditing([...isEditing, i]);
                  }}
                >
                  Cancel
                </div>
              </div>
            </form>
          ) : null}

          {username === authUsername ? (
            <div
              className="edit-description"
              onClick={() => {
                isEditing.includes(i)
                  ? setIsEditing(isEditing.filter(item => item !== i))
                  : setIsEditing([i]);
              }}
            >
              {isEditing.includes(i) ? null : (
                <p className="o-text">+ {item.description === '' ? 'Add' : 'Edit'} description</p>
              )}
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

export default ListItems;
