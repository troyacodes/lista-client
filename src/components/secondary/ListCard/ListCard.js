import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import dayjs from 'dayjs';
//Redux Imports
import { useSelector } from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';

const List = ({
  list: {
    id,
    username,
    title: { phrase, count, description },
    tags,
    likes,
    commentCount,
    likeCount,
    createdAt
  }
}) => {
  const currentUsername = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div className="list-card">
      <div className="list-card-header">
        <h3>{`${phrase} ${count} ${description}`}</h3>
        <Link to={`/${username}`} className="o-text">{`@${username}`}</Link>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <Link to={`/tag/${tag}`} key={index} className="card-tag">
              #{tag}
            </Link>
          ))}
        </div>
        <p>{dayjs(createdAt).format('h:mm A · MMM DD, YYYY')}</p>
      </div>
      <div className="list-card-footer">
        <div className="list-card-actions">
          <div className="list-card-comments">
            <p>{commentCount}</p>
            {authenticated ? (
              <FontAwesomeIcon icon={faComments} />
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faComments} />
              </Link>
            )}
          </div>
          <div className="list-card-likes">
            <LikeButton likeCount={likeCount} likes={likes} listId={id} />
          </div>
          {authenticated && currentUsername === username ? (
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          ) : null}
        </div>
      </div>
      <Link to={`/${username}/list/${id}`}>
        <div className="list-card-expand">View</div>
      </Link>
    </div>
  );
};
export default List;
