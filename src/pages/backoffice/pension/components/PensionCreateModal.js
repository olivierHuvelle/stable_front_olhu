import {useCallback, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useAddPensionMutation} from '../../../../api/backoffice/pension.api'
import useInput from '../../../../shared/hooks/use-input'

import {Modal, Form, Button} from 'react-bootstrap'
import {BaseSpinner} from '../../../../shared/ui/BaseSpinner'
import {BaseErrorAlert} from '../../../../shared/ui/BaseErrorAlert'
import PropTypes from 'prop-types'
import {Pension} from '../../../../models/Pension'

const pensionCreateModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
}

export const PensionCreateModal = props => {
	const {t} = useTranslation()
	const [addPension, {isLoading, isSuccess, isError, error}] = useAddPensionMutation()

	const name = useInput(value => Pension.validate('name', value))
	const description = useInput(value => Pension.validate('description', value))
	const monthlyPrice = useInput(value => Pension.validate('monthlyPrice', value), 1)

	const formResetHandler = useCallback(() => {
		[name, description, monthlyPrice].forEach(field => {
			field.reset()
		})
	}, [name, description, monthlyPrice])

	const addPensionHandler = () => {
		addPension({
			name: name.value,
			description: description.value,
			monthlyPrice: monthlyPrice.value
		})
	}

	const isFormValid = name.isValid && description.isValid && monthlyPrice.isValid
	const isConfirmButtonDisabled = !isFormValid

	useEffect(() => {
		if (isSuccess) {
			formResetHandler()
			props.close()
		}
	}, [props, formResetHandler, isSuccess])

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner/>
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={error}/>}
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
							{t('pension_createModal_close')}
						</Button>
						<Button variant="primary" onClick={addPensionHandler} disabled={isConfirmButtonDisabled}>
							{t('pension_createModal_confirm')}
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

PensionCreateModal.propTypes = pensionCreateModalProptypes