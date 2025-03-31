import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Add() {
	const navigation = useNavigate()
	const [song, setSong] = useState({
		title: "",
		artist: "",
		original: "",
		intro: "",
		verse: "",
		prechorus: "",
		chorus: "",
		bridge: "",
		interlude: ""
	})
	
	const handleChange = (e) => {
		const { name, value } = e.target
		
		setSong(prevSong => ({
			...prevSong,
			[name]: value
		}))
	}
	
	const handleSubmit = async(e) => {
		e.preventDefault()
		try {
			let response = await axios.post('http://localhost:5000/song_list', {
				title: song.title,
				artist: song.artist,
				original: song.original,
				sequence: {
					intro: song.intro.split(',').map(item => parseInt(item.trim(), 10)),
					verse: song.verse.split(',').map(item => parseInt(item.trim(), 10)),
					prechorus: song.prechorus.split(',').map(item => parseInt(item.trim(), 10)),
					chorus: song.chorus.split(',').map(item => parseInt(item.trim(), 10)),
					bridge: song.bridge.split(',').map(item => parseInt(item.trim(), 10)),
					interlude: song.interlude.split(',').map(item => parseInt(item.trim(), 10)),
				}
			});
			
			navigation('/')
		} catch(error) {
			console.error(error)
		}
	}
	
	return (
		<>
			<Link to="/">Back</Link>
			<p>Add</p>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" value={song.title} onChange={e => setSong(prevSong => ({...prevSong, title: e.target.value}))} placeholder="Title" />
				<input type="text" name="artist" value={song.artist} onChange={e => setSong(prevSong => ({...prevSong, artist: e.target.value}))} placeholder="Artist" />
				<select name="original" onChange={e => setSong(prevSong => ({...prevSong, original: e.target.value}))}>
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
				<input type="text" name="intro" value={song.intro} onChange={handleChange} placeholder="Intro" />
				<input type="text" name="verse" value={song.verse} onChange={handleChange} placeholder="Verse" />
				<input type="text" name="prechorus" value={song.prechorus} onChange={handleChange} placeholder="Prechorus" />
				<input type="text" name="chorus" value={song.chorus} onChange={handleChange} placeholder="Chorus" />
				<input type="text" name="bridge" value={song.bridge} onChange={handleChange} placeholder="Bridge" />
				<input type="text" name="interlude" value={song.interlude} onChange={handleChange} placeholder="Interlude" />
				<button type="submit">Add</button>
			</form>
		</>
	)
}

export default Add;