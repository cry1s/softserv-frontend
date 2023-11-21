import React from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "./SoftPage.css"
import img from "../../assets/placeholder.png"
import {Col, Row} from "react-bootstrap";
import Tag from "../../components/Tag/Tag";
import {useParams} from "react-router-dom";

function SoftPage() {
    const {id} = useParams();
    console.log(id)
    return (
        <Container>
            <Card bg={"light"} className={"mt-4 sw-card"} body>
                <Row className={"g-4"} xs={1} md={4}>
                    <Col style={{width: "auto"}}>
                        <Card.Img src={img} className={"sw-img"}/>
                    </Col>
                    <Col className={"w-"}>
                        <Card.Title>software8</Card.Title>
                        <Card.Subtitle>Версия: 8.0</Card.Subtitle>
                        <Row className={"g-2 mt-1"} xs={1} md={4}>
                            <Tag name={"tag8"}></Tag>
                            <Tag name={"tag8"}></Tag>
                            <Tag name={"tag8"}></Tag>
                            <Tag name={"tag8"}></Tag>
                        </Row>
                    </Col>
                </Row>
                <Card.Text className={"mt-4"}>Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.
                    Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона,
                    а также реальное распределение букв и пробелов в абзацах, которое не получается при простой
                    дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
                    вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по
                    ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего
                    настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии
                    появились по ошибке, некоторые - намеренно (например, юмористические варианты).</Card.Text>
            </Card>
        </Container>
    );
}

export default SoftPage;
