import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "../../plugins/axios";
import Table from "../Table";
import NavbarBase from "../NavbarBase";

export default function Detail() {
    const { id } = useParams();
    const [loadApi, setLoadApi] = useState(false);
    const [film, setFilm] = useState({ title: null });
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    const loadCharacters = async (values) => {
        for (const value of values) {
            const id = value.split('/').at(-2);
            const response = await axios.get(`people/${id}`)
                .then(res => res.data)
                .catch(() => null);
            if (response) {
                const homeworldId = response?.homeworld.split('/').at(-2);
                response.homeworld_name = await axios.get(`planets/${homeworldId}`).then(res => res.data.name).catch(() => '');
                setCharacters((currentCharacters) => [...currentCharacters, { ...response, id }]);
            }
        }
    };

    const init = async () => {
        const response = await axios.get(`films/${id}`)
            .then(res => res.data)
            .catch(() => null);
        if (response) {
            setFilm(response);
            await loadCharacters(response.characters);
        }
        setLoadApi(true);
    };

    useEffect(() => {
        if (loadApi) return;
        setLoadApi(true);
    }, [])

    useEffect(() => {
        if (!loadApi) return;
        init();
    }, [loadApi]);

    const headers = [
        { text: 'Name', value: 'name' },
        { text: 'Homeworld - Name', value: 'homeworld_name' },
        { text: 'Hair Color', value: 'hair_color' },
        { text: 'Height', value: 'height' },
    ];

    const back = () => {
        navigate('/list', { replace: true });
    };

    return (
        <div className="container-fluid">
            <NavbarBase />

            <div className="row">
                <div className="col-6">
                    <h1>Film: {film?.title}</h1>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary btn-lg mt-1" onClick={back}>Back</button>
                </div>
            </div>

            <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                    Name: {film?.title}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    Director: {film?.director}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    Producers: {film?.producer}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <h4>Opening Crawl:</h4>
                    {film?.opening_crawl}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <h3>Characters</h3>
                    <Table headers={headers} items={characters} />
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}