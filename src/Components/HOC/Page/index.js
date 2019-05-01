import React from 'react';
import './styles.scss';

import { Container, Col } from 'react-bootstrap';

const Page = ({
    className,
    children
}) => {
    return (
        <Container className={`page ${className}`}>
            <Col sm={{ span: 10, offset: 1 }} md={{ span: 12, offset: 0 }}>
                {children}
            </Col>
        </Container>
    )
}

export default Page;
