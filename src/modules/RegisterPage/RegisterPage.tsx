import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/app";

function RegisterPage() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const login = () => {
        dispatch(setLoading(true));
        fetch(
            "/api/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User registered successfully")
                    setSuccess(true);
            }).finally(() => {
                dispatch(setLoading(false));
        });
    }

    return (
        !success ?
            <Container>
                <Card bg={"light"} className={"mt-4 mx-auto"} body style={{width: '40%'}}>
                    <Card.Title>Регистрация</Card.Title>
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
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row>
                            <Col xs="auto">
                                <Button type="submit" variant={"dark"}>Регистрация</Button>
                            </Col>
                            <Col xs="auto">
                                <Link to={"/login"}><Button type="submit" variant={"dark"}>Вход</Button></Link>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>
            :
            <Container>
                <Card bg={"light"} className={"mt-4 mx-auto"} body style={{width: '40%'}}>
                    <Card.Title>Регистрация</Card.Title>
                    <Card.Text>Регистрация прошла успешно. Перейдите на страницу входа.</Card.Text>
                    <Link to={"/login"}><Button type="submit" variant={"dark"}>Вход</Button></Link>
                </Card>
            </Container>
    );
}

export default RegisterPage;
