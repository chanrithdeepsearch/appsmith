import React from "react";
import { HotkeyConfig, HotkeysTarget2 } from "@blueprintjs/core";
// import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js";
import { JS_OBJECT_HOTKEYS_CLASSNAME } from "./constants";

type Props = {
  runActiveJSFunction: (e: KeyboardEvent) => void;
  children: React.ReactNode;
};

// @HotkeysTarget
class JSObjectHotKeys extends React.Component<Props> {
  // public renderHotkeys() {
  //   return (
  //     <Hotkeys>
  //       <Hotkey
  //         allowInInput
  //         combo="mod + enter"
  //         global
  //         label="Run Js Function"
  //         onKeyDown={this.props.runActiveJSFunction}
  //       />
  //     </Hotkeys>
  //   );
  // }
  get hotKeysConfig(): HotkeyConfig[] {
    return [
      {
        combo: "mod + enter",
        onKeyDown: this.props.runActiveJSFunction,
        global: true,
        allowInInput: true,
        group: "Omnibar",
        label: "Run Js Function",
      },
    ];
  }

  render() {
    return (
      <HotkeysTarget2 hotkeys={this.hotKeysConfig}>
        {({ handleKeyDown, handleKeyUp }) => (
          <div
            className={JS_OBJECT_HOTKEYS_CLASSNAME}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          >
            {this.props.children}
          </div>
        )}
      </HotkeysTarget2>
    );
  }
}

export default JSObjectHotKeys;
