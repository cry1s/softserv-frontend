import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "react-bootstrap/Card";
import SoftwareCard from "../../components/SoftwareCard/SoftwareCard";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useCart} from "../../store/cart";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/app";
import { useAuth } from '../../store/auth';

function CartPage() {
    const {id} = useParams<{ id: string }>();
    const [softwares, setSoftwares] = useState([]);
    const [request, setRequest] = useState([]);
    const [host, setHost] = useState("");
    const [pass, setPass] = useState("");
    const [done, setDone] = useState(false);
    const dispatch = useDispatch();
    const login = useAuth();

    const load = () => {
        dispatch(setLoading(true));
        axios.get("/api/request/" + id).then(({data}) => {
            console.log(data);
            setSoftwares(data.request.softwares)
            setRequest(data.request.request)
            setHost(data.request.request.ssh_address)
            setPass(data.request.request.ssh_password)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

    useEffect(() => {
        load()
    }, []);

    const confirm = (e) => {
        dispatch(setLoading(true));
        axios.put("/api/request/" + id, {ssh_address: host, ssh_password: pass})
            .then(() => {
                return axios.patch("/api/request/" + id + '/user', {status: "processed"})
            })
            .then(() => {
                setDone(true);
            })
            .catch(e => {
                console.log(e)
            }).finally(() => {
                dispatch(setLoading(false));
        })
        e.preventDefault();
        e.stopPropagation();
    }

    const deleteRequest = () => {
        dispatch(setLoading(true));
        axios.patch("/api/request/" + id + '/user', {status: "deleted"}).then(() => {
            setDone(true);
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }

    const removeSoftware = (sid) => {
        dispatch(setLoading(true));
        axios.delete("/api/request/"+id+"/remove_software/"+sid).finally(() => {
            dispatch(setLoading(false));
            load();
        })
    }


    return (
        <Container>
            {!done ?
            <Row className="g-4">
                <Col sm={8}>
                    <Card bg={"light"} className={"mt-4"} body>
                        <Breadcrumbs name={"Корзина"}></Breadcrumbs>
                    </Card>
                    <div className={"w-full mt-4"}>
                        {softwares.length > 0 ? <Row xs={1} md={2} className="g-4">
                            {softwares.map(sw =>{
                                console.log(sw);
                                return <Col key={sw.id}>
                                    <SoftwareCard
                                        onDelete={request.status === "created" ? removeSoftware : undefined}
                                        id={sw.id}
                                        name={sw.name}
                                        description={sw.description}
                                        version={sw.version}
                                        tags={[]}
                                        image={sw.logo}
                                        source={sw.source}
                                    />
                                </Col>}
                            )}
                        </Row> : <h1 className={"text-center empty-cart"}>Корзина пуста</h1>}
                    </div>
                </Col>
                <Col sm={4}>
                    <Card bg={"light"} className={"mt-4"} body>
                        {request.status === "created" && <Card.Title>Оформление заявки</Card.Title>}
                        {request.status === "processed" && <Card.Title>Заявка в обработке</Card.Title>}
                        {["completed", "canceled"].includes(request.status) && <Card.Title>Операция завершена</Card.Title>}
                        <Card.Text className={"mt-4"}>
                            {request.status === "created" && "Введите данные SSH и подтвердите оформление заявки."}
                            {request.status === "processed" && "Вернитесь в каталог, чтобы оформить еще заявку!"}
                            {request.status === "completed" && "Вернитесь в каталог, чтобы оформить заявку!"}
                        </Card.Text>
                        <Form onSubmit={confirm}>
                            <Form.Control
                                disabled={request.status !== "created"}
                                type="text"
                                placeholder="SSH Host"
                                className=" mr-sm-2 mt-4"
                                value={host}
                                onChange={(e) => {
                                    setHost(e.target.value);
                                }}
                                required
                            />
                            <Form.Control
                                disabled={request.status !== "created"}
                                type="text"
                                placeholder="SSH Password"
                                className=" mr-sm-2 mt-2 mb-4"
                                value={pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                required
                            />
                            { !login?.moderator && request.status === "created" && <Button type="submit" variant={"dark"}>Подтвердить</Button> }
                            { !login?.moderator && request.status === "created" && <Button variant={"dark"} onClick={deleteRequest} className={"ms-2"}>Удалить</Button> }
                        </Form>
                    </Card>
                </Col>
            </Row>
            :
                <Card bg={"light"} className={"mt-4"} body>
                    <Card.Title>Операция завершена</Card.Title>
                    <Card.Text>Вернитесь в каталог, чтобы оформить заявку!</Card.Text>
                    <Link to={"/"}><Button variant={"dark"}>Каталог</Button></Link>
                </Card>
            }

        </Container>
    );
}

export default CartPage;
