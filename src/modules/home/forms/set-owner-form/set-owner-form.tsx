import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { isNull } from '@shared/helpers';

import styles from './set-owner-form.module.scss';
import { useSetOwnerFormViewModel } from './use-set-owner-form.vm';

export const SetOwnerForm: FC = observer(() => {
  const setOwnerFormViewModel = useSetOwnerFormViewModel();

  if (isNull(setOwnerFormViewModel)) {
    return null;
  }

  const { disabled, errors, handleNewOwnerChange, handleSubmit, isSubmitting } = setOwnerFormViewModel;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newOwner">New owner</label>
      <input id="newOwner" type="text" onChange={handleNewOwnerChange} />
      {errors.newOwner && <span className={styles.error}>{errors.newOwner}</span>}
      <button disabled={disabled} type="submit">
        {isSubmitting ? 'Sending transaction...' : 'Set new owner'}
      </button>
    </form>
  );
});
