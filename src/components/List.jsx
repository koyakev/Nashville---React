import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function List() {
	const [songs, setSongs] = useState([])
	
	const fetchSongs = async() => {
		try {
			let response = await axios.get('http://localhost:5000/song_list');
			setSongs(response.data)
			console.log(response.data)
		} catch(error) {
			console.error(error)
		}
	}
	
	useEffect(() => {
		fetchSongs()
	}, [])
	
	useEffect(() => {
		console.log(songs)
	}, [songs])
	
	return (
		<>
			<p>Hi</p>
			<Link to='/add'>Add Song</Link>
			<table>
				<thead>
					<tr>
						<th>Song Title</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{songs.length > 0 ? (
						songs.map(song => (
							<tr key={song.id}>
								<td><Link to={`sheet/${song.id}`}>{song.title}</Link></td>
								<td>{song.artist}</td>
							</tr>
						))
					) : (
						<tr>
							<td>No songs available.</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default List;