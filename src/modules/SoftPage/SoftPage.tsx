import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./SoftPage.css"
import img from "../../assets/placeholder.png"
import {Button, Col, Row} from "react-bootstrap";
import Tag, {TagProperties} from "../../components/Tag/Tag";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {useAuth} from "../../store/auth";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/app";

interface SoftwareProperties {
    software: {
        source: string;
        id: number
        name: string,
        description: string,
        version: string,
        logo: string | null
    }
    tags: Array<TagProperties>
}

function SoftPage() {
    const {id} = useParams<{ id: string }>();
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [software, setSoftware] = React.useState<SoftwareProperties>({
        software: {
            id: 0,
            name: "",
            description: "",
            version: "",
            logo: img,
            source: ""
        },
        tags: []
    });

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get(`/api/software/${id}`)
            .then(({data}) => {
                setSoftware(data);
            }).catch((e) => {
            console.log(e)
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }, [dispatch, id])

    const addToCart = () => {
        dispatch(setLoading(true))
        axios.post("/api/request/add", {software_id: parseInt(id)}).then(() => {
            navigate("/")
        }).catch(() => {
            console.log("e");
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }

    return (
        <Container>
            <Card bg={"light"} className={"mt-4"} body>
                <Breadcrumbs name={software.software.name}></Breadcrumbs>
            </Card>
            <Card bg={"light"} className={"mt-4 sw-card"} body>
                    <Row className={"g-4"} xs={1} md={4}>
                        <Col style={{width: "auto"}}>
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
                                <Card.Link href={software.software.source} target={"_blank"} rel="noreferrer">
                                    Источник
                                </Card.Link>
                            <Row className="my-1 g-2" xs={"auto"}>
                                {software.tags.map((tag) => (
                                    <Tag key={tag.id} name={tag.name} id={tag.id}></Tag>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    {auth && <Row className={"mt-4"}>
                        <Col>
                            <Button variant={"dark"} onClick={addToCart}>Добавить в корзину</Button>
                        </Col>
                    </Row>}
                    <Card.Text className={"mt-4"}>
                        {software.software.description}
                    </Card.Text>
                </Card>
            </Container>
    );
}

export default SoftPage;
export type {SoftwareProperties};
