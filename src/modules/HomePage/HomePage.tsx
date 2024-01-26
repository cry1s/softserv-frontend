import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Col, Form, Row } from "react-bootstrap";
import SoftwareCard from "../../components/SoftwareCard/SoftwareCard";
import Container from "react-bootstrap/Container";
import { SoftwareProperties } from '../SoftPage/SoftPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import softwareArray from '../../model';

function HomePage() {
    const [softwares, setSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [confSoftwares, setConfSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [searchField, setSearchField] = React.useState<string>("");
 
    async function fetchSoft() {
        try {
            const response = await fetch(`/api/softwares${searchField ? `?search=${searchField}` : ""}`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const data = await response.json();
            setSoftwares(data.softwares);
            setConfSoftwares(softwares.filter(v => {
                return v.software.name.toLowerCase().includes(searchField.toLowerCase());
            }));
        } catch {
            setSoftwares(softwareArray);
            setConfSoftwares(softwareArray.filter(v => {
                return v.software.name.toLowerCase().includes(searchField.toLowerCase());
            }));
        }
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const search = searchParams.get("search");
        if (search) {
            setSearchField(search);
        }

        fetchSoft();

        
    }, [])

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
                    <Form
                        method='GET'
                        action={`/softserv-frontend/#/${ searchField ? `?search=${searchField}` : "" }`}    
                    >
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Поиск"
                                    className=" mr-sm-2"
                                    value={searchField}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setSearchField(e.target.value);
                                    }}
                                    
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant={"dark"} onClick={(e) => {
                                        e.preventDefault();
                                        fetchSoft()
                                    }}>Найти</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <div className={"w-full mt-4"}>
                    <Row xs={1} md={4} className="g-5">
                        {confSoftwares.map((software) => (
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
