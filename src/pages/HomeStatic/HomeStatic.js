import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Row, Col, Spinner } from 'react-bootstrap';
//comps
import ListCard from '../../components/secondary/ListCard/ListCard';
import StaticNav from '../../components/layout/Nav/StaticNav';
//queries
import { FETCH_ALL_LISTS_QUERY } from '../../graphql/query';

const HomeStatic = () => {
  const { loading, data } = useQuery(FETCH_ALL_LISTS_QUERY);
  return (
    <Fragment>
      <StaticNav type="home" />
      <div className="home-static">
        <section className="home-hero">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="home-hero-container">
                  <h1 className="o-text">Welcome to Lista</h1>
                  <h3>The best platform to share your all-time lists</h3>
                  <h4 className="g-text">
                    From your favourite movies to your favourite food, Lista allows you to create and compare
                    your top lists with everyone
                  </h4>
                  <div className="home-buttons">
                    <Link to="/signup" className="btn">
                      Sign up
                    </Link>
                    <Link to="/login" className="btn">
                      Log in
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home-lists">
          <Container>
            <h2>Explore lists</h2>
            <div className="lists-container">
              <div className="lists-container-inner">
                {loading ? (
                  <Spinner animation="border" className="orange-spinner" />
                ) : (
                  data.getLists.map(list => <ListCard list={list} key={list.id} />)
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </Fragment>
  );
};

export default HomeStatic;
