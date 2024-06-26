import {useState} from 'react'
import {StableValidationError} from '../model/Model'

const useInput = (validateFn, defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState(defaultValue)
	const [hadFocus, setHadFocus] = useState(!!enteredValue)

	// derived properties depending on states but which don't require their own state
	let errorMessage = ''
	let isValueValid = false

	try {
		isValueValid = validateFn(enteredValue)
		isValueValid = true
	} catch (error) {
		if (error instanceof StableValidationError) {
			errorMessage = error.message
		} else {
			// this is an unhandled error we do NOT want to catch it
			console.error(error.message)
			throw error
		}
	}
	const hasError = !isValueValid && hadFocus

	const inputHandler = event => {
		setEnteredValue(event.target.value)
	}

	const blurHandler = () => {
		setHadFocus(true)
	}

	const reset = () => {
		setEnteredValue(defaultValue)
		setHadFocus(false)
	}

	return {
		value: enteredValue,
		isValid: isValueValid,
		hasError,
		errorMessage,
		inputHandler,
		blurHandler,
		reset
	}
}

export default useInput
