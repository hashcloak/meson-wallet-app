import { useState } from 'react'

import { Icon } from '../../atoms/Icon/Icon'
import EditOwnerModal from '../EditOwnerModal/EditOwnerModal'
import RemoveOwnerModal from '../RemoveOwnerModal/RemoveOwnerModal'
import ReplaceOwnerModal from '../ReplaceOwnerModal/ReplaceOwnerModal'

import { OwnerType } from './EditOwners'

import EthAddress from '~/stories/utils/Ethereum/EthAddress'
import Spacer from '~/utils/Spacer'

const OwnerRow: React.FC<{ owner: OwnerType }> = ({ owner }) => {
  const [isOpenEditOwnerModal, setIsOpenEditOwnerModal] = useState(false)
  const [isOpenReplaceOwnerModal, setIsOpenReplaceOwnerModal] = useState(false)
  const [isOpenRemoveOwnerModal, setIsOpenRemoveOwnerModal] = useState(false)

  const handleEditOwnerModal = (): void => {
    setIsOpenEditOwnerModal(!isOpenEditOwnerModal)
  }
  const handleReplaceOwnerModal = (): void => {
    setIsOpenReplaceOwnerModal(!isOpenReplaceOwnerModal)
  }
  const handleRemoveOwnerModal = (): void => {
    setIsOpenRemoveOwnerModal(!isOpenRemoveOwnerModal)
  }
  return (
    <div className='flex flex-row mb-2' key={owner.address}>
      <EthAddress
        ethAddress={owner.address}
        size={4.5}
        length={'full'}
        walletName={owner.name}
      />
      <Spacer size={40} axis={'horizontal'} />
      <div className='flex flex-row items-center'>
        <Spacer size={8} axis={'horizontal'} />
        <button type='button' onClick={handleEditOwnerModal}>
          <Icon type={'Edit'} size={'lg'} color={'main'} />
        </button>

        <Spacer size={8} axis={'horizontal'} />

        <button type='button' onClick={handleReplaceOwnerModal}>
          <Icon type={'Change'} size={'lg'} color={'light'} />
        </button>

        <Spacer size={8} axis={'horizontal'} />

        <button type='button' onClick={handleRemoveOwnerModal}>
          <Icon type={'Delete'} size={'lg'} color={'alert'} />
        </button>
      </div>
      <EditOwnerModal
        isOpen={isOpenEditOwnerModal}
        onClose={handleEditOwnerModal}
        name={owner.name}
        address={owner.address}
      />
      <ReplaceOwnerModal
        isOpen={isOpenReplaceOwnerModal}
        onClose={handleReplaceOwnerModal}
        name={owner.name}
        address={owner.address}
      />
      <RemoveOwnerModal
        isOpen={isOpenRemoveOwnerModal}
        onClose={handleRemoveOwnerModal}
        name={owner.name}
        address={owner.address}
      />
    </div>
  )
}

export default OwnerRow
