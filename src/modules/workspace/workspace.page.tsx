import { FC } from 'react';

import { useToasts } from '@shared/utils/toasts';

const SUCCESS_MESSAGE = 'Success! All works fine!';
const ERROR_MESSAGE = 'Error! Something went wrong!';
const INFO_MESSAGE = 'Info! This is info message!';

export const WorkspacePage: FC = () => {
  const { showSuccessToast, showErrorToast, showInfoToast } = useToasts();

  return (
    <div>
      <button onClick={() => showSuccessToast(SUCCESS_MESSAGE)}>Success</button>
      <button onClick={() => showErrorToast(ERROR_MESSAGE)}>Error</button>
      <button onClick={() => showInfoToast(INFO_MESSAGE)}>Info</button>
    </div>
  );
};
