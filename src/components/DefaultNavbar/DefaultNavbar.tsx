import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth} from "../../store/auth";
import {LinkContainer} from 'react-router-bootstrap'

function DefaultNavbar() {
    const login = useAuth();
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky="top" className={"py-3 justify-content-between"}>
                <Container>
                    <LinkContainer to={"/"}><Navbar.Brand>SoftServ</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to={"/"}><Nav.Link>Главная</Nav.Link></LinkContainer>
                            {login && <LinkContainer to={"/requests"}><Nav.Link>Заявки</Nav.Link></LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="me-auto">
                        {login ?
                            <>
                                <Nav.Link className={"fw-bold"}>Вошли как: {login.username}</Nav.Link>
                                <LinkContainer to={"/logout"}><Nav.Link>Выход</Nav.Link></LinkContainer>
                            </>
                            :
                            <>
                                <LinkContainer to={"/register"}><Nav.Link>Регистрация</Nav.Link></LinkContainer>
                                <LinkContainer to={"/login"}><Nav.Link>Вход</Nav.Link></LinkContainer>
                            </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default DefaultNavbar;
