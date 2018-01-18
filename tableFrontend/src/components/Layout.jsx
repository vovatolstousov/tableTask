import React from 'react';
import {Container} from 'reactstrap';

export default class LayoutContainer extends React.Component {

    render() {
        const {children} = this.props
        return <div>
            <Container fluid className='mt-3'>
                {children}
            </Container>
        </div>
    }
}
