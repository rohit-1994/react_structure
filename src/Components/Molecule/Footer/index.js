import React, { PureComponent } from 'react';
import './styles.scss';

import { Row, Col, Nav } from 'react-bootstrap';
import { IoLogoApple } from 'react-icons/io';
import Moment from 'moment';
import { LinkSections, SocialLinks } from '../../../Config/FooterConfig';
import { AppConstants } from '../../../Shared/Constants';

export class Footer extends PureComponent {
    renderSections(section, sectionIndex) {
        return (
            <Col
                key={sectionIndex}
                xs={12}
                sm={6}
                md={3}
            >
                <ul>
                    {section.map((linkData, linkIndex) => {
                        return (
                            <li key={linkIndex}>
                                <Nav.Link>
                                    {linkData.label}
                                </Nav.Link>
                            </li>
                        );
                    })}
                </ul>
            </Col>
        );
    }

    render() {
        return (
            <footer>
                <div className={'footer-top justify-content-space-between'}>
                    <Row>
                        <Col>
                            <h1 className={'app-title'}>{AppConstants.APP_NAME}</h1>
                        </Col>
                    </Row>
                    <Row className={'links-row'}>
                        {LinkSections.map(this.renderSections.bind(this))}
                        <Col>
                            <ul>
                                <li>
                                    <h2>Download</h2>
                                </li>
                                <li>
                                    iPhone and iPad versions.
                                </li>
                                <li>
                                    <button className={'appstore-button'}>
                                        <IoLogoApple size={24} />
                                        <div className={'button-text'}>
                                            <p>Download on the</p>
                                            <span>App Store</span>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <ul className={'social-list'}>
                                {SocialLinks.map((LinkData, index) => {
                                    return (
                                        <li key={index}>
                                            <Nav.Link>
                                                <LinkData.Icon className={'icon'} />
                                            </Nav.Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className={'footer-bottom'}>
                    <p>
                        &copy; {Moment().year()} {AppConstants.APP_NAME} a Tanbel Inc. Product. Tanbel Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer;
