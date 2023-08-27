import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useUpdatePensionMutation} from '../../../../api/backoffice/pension.api'
import useInput from '../../../../shared/hooks/use-input'

import {Modal, Form, Button} from 'react-bootstrap'
import {BaseSpinner} from '../../../../shared/ui/BaseSpinner'
import {BaseErrorAlert} from '../../../../shared/ui/BaseErrorAlert'
import PropTypes from 'prop-types'
import {Pension} from '../../../../models/Pension'

const pensionUpdateModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	pension: PropTypes.instanceOf(Pension)
}

export const PensionUpdateModal = props => {
	const {t} = useTranslation()
	const [updatePension, {isLoading, isSuccess, isError, error}] = useUpdatePensionMutation()

	// name, monthlyPrice, description
	const name = useInput(value => Pension.validate('name', value), props.pension.name)
	const description = useInput(value => Pension.validate('description', value), props.pension.description)
	const monthlyPrice = useInput(value => Pension.validate('monthlyPrice', value), props.pension.monthlyPrice)

	const isFormValid = name.isValid && description.isValid && monthlyPrice.isValid
	const isConfirmButtonDisabled = !isFormValid

	const updatePensionHandler = () => {
		updatePension({
			id: props.pension.id,
			name: name.value,
			description: description.value,
			monthlyPrice: monthlyPrice.value
		})
	}

	useEffect(() => {
		if (isSuccess) {
			props.close()
		}
	}, [props, isSuccess])

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner/>
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={error.data.message}/>}
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>{t('pension_fields_name_label')}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t('pension_fields_name_placeholder')}
								name="name"
								value={name.value}
								onInput={name.inputHandler}
								onBlur={name.blurHandler}
								isInvalid={name.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(name.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>{t('pension_fields_monthlyPrice_label')}</Form.Label>
							<Form.Control
								type="number"
								placeholder={t('pension_fields_monthlyPrice_description')}
								name="monthlyPrice"
								value={monthlyPrice.value}
								onInput={monthlyPrice.inputHandler}
								onBlur={monthlyPrice.blurHandler}
								isInvalid={monthlyPrice.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(monthlyPrice.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>{t('pension_fields_description_label')}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t('pension_fields_description_placeholder')}
								name="description"
								value={description.value}
								onInput={description.inputHandler}
								onBlur={description.blurHandler}
								isInvalid={description.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(description.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={props.close}>
							{t('pension_updateModal_close')}
						</Button>
						<Button variant="primary" onClick={updatePensionHandler} disabled={isConfirmButtonDisabled}>
							{t('pension_updateModal_confirm')}
						</Button>
					</Modal.Footer>
				</>
			)
		}
	}

	return (
		<Modal show={props.isVisible} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>{t('pension_updateModal_title')}</Modal.Title>
			</Modal.Header>
			{conditionalRendering()}
		</Modal>
	)
}

PensionUpdateModal.propTypes = pensionUpdateModalProptypes

