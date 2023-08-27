import {useEffect} from 'react'
import {useDeletePensionMutation} from '../../../../api/backoffice/pension.api'
import {useTranslation} from 'react-i18next'
import {Button, Modal} from 'react-bootstrap'
import {BaseSpinner} from '../../../../shared/ui/BaseSpinner'
import {BaseErrorAlert} from '../../../../shared/ui/BaseErrorAlert'
import PropTypes from 'prop-types'
import {Pension} from '../../../../models/Pension'

const pensionDeleteModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	pension: PropTypes.instanceOf(Pension)
}

export const PensionDeleteModal = props => {
	const {t} = useTranslation()
	const [deletePension, {isLoading, isSuccess, isError, error}] = useDeletePensionMutation()

	const deletePensionHandler = () => {
		deletePension(props.pension)
	}

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner/>
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={error.data.message}/>}
					<p>{t('pension_deleteModal_description')}</p>
				</>
			)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			props.close()
		}
	}, [isSuccess, props])

	return (
		<Modal show={props.isVisible} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>{t('pension_deleteModal_title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{conditionalRendering()}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.close}>
					{t('pension_deleteModal_close')}
				</Button>
				<Button variant="primary" onClick={deletePensionHandler} disabled={isError}>
					{t('pension_deleteModal_confirm')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

PensionDeleteModal.propTypes = pensionDeleteModalProptypes