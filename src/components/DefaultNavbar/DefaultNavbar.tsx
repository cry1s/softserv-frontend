import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function DefaultNavbar() {
    return (
        <>
            <Navbar bg="dark" expand="lg" data-bs-theme="dark" sticky="top" className={"py-3"}>
                <Container>
                    <Navbar.Brand href="/">SoftServ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/softserv-frontend/">Главная</Nav.Link>
                            <Nav.Link href="/softserv-frontend/#/new">Новое</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default DefaultNavbar;
