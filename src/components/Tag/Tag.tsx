import {Button, Col} from "react-bootstrap";

interface TagProperties {
    name: string,
    id: number,

    onClick: (id: number) => void | null
}

function Tag(props: TagProperties) {
    return (
        <Col>
            <Button variant="secondary" size="sm" onClick={() => props.onClick(props.id)}>{props.name}</Button>
        </Col>
    );
}

export default Tag;
export type { TagProperties };
