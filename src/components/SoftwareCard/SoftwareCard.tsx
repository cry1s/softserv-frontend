import Card from "react-bootstrap/Card";
import {Button, Row} from "react-bootstrap";
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
    source: string,
    onDelete: (id: number) => void  | undefined,
}

function SoftwareCard({id, name, description, version, tags, image, source, onDelete}: SoftwareProperties) {
    return (
        <Card style={{ width: '18rem', height: "100%" }} className={"position-relative"}>
            {typeof onDelete === "function" && <div className={"softwaredelete"} onClick={() => onDelete(id)}>Удалить</div>}
            <Card.Img variant="top" src={image || placeholder} />
            <Card.Body className={"d-flex flex-column justify-content-between"}>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Версия: {version}</Card.Subtitle>
                <a href={source} target={"_blank"} rel="noreferrer">Исходный код</a>
                <Card.Text className={"my-2"}>
                    {description}
                </Card.Text>
                <Link to={"/soft/"+id}>Подробнее</Link>
                <Row className="my-1 g-2" xs={"auto"}>
                    {tags.map((tag) => (
                        <Tag key={tag.id} name={tag.name} id={tag.id}></Tag>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default SoftwareCard;
