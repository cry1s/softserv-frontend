import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/app";
import {Link, useNavigate} from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Tag from "../../components/Tag/Tag";
import SearchDropdown from "../../components/SearchDropdown/SearchDropdown";

function NewPage() {
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [source, setSource] = useState("");
    const [description, setDescription] = useState("");
    const [upload, setUpload] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [wantedTags, setWantedTags] = useState([]);

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get("/api/tags").then(res => {
            setTags(res.data)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }, [dispatch])

    const submit = (e) => {
        dispatch(setLoading(true));
        axios.post("/api/software", {name, source, description, version, active: true}).then((res) => {
            let requests = [];
            if (upload.length > 0) {
                const formData = new FormData();
                formData.append('file', upload[0]);
                requests.push(axios.put("/api/software/" + res.data.soft.id + "/add_image", formData))
            }

            wantedTags.forEach(t => requests.push(axios.post("/api/software/" + res.data.soft.id + "/add_tag/" + t.id)))

            return axios.all(requests);
        }).finally(() => {
            navigate("/");
            dispatch(setLoading(false));
        })
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Card bg={"light"} className={"mt-4"} body>
                <Breadcrumbs name={"Программа"} path={[{name: "Услуги ", path: "/services"}]}></Breadcrumbs>
            </Card>
            <Form className={"mt-4"} onSubmit={submit}>
                <Card bg={"light"} className={"mt-4 mx-auto"} style={{width: "60%"}} body>
                    <Card.Title>Программа</Card.Title>
                    <Form.Group className="mb-3" controlId="editForm.ControlName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Имя"}
                            value={name}
                            onChange={(ev) => {
                                setName(ev.target.value)
                            }}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editForm.ControlVers">
                        <Form.Label>Версия</Form.Label>
                        <Form.Control
                            type="text"
                            value={version}
                            placeholder={"Версия"}
                            onChange={(ev) => {
                                setVersion(ev.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editForm.ControlSource">
                        <Form.Label>Источник</Form.Label>
                        <Form.Control
                            type="text"
                            value={source}
                            placeholder={"Источник"}
                            onChange={(ev) => {
                                setSource(ev.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="editForm.ControlDesc">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as={"textarea"}
                            placeholder={"Описание"}
                            value={description}
                            onChange={(ev) => {
                                setDescription(ev.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="editForm.ControlLogo" className="mb-3">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control type="file" onChange={e => setUpload(e.target.files)}/>
                    </Form.Group>

                </Card>
                <Card bg={"light"} className={"mt-4 mx-auto"} style={{width: "60%"}} body>
                    <Form.Label>Теги</Form.Label>
                    <Row className="mb-2 g-2" xs={"auto"}>
                        {wantedTags.map((tag) => (
                            <Tag key={tag.id} name={tag.name} id={tag.id} onClick={(id) => {
                                setWantedTags((tg) => tg.filter(t => t.id !== id))
                            }}></Tag>
                        ))}
                    </Row>
                    <SearchDropdown items={tags.filter((t => !wantedTags.find(w => w.id === t.id)))} callback={(e) => {
                        setWantedTags((wantedTags) => {
                            return [...wantedTags, e]
                        })
                    }}></SearchDropdown>
                </Card>
                <Card bg={"light"} className={"mt-4 mx-auto mb-5"} style={{width: "60%"}} body>
                    <Button type="submit" variant={"dark"}>Создать</Button>
                    <Link to={"/moderator"}><Button className={"mx-4"} variant={"dark"}>Отмена</Button></Link>
                </Card>
            </Form>
        </Container>
    );
}

export default NewPage;

