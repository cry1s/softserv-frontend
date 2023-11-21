import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Col, Form, Row } from "react-bootstrap";
import SoftwareCard from "../../components/SoftwareCard/SoftwareCard";
import Container from "react-bootstrap/Container";

interface SoftwareProperties {
    software: {
        id: number
        name: string,
        description: string,
        version: string,
        logo: string | null
    }
    tags: Array<string>
}

function HomePage() {

    const [filteredSoftwares, setFilteredSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [softwares, setSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [searchField, setSearchField] = React.useState<string>("");
 
    useEffect(() => {
        fetch("/api/softwares")
            .then(response => response.json())
            .then(data => {
                setSoftwares(data.softwares)
                setFilteredSoftwares(data.softwares)
                console.log(data);
            });
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Card bg={"light"} className={"mt-4"} body>Мощное программное обеспечение для вашего сервера.
                    Интуитивный интерфейс, высокая производительность, надежность и безопасность. Поддержка экспертов.
                    Обеспечьте успех своего бизнеса с нами!</Card>
                <Card bg={"light"} className={"mt-4"} body>
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Поиск"
                                    className=" mr-sm-2"
                                    value={searchField}
                                    onChange={(e) => {
                                        setSearchField(e.target.value);
                                        setFilteredSoftwares(softwares.filter((software) => {
                                            return software.software.name.toLowerCase().includes(e.target.value.toLowerCase())
                                        }))
                                    }}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" variant={"dark"}>Найти</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <div className={"w-full mt-4"}>
                    <Row xs={1} md={4} className="g-5">
                        {filteredSoftwares.map((software) => (
                            <Col key={software.software.id}>
                                <SoftwareCard name={software.software.name}
                                    description={software.software.description}
                                    version={software.software.version} id={software.software.id} tags={software.tags}
                                    image={software.software.logo}></SoftwareCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default HomePage;
