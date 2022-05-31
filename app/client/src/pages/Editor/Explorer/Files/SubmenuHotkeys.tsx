import React from "react";
// import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js";
import {
  // Hotkey,
  HotkeyConfig,
  // Hotkeys,
  HotkeysTarget2,
} from "@blueprintjs/core";
import { SelectEvent } from "components/editorComponents/GlobalSearch/utils";

type Props = {
  handleUpKey: () => void;
  handleDownKey: () => void;
  handleSubmitKey: (e: SelectEvent) => void;
  children: React.ReactNode;
};

class SubmenuHotKeys extends React.Component<Props> {
  get hotKeysConfig(): HotkeyConfig[] {
    return [
      {
        combo: "up",
        onKeyDown: () => {
          this.props.handleUpKey();
        },
        allowInInput: true,
        label: "Move up the list",
      },
      {
        combo: "down",
        onKeyDown: this.props.handleDownKey,
        allowInInput: true,
        label: "Move down the list",
      },
      {
        combo: "return",
        onKeyDown: this.props.handleSubmitKey,
        allowInInput: true,
        label: "Submit",
      },
    ];
  }

  // renderHotkeys() {
  //   return (
  //     <Hotkeys>
  //       {this.hotKeysConfig.map(
  //         ({ allowInInput, combo, label, onKeyDown }, index) => (
  //           <Hotkey
  //             allowInInput={allowInInput}
  //             combo={combo}
  //             global={false}
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

export default SubmenuHotKeys;
