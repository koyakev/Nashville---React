import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function Sheet() {
	const { id } = useParams();
	const [family, setFamily] = useState([]);
	const [section, setSection] = useState({
		intro: [],
		verse: [],
		prechorus: [],
		chorus: [],
		bridge: [],
		interlude: []
	})
	
	const handleChange = async(e) => {
		let key = e.target && e.target.value ? e.target.value : e;
		
		try {
			let response = await axios.get("http://localhost:5000/family_chords");
			let data = response.data
			
			data.forEach(data => {
				if(data.key == key) {
					setFamily(data)
				}
			}) 
		} catch (error) {
			console.log(error)
		}
	}
	
	const fetchSong = async() => {
		try {
			let response = await axios.get(`http://localhost:5000/song_list/${id}`);
			let data = response.data
			
			setSection(prevSection => ({
				...prevSection,
				intro: data.sequence.intro,
				verse: data.sequence.verse,
				prechorus: data.sequence.prechorus,
				chorus: data.sequence.chorus,
				bridge: data.sequence.bridge,
				interlude: data.sequence.interlude,
			}))
			
			handleChange(data.original)
		} catch(error) {
			console.error(error)
		}
	}
	
	useEffect(() => {
		console.log(id)
		fetchSong()
	}, [id])
	
	useEffect(() => {
		console.log(family)
	}, [family])
	
	return (
		<>
			<Link to="/">Back</Link>
			<select onChange={handleChange}>
				<option selected disabled>Transpose</option>
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
			
			{family && family.notes && (
				<div>
					<h3>Intro</h3>
					{section.intro.map((chord, index) => (
						chord == 0 ? (<br />) : (
							<span key={index}>{family.notes[chord-1]} </span>
						)
					))}
					<h3>Verse</h3>
					{section.verse.map((chord, index) => (
						chord == 0 ? (<br />) : (
							<span key={index}>{family.notes[chord-1]} </span>
						)
					))}
					<h3>Pre Chorus</h3>
					{section.prechorus.map((chord, index) => (
						chord == 0 ? (<br />) : (
							<span key={index}>{family.notes[chord-1]} </span>
						)
					))}
					<h3>Chorus</h3>
					{section.chorus.map((chord, index) => (
						chord == 0 ? (<br />) : (
							<span key={index}>{family.notes[chord-1]} </span>
						)
					))}
				</div>
			)}
		</>
	)
}

export default Sheet;