import {Model} from '../shared/model/Model'
import isLength from 'validator/es/lib/isLength'

export class Pension extends Model {
	static propertyValidatorMapper = {
		name: {
			validator: this.validateName,
			errorMessage: 'pension_validation_name'
		},
		description: {
			validator: this.validateDescription,
			errorMessage: 'pension_validation_description'
		},
		monthlyPrice: {
			validator: this.validateMonthlyPrice,
			errorMessage: 'pension_validation_monthlyPrice'
		}
	}

	static validateName(value) {
		return isLength(value ? value.trim() : '', {min: 1, max: 255})
	}

	static validateDescription(value) {
		return isLength(value ? value.trim() : '', {min: 1, max: 255})
	}

	static validateMonthlyPrice(value) {
		if (isNaN(Number(value))) {
			return false
		}
		return Number(value) > 0.0
	}


	constructor(pensionObj) {
		super()
		const {id, name, description, monthlyPrice, createdAt, updatedAt} = pensionObj
		this.id = id
		this.name = name
		this.description = description
		this.monthlyPrice = Number(monthlyPrice)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}