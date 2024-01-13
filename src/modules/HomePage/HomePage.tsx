import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Col, Form, Row } from "react-bootstrap";
import SoftwareCard from "../../components/SoftwareCard/SoftwareCard";
import Container from "react-bootstrap/Container";
import { SoftwareProperties } from '../SoftPage/SoftPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

function HomePage() {

    const [softwares, setSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [searchField, setSearchField] = React.useState<string>(
        new URLSearchParams(window.location.search).get("search") || ""
    );

    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        let search = searchParams.get("search");
        if (!search) {
            search = searchField;
        }
        fetch(`/api/softwares${ search ? `?search=${search}` : "" }`)
            .then((response) => response.json())
            .then((data) => {
                setSoftwares(data.softwares);
            });
    }, [searchField])

    return (
        <React.Fragment>
            <Container>
                <Card bg={"light"} className={"mt-4"} body>
                    <Breadcrumbs></Breadcrumbs>
                </Card>
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
                                    }}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant={"dark"} onClick={
                                    () => {
                                        const url = new URL(window.location.href);
                                        const searchParams = new URLSearchParams(url.search);
                                        searchParams.set("search", searchField);
                                        url.search = searchParams.toString();
                                        window.location.href = url.toString();
                                    }
                                }>Найти</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <div className={"w-full mt-4"}>
                    <Row xs={1} md={4} className="g-5">
                        {softwares.map((software) => (
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
