import React from 'react';
import {Button, Card, CardText, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setLogin} from "../../store/auth";
import {setLoading} from "../../store/app";

function LoginPage() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [loginFailed, setLoginFailed] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = () => {
        dispatch(setLoading(true))
        axios.post("/api/auth/login", {username, password}).then(({data}) => {
            setLoginFailed(false)
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
            let payload = JSON.parse(atob(data.token.split(".")[1]));
            dispatch(setLogin({username: payload.uname, moderator: payload.moderator, uid: payload.uid}))
            navigate("/");
        }).catch((e) => {
            console.log(e);
            setLoginFailed(true);
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

    return (
        <Container>
            <Card bg={"light"} className={"mt-4 mx-auto"} body style={{width: '40%'}}>
                <Card.Title>Вход</Card.Title>
                <Form onSubmit={e => {
                    login();
                    e.stopPropagation();
                    e.preventDefault();
                }}>
                    <Form.Control
                        className={"my-4"}
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"mb-4"}
                        type="text"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {loginFailed && <CardText>Wrong Username or Password</CardText>}
                    <Row>
                        <Col xs="auto">
                            <Button type="submit" variant={"dark"}>Вход</Button>
                        </Col>
                        <Col xs="auto">
                            <Link to={"/register"}><Button variant={"dark"}>Регистрация</Button></Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}

export default LoginPage;
