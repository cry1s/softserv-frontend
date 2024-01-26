import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./SoftPage.css"
import img from "../../assets/placeholder.png"
import { Col, Row } from "react-bootstrap";
import Tag, { TagProperties } from "../../components/Tag/Tag";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import softwareArray from "../../model";

interface SoftwareProperties {
    software: {
        id: number
        name: string,
        description: string,
        version: string,
        logo: string | null
    }
    tags: Array<TagProperties>
}

function SoftPage() {
    const { id } = useParams<{ id: string }>();

    const [software, setSoftware] = React.useState<SoftwareProperties>({
        software: {
            id: 0,
            name: "",
            description: "",
            version: "",
            logo: null
        },
        tags: []
    });

    useEffect(() => {
        fetch(`/api/software/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSoftware(data);
            })
            .catch(_ => {
                const iid = Number(id);
                setSoftware({
                    software: softwareArray[iid - 1].software,
                    tags: softwareArray[iid - 1].tags
                })
            })
    }, [id])


    return (
        <Container>
            <Card bg={"light"} className={"mt-4"} body>
                <Breadcrumbs name={software.software.name}></Breadcrumbs>
            </Card>
            <Card bg={"light"} className={"mt-4 sw-card"} body>
                <Row className={"g-4"} xs={1} md={4}>
                    <Col style={{ width: "auto" }}>
                        <Card.Img src={
                            software.software.logo ? software.software.logo : img
                        } className={"sw-img"} />
                    </Col>
                    <Col className={"w-"}>
                        <Card.Title>
                            {software.software.name}
                        </Card.Title>
                        <Card.Subtitle>
                            Версия: {software.software.version}
                        </Card.Subtitle>
                        <Row className="my-1">
                            {software.tags.map((tag) => (
                                <Tag key={tag.id} name={tag.name} id={tag.id}></Tag>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Card.Text className={"mt-4"}>
                    {software.software.description}
                </Card.Text>
            </Card>
        </Container>
    );
}

export default SoftPage;
export type { SoftwareProperties };