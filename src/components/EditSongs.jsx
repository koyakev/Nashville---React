import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function EditSongs() {
	const [songs, setSongs] = useState([])
	
	useEffect(() => {
		fetchSongs()
	}, [])
	
	const fetchSongs = async() => {
		try {
			let response = await axios.get('http://localhost:5000/song_list')
			
			setSongs(response.data)
		} catch(error) {
			console.error(error)
		}
	}
	
	return (
		<>
			<Link to="/">Home</Link>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Artist</th>
						<th colspan="2">Action</th>
					</tr>
				</thead>
				<tbody>
					{songs.length > 0 ? (
						songs.map(song => (
							<tr key={song.id}>
								<td>{song.title}</td>
								<td>{song.artist}</td>
								<td><button>Edit</button></td>
								<td><button>Delete</button></td>
							</tr>
						))
					) : (
						<tr>
							<td>No songs available</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default EditSongs