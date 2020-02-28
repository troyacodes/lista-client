import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
//queries
import { FETCH_USER_LISTS_QUERY } from '../../graphql/server';
import { GET_AUTHENTICATED } from '../../graphql/client';
//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/ListCard/ListCard';
import Nav from '../../components/Nav/Nav';
import FollowButton from '../../components/FollowButton/FollowButton';

const Profile = props => {
  const usernamePath = props.location.pathname.split('/')[1];
  const { loading, error, data } = useQuery(FETCH_USER_LISTS_QUERY, {
    variables: {
      username: usernamePath
    }
  });

  const {
    data: { authenticated }
  } = useQuery(GET_AUTHENTICATED);

  if (error) {
    return (
      <Fragment>
        <Nav type="home" />
        <section className="profile-details">
          <Container>
            <h4>Opps!</h4>
            <h1>{error.graphQLErrors[0].message}</h1>
          </Container>
        </section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Nav type="home" />
      <div className="profile">
        <section className="profile-details">
          <Container>
            {loading ? (
              <Spinner animation="border" className="orange-spinner" />
            ) : (
              <Fragment>
                <h1>@{data.getUserLists[0].username}</h1>
                <h4>
                  {data.getUserLists.length} {data.getUserLists.length === 1 ? 'LIST' : 'LISTS'}
                </h4>

                <FollowButton usernamePath={usernamePath} user={data.getUserLists[0].username} />
              </Fragment>
            )}
          </Container>
        </section>
        <section className="profile-lists">
          <Container>
            <Row>
              {loading ? (
                <Spinner animation="border" className="orange-spinner" />
              ) : (
                data.getUserLists.map(list => (
                  <Col xs={12} md={3} key={list.id}>
                    <List list={list} authenticated={authenticated} />
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </section>
      </div>
    </Fragment>
  );
};

export default Profile;
