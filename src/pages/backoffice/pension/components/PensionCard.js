import {Card, Button, Row, Col} from 'react-bootstrap'
import {Pension} from '../../../../models/Pension'
import PropTypes from 'prop-types'

const pensionCardProptypes = {
	pension: PropTypes.instanceOf(Pension),
	deleteModal: PropTypes.object,
	updateModal: PropTypes.object
}

export const PensionCard = props => {
	return (
		<Card className="col-10 col-md-8 mx-auto mb-3">
			<Card.Header className="d-flex justify-content-between overflow-hidden align-items-center">
				<Card.Title>{props.pension.name}</Card.Title>
				<Card.Title>{props.pension.monthlyPrice}€</Card.Title>
			</Card.Header>
			<Card.Body>
				<Row>
					<Col xs={12} sm={6} md={8}>
						<p>{props.pension.description}</p>
					</Col>
					<Col xs={12} sm={6} md={4} className="d-none d-md-block">
						<Button variant="secondary" className="mx-2" onClick={() => {
							props.updateModal.openHandler(props.pension)
						}}><i className="bi bi-pencil fs-3"/></Button>
						<Button variant="danger" onClick={() => {
							props.deleteModal.openHandler(props.pension)
						}}><i className="bi bi-trash3 fs-3"/></Button>
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer className="d-md-flex d-md-none justify-content-center">
				<div className="d-flex justify-content-center align-items-center">
					<Button variant="secondary" className="mx-2" onClick={() => {
						props.updateModal.openHandler(props.pension)
					}}><i className="bi bi-pencil fs-3"/></Button>
					<Button variant="danger" onClick={() => {
						props.deleteModal.openHandler(props.pension)
					}}><i className="bi bi-trash3 fs-3"/></Button>
				</div>
			</Card.Footer>
		</Card>
	)
}

PensionCard.propTypes = pensionCardProptypes
