import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/ListCard/ListCard';
import Nav from '../../components/Nav/Nav';

const ListPage = props => {
  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  console.log(data);

  return (
    <Fragment>
      <Nav />
      <div className="profile">
        <Container>
          {loading ? (
            <Spinner animation="border" className="orange-spinner" />
          ) : (
            <List list={data.getList} key={data.getList.id} />
          )}
        </Container>
      </div>
    </Fragment>
  );
};

const FETCH_LIST_QUERY = gql`
  query List($listId: ID!) {
    getList(listId: $listId) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
    }
  }
`;

export default ListPage;
