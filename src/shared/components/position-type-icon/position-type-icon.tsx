import { FC } from 'react';

import { IconProps, PositionType } from '../../types';
import { LongIcon, ShortIcon } from '../icons';

interface Props extends IconProps {
  type: PositionType;
}

export const PositionTypeIcon: FC<Props> = ({ type, ...props }) =>
  type === PositionType.LONG ? <LongIcon {...props} /> : <ShortIcon {...props} />;
