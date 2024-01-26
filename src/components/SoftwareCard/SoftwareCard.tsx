import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import placeholder from "../../assets/placeholder.png"
import Tag, { TagProperties } from "../Tag/Tag";
import { Link } from "react-router-dom";

interface SoftwareProperties {
    id: number
    name: string,
    description: string,
    version: string,
    tags: Array<TagProperties>,
    image: string | null,
}

function SoftwareCard({id, name, description, version, tags, image}: SoftwareProperties) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image ?? placeholder} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Версия: {version}</Card.Subtitle>
                <Card.Text className={"my-2"}>
                    {description}
                </Card.Text>
                <Link to={"/soft/"+id}>Подробнее</Link>
                <Row className="my-1">
                    {tags.map((tag) => (
                        <Tag key={tag.id} name={tag.name} id={tag.id}></Tag>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default SoftwareCard;
export type { SoftwareProperties };