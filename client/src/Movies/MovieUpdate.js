import React, { useState, useEffect } from "react";
import axios from "axios";


const MovieUpdate = (props, match, history) => {

    console.log('here is the match object', props.match.params.id);

    const [editMovie, setEditMovie] = useState(
        {
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []
        }
    );

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res=> {
                console.log('here is the get from MovieUpdate', res.data);
                setEditMovie(res.data);
            })
            .catch(err => console.log('Did not get movie from MovieUpdate', err));

    }, [props.match.params.id]);

    const handleChange = event => {

        setEditMovie({ ...editMovie, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, editMovie)
            .then(res => {
                console.log('this is post response for MovieUpdate', res);
                setEditMovie({
                    title: '',
                    director: '',
                    metascore: '',
                    stars:[]
                })
                props.setSavedList([...props.savedList, res])
                props.history.push('/');
            })
    };

    return (
        <div>
            <h2>Edit Movie Information</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    type='text'
                    name='title'
                    placeholder='Enter Title'
                    onChange={handleChange}
                    value={editMovie.title}
                />
                <label htmlFor='director'>Director</label>
                <input
                    id='director'
                    type='text'
                    name='director'
                    placeholder='Enter Director'
                    onChange={handleChange}
                    value={editMovie.director}
                />
                <label htmlFor='metascore'>Metascore</label>
                <input
                    id='metascore'
                    type='text'
                    name='metascore'
                    placeholder='Enter Metascore'
                    onChange={handleChange}
                    value={editMovie.metascore}
                />
                <label htmlFor='stars'>Stars</label>
                <input
                    id='stars'
                    type='text'
                    name='stars'
                    placeholder='Enter Stars'
                    onChange={handleChange}
                    value={editMovie.stars}
                />
                <button type='submit'>Update Information</button>
            </form>
        </div>
    )
}
export default MovieUpdate;
