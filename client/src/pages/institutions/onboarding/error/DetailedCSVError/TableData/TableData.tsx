import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  data: {
    valid: boolean;
    value: string | number;
    message: string;
  };
  withTooltip: boolean;
  onMouseEnter: () => void;
};

const TableData = (props: Props) => {
  const { data, withTooltip, onMouseEnter } = props;

  return withTooltip ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={`tooltip-${data.value}`}>{data.message}</Tooltip>}
      onEnter={onMouseEnter}>
      <td id={`${data.value}-td-error`} className={!data.valid ? 'table-danger' : ''}>
        {data.value}
      </td>
    </OverlayTrigger>
  ) : (
    <td onMouseEnter={onMouseEnter}>{data.value}</td>
  );
};

export default TableData;
