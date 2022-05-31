import React from "react";
// import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js";
import { HotkeysTarget2, HotkeyConfig } from "@blueprintjs/core";

type Props = {
  handleUpKey: () => void;
  handleDownKey: () => void;
  handleSubmitKey: () => void;
  handleEscKey: () => void;
  children: React.ReactNode;
};

class GlobalSearchHotKeys extends React.Component<Props> {
  get hotKeysConfig(): HotkeyConfig[] {
    return [
      {
        combo: "up",
        onKeyDown: () => {
          this.props.handleUpKey();
        },
        allowInInput: true,
        group: "Branches",
        label: "Move up the list",
      },
      {
        combo: "down",
        onKeyDown: this.props.handleDownKey,
        allowInInput: true,
        group: "Branches",
        label: "Move down the list",
      },
      {
        combo: "return",
        onKeyDown: this.props.handleSubmitKey,
        allowInInput: true,
        group: "Branches",
        label: "Submit",
      },
      {
        combo: "ESC",
        onKeyDown: this.props.handleEscKey,
        allowInInput: true,
        group: "Branches",
        label: "ESC",
      },
    ];
  }

  // renderHotkeys() {
  //   return (
  //     <Hotkeys>
  //       {this.hotKeysConfig.map(
  //         ({ allowInInput, combo, group, label, onKeyDown }, index) => (
  //           <Hotkey
  //             allowInInput={allowInInput}
  //             combo={combo}
  //             global={false}
  //             group={group}
  //             key={index}
  //             label={label}
  //             onKeyDown={onKeyDown}
  //           />
  //         ),
  //       )}
  //     </Hotkeys>
  //   );
  // }

  // render() {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flex: 1,
  //         flexDirection: "column",
  //         minHeight: 0,
  //         overflow: "auto",
  //       }}
  //     >
  //       {this.props.children}
  //     </div>
  //   );
  // }
  render() {
    return (
      <HotkeysTarget2 hotkeys={this.hotKeysConfig}>
        {({ handleKeyDown, handleKeyUp }) => (
          // <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
          //   Press "R" to refresh data, "F" to focus the input...
          //   <InputGroup ref={this.handleInputRef} />
          // </div>
          <div
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              minHeight: 0,
              overflow: "auto",
            }}
          >
            {this.props.children}
          </div>
        )}
      </HotkeysTarget2>
    );
  }
}

export default GlobalSearchHotKeys;
