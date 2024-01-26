import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/app";
import Container from "react-bootstrap/Container";
import { Button, Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import { useAuth } from '../../store/auth';

function RequestsPage() {
    const [requests, setRequests] = useState([]);
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const dispatch = useDispatch();
    const auth = useAuth();

    const [filterStatus, setFilterStatus] = useState("all");
    const [filterName, setFilterName] = useState("");

    const [time, setTime] = useState("");

    const load = (loader) => {
        if (loader) dispatch(setLoading(true));
        let filter = "?";
        if (filterStatus !== "all") {
            filter += "status=" + filterStatus + "&";
        }
        if (dateStart) {
            filter += "create_date_start=" + new Date(dateStart).getTime() / 1000 + "&"
        }
        if (dateEnd) {
            filter += "create_date_end=" + new Date(dateEnd).getTime() / 1000 + "&"
        }
        axios.get("/api/requests" + filter).then(res => {
            setRequests(res.data);
        }).finally(() => {
            loader && dispatch(setLoading(false))
        })
    }

    useEffect(() => {
        load(true);
    }, [])

    useEffect(() => {
        load(false)
    }, [time])

    useEffect(() => {
        load(true)
    }, [dateEnd, dateStart, dispatch, filterStatus])

    const translateStatus = (status) => {
        switch (status) {
            case "created":
                return "Создана";
            case "all":
                return "Все";
            case "processed":
                return "В обработке";
            case "completed":
                return "Выполнена";
            case "canceled":
                return "Отменена";
            case "deleted":
                return "Удалена";
            default:
                return "Неизвестно";
        }
    }

    return (
        <Container>
            <Card bg={"light"} className={"mt-4"} body>
                <Breadcrumbs name={"Заявки"}></Breadcrumbs>
            </Card>
            <Card bg={"light"} className={"mt-4"} body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Статус</th>
                            <th>Клиент</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Специалист</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.filter(r => r.username.startsWith(filterName)).sort((a, b) => a.request.created_at.secs_since_epoch > b.request.created_at.secs_since_epoch ? 0 : 1).map((r) => <tr key={r.request.id}>
                            <td>{r.request.id}</td>
                            <td>{translateStatus(r.request.status)}</td>
                            <td>{r.username}</td>
                            <td>{new Date(r.request.created_at?.secs_since_epoch * 1000).toLocaleString()}</td>
                            <td>{r.request.processed_at ? new Date(r.request.processed_at?.secs_since_epoch * 1000).toLocaleString() : "-"}</td>
                            <td>{r.request.completed_at ? new Date(r.request.completed_at?.secs_since_epoch * 1000).toLocaleString() : "-"}</td>
                            <td>{r.request.modername ?? "-"}</td>
                            <td style={{ width: "200px" }}>
                                <Row style={{ width: "200px" }}>
                                    <Col style={{ width: "100px" }}>
                                        <Link to={"/request/" + r.request.id}><Button variant={"dark"} size={"sm"} style={{ width: "100%" }}>Подробнее</Button></Link>
                                    </Col>
                                </Row>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default RequestsPage;
