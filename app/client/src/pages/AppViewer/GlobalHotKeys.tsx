import React from "react";
import {
  // Hotkey,
  // Hotkeys,
  HotkeysTarget2,
  HotkeyConfig,
} from "@blueprintjs/core";
// import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js";

import { setCommentModeInUrl } from "pages/Editor/ToggleModeButton";

import { getAppMode } from "selectors/applicationSelectors";
import { APP_MODE } from "entities/App";

import { commentModeSelector } from "selectors/commentsSelectors";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { connect } from "react-redux";
import { AppState } from "reducers";

type Props = {
  children: React.ReactNode;
  appMode?: APP_MODE;
  isCommentMode: boolean;
};

// @HotkeysTarget
class GlobalHotKeys extends React.Component<Props> {
  get hotKeysConfig(): HotkeyConfig[] {
    return [
      {
        combo: "esc",
        onKeyDown: (e: any) => {
          if (this.props.isCommentMode) {
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: this.props.appMode,
              source: "HOTKEY",
              combo: "esc",
            });
          }
          setCommentModeInUrl(false);
          e.preventDefault();
        },
        group: "Canvas",
        label: "Reset",
        global: true,
      },
      {
        combo: "v",
        global: true,
        onKeyDown: () => {
          if (this.props.isCommentMode)
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: this.props.appMode,
              source: "HOTKEY",
              combo: "v",
            });
          setCommentModeInUrl(false);
        },
        label: "View Mode",
      },
      {
        combo: "c",
        global: true,
        onKeyDown: () => {
          if (!this.props.isCommentMode)
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: "COMMENT",
              source: "HOTKEY",
              combo: "c",
            });
          setCommentModeInUrl(true);
        },
        label: "Comment Mode",
      },
    ];
  }

  // public renderHotkeys() {
  //   return (
  //     <Hotkeys>
  //       <Hotkey
  //         combo="esc"
  //         global
  //         group="Canvas"
  //         label="Reset"
  //         onKeyDown={(e: any) => {
  //           if (this.props.isCommentMode) {
  //             AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
  //               mode: this.props.appMode,
  //               source: "HOTKEY",
  //               combo: "esc",
  //             });
  //           }
  //           setCommentModeInUrl(false);
  //           e.preventDefault();
  //         }}
  //       />
  //       <Hotkey
  //         combo="v"
  //         global
  //         label="View Mode"
  //         onKeyDown={() => {
  //           if (this.props.isCommentMode)
  //             AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
  //               mode: this.props.appMode,
  //               source: "HOTKEY",
  //               combo: "v",
  //             });
  //           setCommentModeInUrl(false);
  //         }}
  //       />
  //       <Hotkey
  //         combo="c"
  //         global
  //         label="Comment Mode"
  //         onKeyDown={() => {
  //           if (!this.props.isCommentMode)
  //             AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
  //               mode: "COMMENT",
  //               source: "HOTKEY",
  //               combo: "c",
  //             });
  //           setCommentModeInUrl(true);
  //         }}
  //       />
  //     </Hotkeys>
  //   );
  // }

  // render() {
  //   return <div>{this.props.children}</div>;
  // }
  render() {
    return (
      <HotkeysTarget2 hotkeys={this.hotKeysConfig}>
        {({ handleKeyDown, handleKeyUp }) => (
          // <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
          //   Press "R" to refresh data, "F" to focus the input...
          //   <InputGroup ref={this.handleInputRef} />
          // </div>
          <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            {this.props.children}
          </div>
        )}
      </HotkeysTarget2>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  appMode: getAppMode(state),
  isCommentMode: commentModeSelector(state),
});

export default connect(mapStateToProps)(GlobalHotKeys);
