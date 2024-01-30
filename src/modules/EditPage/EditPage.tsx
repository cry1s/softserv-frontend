import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {setLoading} from "../../store/app";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {Button, Form, Row} from "react-bootstrap";
import SearchDropdown from "../../components/SearchDropdown/SearchDropdown";
import Tag from "../../components/Tag/Tag";
import placeholder from "../../assets/placeholder.png"

function EditPage() {
    const {id} = useParams<{ id: string }>();
    const [name, setName] = useState("");
    const [version, setVersion] = useState("");
    const [source, setSource] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState(null);
    const [upload, setUpload] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [wantedTags, setWantedTags] = useState([]);
    const [realTags, setRealTags] = useState([]);

    useEffect(() => {
        dispatch(setLoading(true))
        axios.get("/api/software/" + id).then(res => {
            setName(res.data.software.name);
            setLogo(res.data.software.logo);
            setVersion(res.data.software.version);
            setDescription(res.data.software.description);
            setSource(res.data.software.source);
            setRealTags(res.data.tags);
            setWantedTags(res.data.tags);
            return axios.get("/api/tags");
        }).then((res) => setTags(res.data)).finally(() => dispatch(setLoading(false)))
    }, [dispatch, id])

    const submit = (e) => {
        dispatch(setLoading(true));
        axios.put("/api/software/" + id, {name, source, description, version, active: true}).then(() => {
            if (upload.length > 0) {
                const formData = new FormData();
                formData.append('file', upload[0]);
                axios.put("/api/software/" + id + "/add_image", formData)
            }
            const requests = [];
            realTags.filter(x => !wantedTags.includes(x)).forEach(t => requests.push(axios.delete("/api/software/"+id+"/remove_tag/"+t.id)))
            wantedTags.filter(x => !realTags.includes(x)).forEach(t => requests.push(axios.post("/api/software/"+id+"/add_tag/"+t.id)))

            return axios.all(requests);
        }).finally(() => {
            navigate("/soft/" + id);
            dispatch(setLoading(false));
        })
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Form className={"mt-4"} onSubmit={submit}>
                <Card bg={"light"} className={"mt-4"} body>
                    <Breadcrumbs name={"Программа"} path={[{name: "Услуги ", path: "/services"}]}></Breadcrumbs>
                </Card>
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
                        <Row style={{width: "200px", marginBottom: "5px"}}><img width={"150px"} src={logo || placeholder}></img></Row>
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
                    <Button type="submit" variant={"dark"}>Обновить</Button>
                    <Link to={"/moderator"}><Button className={"mx-4"} variant={"dark"}>Отмена</Button></Link>
                </Card>
            </Form>
        </Container>
    );
}


export default EditPage;
