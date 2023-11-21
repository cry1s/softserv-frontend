import {Button, Col} from "react-bootstrap";

interface TagProperties {
    name: string,
    id: number
}

function Tag(props: TagProperties) {
    return (
        <Col>
            <Button variant="secondary" size="sm">{props.name}</Button>
        </Col>
    );
}

export default Tag;
export type { TagProperties };