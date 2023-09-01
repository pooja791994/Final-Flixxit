import React from 'react';

export default function MoreInfoButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
}
