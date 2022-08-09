import './SingleCard.css';
import { Col, Image } from 'react-bootstrap';

function SingleCard({card, handleChoice}) {

	const handleClick = () => {
		handleChoice(card)
	}

    return (
	<div className='card'>
		<Col>
			<Image className='front' fluid rounded src={card.src} alt="card front" />
			<Image 
				className='back' fluid rounded 
				src="/img/cover.png"
				onClick={handleClick}
				alt="card back" />
		</Col>
	</div>
    )
}

export default SingleCard
  