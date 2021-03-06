import React from "react";
import { StyleSheet, css } from "aphrodite";
import types from "prop-types";

import { ListItem } from "material-ui/List";

import LabelChips from "./LabelChips";

const styles = StyleSheet.create({
  listItem: {
    position: "relative",
    height: "250px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  textContainer: {
    height: "230px",
    display: "flex",
    flexDirection: "column"
  },
  titleWrapper: {
    marginBottom: 8
  },
  title: {
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
    margin: 0,
    overflow: "hidden",
    flex: 1
  },
  bodyFade: {
    width: "100%"
  },
  chipsWrapper: {
    display: "flex",
    paddingTop: 4,
    flex: 0
  },
  chipsWrapperInner: {
    alignSelf: "flex-end"
  }
});

export default function CannedResponseListItem({
  response,
  labels,
  labelIds,
  leftIcon,
  rightIconButton,
  onClick
}) {
  let mappedLabelIds;
  if (labelIds != null) {
    // list of label ids passed; use that
    mappedLabelIds = labelIds;
  } else {
    // no list of label ids; use all labels
    mappedLabelIds = labels.map(l => l.id);
  }

  return (
    <ListItem
      value={response.text}
      key={response.id}
      leftIcon={leftIcon}
      rightIconButton={rightIconButton}
      onClick={onClick}
      secondaryTextLines={2}
      className={css(styles.listItem)}
      // hoverColor="rgba(0, 0, 0, 0)"
    >
      <div className={css(styles.textContainer)}>
        <div className={css(styles.titleWrapper)}>
          <div className={css(styles.title)}>{response.title}</div>
        </div>
        <div className={css(styles.body)}>{response.text}</div>
        {/* <div
        className={css(styles.bodyFade)}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))`
        }}
      /> */}
        <div className={css(styles.chipsWrapper)}>
          <div className={css(styles.chipsWrapperInner)}>
            <LabelChips labels={labels} labelIds={mappedLabelIds} />
          </div>
        </div>
      </div>
    </ListItem>
  );
}

CannedResponseListItem.propTypes = {
  response: types.object,
  labels: types.arrayOf(types.object),
  labelIds: types.arrayOf(types.string),
  leftIcon: types.node,
  rightIconButton: types.node,
  onClick: types.func
};
