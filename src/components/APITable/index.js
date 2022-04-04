import React, {
  Children,
  isValidElement,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import {useHistory} from '@docusaurus/router';
import styles from './styles.module.css';

// ReactNode equivalent of HTMLElement#innerText
function getText(node) {
  let curNode = node;
  while (isValidElement(curNode)) {
    [curNode] = Children.toArray(curNode.props.children);
  }
  return curNode;
}

const APITableRow = forwardRef(
  (
    {
      name,
      children,
    },ref,
  ) => {
    const entryName = getText(children);
    const id = name ? `${name}-${entryName}` : entryName;
    const anchor = `#${id}`;
    const history = useHistory();
    return (
      <tr
        id={id}
        tabIndex={0}
        ref={history.location.hash === anchor ? ref : undefined}
        onClick={() => {
          history.push(anchor);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            history.push(anchor);
          }
        }}>
        {children.props.children}
      </tr>
    );
  },
);

/*
 * Note: this is not a quite robust component since it makes a lot of
 * assumptions about how the children looks; however, those assumptions
 * should be generally correct in the MDX context.
 */
export default function APITable({children, name}) {
  const [thead, tbody] = Children.toArray(
    children.props.children,
  );
  const highlightedRow = useRef(null);
  useEffect(() => {
    highlightedRow.current?.focus();
  }, [highlightedRow]);
  const rows = Children.map(
    tbody.props.children,
    (row) => (
      <APITableRow name={name} ref={highlightedRow}>
        {row}
      </APITableRow>
    ),
  );

  return (
    <table className={styles.apiTable}>
      {thead}
      <tbody>{rows}</tbody>
    </table>
  );
}