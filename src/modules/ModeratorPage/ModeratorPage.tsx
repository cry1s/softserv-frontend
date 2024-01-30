import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {setLoading} from "../../store/app";
import {useDispatch} from "react-redux";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import placeholder from "../../assets/placeholder.png"

function ModeratorPage() {
    const [softwares, setSoftwares] = useState([]);
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const load = () => {
        dispatch(setLoading(true));
        axios.get(`/api/softwares` + (name ? `?search=${name}` : "")).then(({data}) => {
            setSoftwares(data.softwares)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

    useEffect(() => {
        load();
    }, [])

    const deleteSoftware = (id) => {
        dispatch(setLoading(true));
        axios.delete("/api/software/" + id).finally(() => load())
    }

    return (
        <React.Fragment>
            <Container>
                <Card bg={"light"} className={"mt-4"} body>
                    <Breadcrumbs name={"Услуги"}></Breadcrumbs>
                </Card>
                <Card bg={"light"} className={"mt-4"} body>
                    <Form onSubmit={e => {
                        load();
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                        <Row>
                            <Col>
                                <Form.Control
                                    placeholder="Поиск"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" variant={"dark"}>Найти</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                    <Row className={"justify-content-between"}></Row>
                <Card bg={"light"} className={"mt-4"} body>
                    <Row className={"mb-4"}>
                        <Col className={"align-self-end"} xs={1} md={4}>
                            <Link to={"/new"}><Button type="submit" variant={"dark"}>Создать</Button></Link>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Изображение</th>
                            <th>Имя</th>
                            <th>Описание</th>
                            <th>Версия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {softwares.map((sw =>
                                <tr key={sw.software.id}>
                                    <td>{sw.software.id}</td>
                                    <td><img width={"150px"}src={sw.software.logo || placeholder}></img></td>
                                    <td>{sw.software.name}</td>
                                    <td>{sw.software.description}</td>
                                    <td>{sw.software.version}</td>
                                    <td style={{width: "250px"}}>
                                        <Row style={{width: "250px"}}>
                                            <Col style={{width: "125px"}}>
                                                <Link to={"/edit/" + sw.software.id}>
                                                    <Button
                                                        variant={"dark"}
                                                        size={"sm"}
                                                        style={{width: "100%"}}
                                                    >
                                                        Изменить
                                                    </Button>
                                                </Link>
                                            </Col>
                                            <Col style={{width: "125px"}}>
                                                <Button
                                                    variant={"danger"}
                                                    size={"sm"}
                                                    style={{width: "100%"}}
                                                    onClick={() => deleteSoftware(sw.software.id)}
                                                >
                                                    Удалить
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export default ModeratorPage;
