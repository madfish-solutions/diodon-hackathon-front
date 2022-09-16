import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Input } from '@shared/components';
import { isNull } from '@shared/helpers';

import { useSetOwnerFormViewModel } from './use-set-owner-form.vm';

export const SetOwnerForm: FC = observer(() => {
  const setOwnerFormViewModel = useSetOwnerFormViewModel();

  if (isNull(setOwnerFormViewModel)) {
    return null;
  }

  const { disabled, errors, handleNewOwnerChange, handleSubmit, isSubmitting, values } = setOwnerFormViewModel;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        error={errors.newOwner}
        id="newOwner"
        label="New owner"
        onChange={handleNewOwnerChange}
        value={values.newOwner}
      />
      <Button disabled={disabled} type="submit">
        {isSubmitting ? 'Sending transaction...' : 'Set new owner'}
      </Button>
    </form>
  );
});
