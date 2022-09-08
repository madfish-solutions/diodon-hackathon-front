import { FC } from 'react';

import { Button, Card, Input } from '@shared/components';
import { NumberInput } from '@shared/components/number-input';
import { Slider } from '@shared/components/slider';
import { TokenInput } from '@shared/components/token-input';
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
        <Button onClick={() => showSuccessToast(SUCCESS_MESSAGE)}>Success</Button>
        <Button onClick={() => showErrorToast(ERROR_MESSAGE)}>Error</Button>
        <Button onClick={() => showInfoToast(INFO_MESSAGE)}>Info</Button>
      </div>
      <div className={styles.buttons}>
        <Button>Button Component</Button>
        <Button href={AppRootRoutes.Root}>Home</Button>
        <Button href={AppRootRoutes.About}>About</Button>
      </div>
      <div className={styles.card}>
        <Card
          header={{
            content: 'Header',
            button: <Button>Button</Button>
          }}
          subheader={{
            content: 'Subheader',
            button: <Button>Button</Button>
          }}
          footer="Footer"
        >
          Chilren
        </Card>
      </div>
      <div className={styles.inputs}>
        <Input label="Text Input" />
        <NumberInput label="Number Input" />
        <TokenInput
          label="Token Input"
          value=""
          onInputChange={() => {
            return;
          }}
        />
      </div>
      <div className={styles.slider}>
        <Slider />
      </div>
    </>
  );
};
