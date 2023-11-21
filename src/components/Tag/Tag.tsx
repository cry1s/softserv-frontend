import React from 'react';
import {Button, Col} from "react-bootstrap";

interface TagProperties {
    name: string,
    id: number
}
function Tag({name, id}) {
    return (
        <Col>
            <Button variant="secondary" size="sm">{name}</Button>
        </Col>
    );
}

export default Tag;
