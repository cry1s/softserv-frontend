import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import placeholder from "../../assets/placeholder.png"
import Tag from "../Tag/Tag";

interface SoftwareProperties {
    id: number
    name: string,
    description: string,
    version: string,
    tags: Array<string>,
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
                <Card.Link href={"/soft/"+id}>Подробнее</Card.Link>
                <Row xs={1} md={4} className="g-0 my-2">
                    {tags.map((tag, idx) => (
                        <Tag key={idx} name={tag}></Tag>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default SoftwareCard;
