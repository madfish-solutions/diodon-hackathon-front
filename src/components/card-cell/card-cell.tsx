import { CFC } from '@shared/types';

interface Props {
  label: string;
}

export const CardCell: CFC<Props> = ({ label, children }) => {
  return (
    <div>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
};
