import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {Button, Col, Form, Row} from "react-bootstrap";
import SoftwareCard from "../../components/SoftwareCard/SoftwareCard";
import Container from "react-bootstrap/Container";
import {SoftwareProperties} from '../SoftPage/SoftPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import {useDispatch} from "react-redux";
import axios from "axios";
import {setLoading} from "../../store/app";
import {Link} from "react-router-dom";
import cart from "../../assets/cart.png"
import {useAuth} from "../../store/auth";

function HomePage() {
    const auth = useAuth();
    const [softwares, setSoftwares] = React.useState<Array<SoftwareProperties>>([]);
    const [searchField, setSearchField] = React.useState<string>("");
    const [confirmedSearch, setConfirmedSearch] = React.useState<string>("");
    const [request, setRequest] = useState(null);
    const dispatch = useDispatch();

    const load = () => {
        dispatch(setLoading(true));
        axios.get(`/api/softwares${confirmedSearch ? `?search=${confirmedSearch}` : ""}`).then(({data}) => {
            console.log(data);
            setRequest(data.request_id);
            setSoftwares(data.softwares);
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const search = searchParams.get("search");
        if (search) {
            setSearchField(search);
        }
        load();
    }, [dispatch])

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
                    <Form onSubmit={(e) => {e.preventDefault(); e.stopPropagation(); setConfirmedSearch(searchField); load()}}>
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
                                <Button type="submit" variant={"dark"}>Найти</Button>
                            </Col>
                           <Col xs="auto" className={"ms-auto"}>
                                <Button variant={"light"} disabled={!request}>
                                    <Link to={"/request/" + request}><img src={cart} alt="cart" width={40} height={40}/></Link>
                                </Button>
                            </Col> 
                        </Row>
                    </Form>
                </Card>
                <div className={"w-full mt-4"}>
                    <Row xs={1} md={4} className="g-5">
                        {softwares.map((software) => (
                            <Col key={software.software.id}>
                                <SoftwareCard
                                    name={software.software.name}
                                    description={software.software.description}
                                    version={software.software.version}
                                    id={software.software.id}
                                    tags={software.tags}
                                    image={software.software.logo}
                                    source={software.software.source}
                                    showAddButton={true}
                                    callback={load}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default HomePage;
