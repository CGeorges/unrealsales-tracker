import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';

import Header from '../../components/Header/header';

import './faq.css';

class Faq extends React.PureComponent {
    render() {
        return (
            <Container  className="faq-page">
                <Header/>
                <Row>
                    <Col>
                        <h1>FAQ</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                Is UnrealSales free?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>Yes and it will always be a free service</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                How often will I get sale notifications?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>We refresh our product database with Epic's every 3 days, at that point if you have any items that went on sale you will receive a notification.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                How often will I get sale notifications?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                <Card.Body>We refresh our product database with Epic's every 3 days, at that point if you have any items that went on sale you will receive a notification.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                I've noticed that the products in my wishlist for my currency does not reflect the same price as in the marketplace, why is that?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                <Card.Body>We use our own currency conversion and we don't know the taxes for your country, while Epic does, we don't, so there might be small differences in prices but
                                    when it comes to sale notifications, we use sale percentage, so there will be no false positives.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="4">
                                I have an issue with UnrealSales.io, where I can report it?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="4">
                                <Card.Body>Please use our issues page <a target="_blank" rel="noopener noreferrer" href="https://github.com/CGeorges/unrealsales-tracker/issues">here</a> and try to describe your issue as best as possible and with as many details you can.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Faq = connect(null, null)(Faq);
