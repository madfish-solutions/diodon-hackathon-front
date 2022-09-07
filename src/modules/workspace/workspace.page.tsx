import { FC } from 'react';

import { Button } from '@shared/components';
import { useToasts } from '@shared/utils/toasts';

import { AppRootRoutes } from '../../app-root-routes.enum';
import styles from './workspace.page.module.scss';

const SUCCESS_MESSAGE = 'Success! All works fine!';
const ERROR_MESSAGE = 'Error! Something went wrong!';
const INFO_MESSAGE = 'Info! This is info message!';

export const WorkspacePage: FC = () => {
  const { showSuccessToast, showErrorToast, showInfoToast } = useToasts();

  return (
    <>
      <div className={styles.toasts}>
        <button onClick={() => showSuccessToast(SUCCESS_MESSAGE)}>Success</button>
        <button onClick={() => showErrorToast(ERROR_MESSAGE)}>Error</button>
        <button onClick={() => showInfoToast(INFO_MESSAGE)}>Info</button>
      </div>
      <div className={styles.buttons}>
        <Button>Button Component</Button>
        <Button href={AppRootRoutes.Root}>Home</Button>
        <Button href={AppRootRoutes.About}>About</Button>
      </div>
    </>
  );
};
