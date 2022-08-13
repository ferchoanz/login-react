import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";
import axios from "../../plugins/axios";
import NavbarBase from "../NavbarBase";
import Table from "../Table";

export default function List() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [films, setFilms] = useState([]);
    const [loadApi, setLoadApi] = useState(false);

    const init = async () => {
        for (const film of user.films) {
            const id = film.split('/').at(-2);
            const response = await axios.get(`films/${id}`)
                .then(res => res.data)
                .catch(() => null);
            if (response) {
                setFilms((currentFilms) => [...currentFilms, { ...response, id }]);
            }
        }
    };

    useEffect(() => {
        if (loadApi) return;
        setLoadApi(true);
    }, [])

    useEffect(() => {
        if (!loadApi) return;
        init();
    }, [loadApi]);

    const localeDate = date => (new Date(date).toLocaleString());

    const headers = [
        { text: 'Title', value: 'title' },
        { text: 'Director', value: 'director' },
        { text: 'Opening Crawl', value: 'opening_crawl' },
        { text: 'Detail', value: 'detail' },
    ];

    const mapFilms = () => {
        return films.map(film => ({
            title: film.title,
            director: film.director,
            opening_crawl: film.opening_crawl,
            detail: <NavLink to={film.id}>Detail</NavLink>,
        }));
    };

    return (
        <div className="container-fluid">
            <NavbarBase />
            <h1>List</h1>
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                    Name: {user?.name}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    Creation: {localeDate(user?.created)}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <h3>Fimls</h3>
                    <Table headers={headers} items={mapFilms()} />
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}