import './App.css';
import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ "src": "/img/helmet-1.png", matched: false},
	{ "src": "/img/potion-1.png", matched: false},
	{ "src": "/img/ring-1.png", matched: false},
	{ "src": "/img/scroll-1.png", matched: false},
	{ "src": "/img/shield-1.png", matched: false},
	{ "src": "/img/sword-1.png", matched: false}
]



function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)

	// Shuffle deck, double cards & give random ID
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card, 
				id: Math.random()
			}))

		setCards(shuffledCards)
		setTurns(0)
	}

	// Decide which choice it is
	const handleChoice = (card) => {
		//if choiceOne is already assigned, assign choiceTwo
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}
	
	// Check if cards match
	useEffect(() =>{
		if(choiceOne && choiceTwo){
			if(choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if(card.src === choiceOne.src) {
							return {...card, matched: true}
						} else {
							return card
						}
					})
				})
				
				resetTurn()

			} else {
				resetTurn()
			}
		}
	}, [choiceTwo]) // Only fire when choice Two is assigned

	// When played, matched or not, the choices should be reset & a turn counted
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
	}

	return (
		<div className="App">
			<Container fluid="lg">
				<h1>Magic Match</h1>
				<Button variant="primary" onClick={shuffleCards}>Primary</Button>
			</Container>
			<Container>
				<div className='card-grid'>
					<Row xs={3}>
						{cards.map(card => (
							<SingleCard key={card.id} card={card} handleChoice={handleChoice}/>
						))}
					</Row>
				</div>
			</Container>
		</div>

	);
}

export default App;
