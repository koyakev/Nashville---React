import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

function EditSong () {
	const navigation = useNavigate()
	const { id } = useParams()
	const [song, setSong] = useState({
		title: "",
		artist: "",
		original: "",
		sequence: {
			intro: "",
			verse: "",
			prechorus: "",
			chorus: "",
			bridge: "",
			interlude: ""
		}
	})
	
	const fetchSong = async() => {
		try {
			let response = await axios.get(`http://localhost:5000/song_list/${id}`)
			
			setSong({
				title: response.data.title,
				artist: response.data.artist,
				original: response.data.original,
				sequence: {
					intro: response.data.sequence.intro.join(','),
					verse: response.data.sequence.verse.join(','),
					prechorus: response.data.sequence.prechorus.join(','),
					chorus: response.data.sequence.chorus.join(','),
					bridge: response.data.sequence.bridge.join(','),
					interlude: response.data.sequence.interlude.join(',')
				}
			})
		} catch(error) {
			console.error(error)
		}
	}
	
	const handleChange = (e) => {
		const { name, value } = e.target
	
		setSong(prevSong => ({
			...prevSong,
			sequence: {
				...prevSong.sequence,
				[name]: value
			}
		}))
	}
	
	const handleSubmit = async(e) => {
		e.preventDefault()
		try {
			let response = await axios.put(`http://localhost:5000/song_list/${id}`, {
				title: song.title,
				artist: song.artist,
				original: song.original,
				sequence: {
					intro: song.sequence.intro.split(','),
					verse: song.sequence.verse.split(','),
					prechorus: song.sequence.prechorus.split(','),
					chorus: song.sequence.chorus.split(','),
					bridge: song.sequence.bridge.split(','),
					interlude: song.sequence.interlude.split(',')
				}
			});
			
			console.log(response)
			navigation('/editsongs')
		} catch(error) {
			console.error(error)
		}		
	}
	
	const handleDelete = async(e) => {
		e.preventDefault()
		
		try{
			let response = await axios.delete(`http://localhost:5000/song_list/${id}`)
			
			navigation('/editsongs')
		} catch(error) {
			console.error(error)
		}
	}
	
	useEffect(() => {
		fetchSong()
		console.log(song.sequence.chorus)
	}, [])
	
	return (
		<>
			<Link to='/editsongs'>Back</Link>
			{song && song.sequence ? (
				<>
					<form method="POST" onSubmit={handleSubmit}>
						<input type="text" value={song.title} onChange={e => setSong(prevSong => ({...prevSong, title: e.target.value}))} name="title" />
						<input type="text" value={song.artist} onChange={e => setSong(prevSong => ({...prevSong, artisti: e.target.value}))} name="artist" />
						<select onChange={e => setSong(prevSong => ({...prevSong, original: e.target.value}))} name="original" >
							<option selected disabled>Select Key</option>
							<option value={"A"}>A</option>
							<option value={"Bb"}>Bb</option>
							<option value={"B"}>B</option>
							<option value={"C"}>C</option>
							<option value={"C#"}>C#</option>
							<option value={"D"}>D</option>
							<option value={"D#"}>D#</option>
							<option value={"E"}>E</option>
							<option value={"F"}>F</option>
							<option value={"F#"}>F#</option>
							<option value={"G"}>G</option>
							<option value={"G#"}>G#</option>
						</select>
						<input type="text" value={song.sequence.intro} onChange={handleChange} name="intro" />
						<input type="text" value={song.sequence.verse} onChange={handleChange} name="verse" />
						<input type="text" value={song.sequence.prechorus} onChange={handleChange} name="prechorus" />
						<input type="text" value={song.sequence.chorus} onChange={handleChange} name="chorus" />
						<input type="text" value={song.sequence.bridge} onChange={handleChange} name="bridge" />
						<input type="text" value={song.sequence.interlude} onChange={handleChange} name="interlude" />
						<button type="submit">Edit</button>
					</form>
					<button onClick={handleDelete}>Delete</button>
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	)
}

export default EditSong