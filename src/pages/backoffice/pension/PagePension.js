import {useState} from 'react'
import {useGetPensionsQuery} from '../../../api/backoffice/pension.api'
import {BaseSpinner} from '../../../shared/ui/BaseSpinner'
import {BaseErrorAlert} from '../../../shared/ui/BaseErrorAlert'
import {PensionCard} from './components/PensionCard'
import {Pension} from '../../../models/Pension'
import useModal from '../../../shared/hooks/use-modal'
import {PensionDeleteModal} from './components/PensionDeleteModal'
import {PensionUpdateModal} from './components/PensionUpdateModal'
import {PensionCreateModal} from './components/PensionCreateModal'
import {useTranslation} from 'react-i18next'

export const PagePension = () => {
	const { t } = useTranslation()

	const {
		data: pensions,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetPensionsQuery()

	const [deletePension, setDeletePension] = useState(undefined)
	const [updatePension, setUpdatePension] = useState(undefined)

	const createModal = useModal()
	const deleteModal = useModal(
		false,
		pension => {setDeletePension(pension)},
		() => {setDeletePension(null)}
	)
	const updateModal = useModal(
		false,
		pension => setUpdatePension(pension),
		() => setUpdatePension(null)
	)

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner/>
		} else if (isError) {
			return <BaseErrorAlert message={error}/>
		} else if (isSuccess) {
			return (
				<>
					{pensions.map(pension => {
						const pensionInstance = new Pension(pension)
						return <PensionCard pension={pensionInstance} key={pensionInstance.id} deleteModal={deleteModal} updateModal={updateModal} />
					})}
				</>
			)
		}
	}

	return (
		<div>
			<header className="col-10 col-md-8 mx-auto my-5 d-flex align-items-center">
				<h2>{t('pension_page_title')}</h2>
				<button className="hover:cursor mx-3 btn btn-transparent" onClick={createModal.openHandler}><i className="bi bi-plus-circle fs-3" /></button>
			</header>
			{conditionalRendering()}
			{createModal.isVisible && <PensionCreateModal isVisible={createModal.isVisible} close={createModal.closeHandler} />}
			{deleteModal.isVisible && <PensionDeleteModal isVisible={deleteModal.isVisible} close={deleteModal.closeHandler} pension={deletePension} />}
			{updateModal.isVisible && <PensionUpdateModal isVisible={updateModal.isVisible} close={updateModal.closeHandler} pension={updatePension} />}
		</div>
	)
}