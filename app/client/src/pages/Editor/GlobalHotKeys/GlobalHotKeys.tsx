import React from "react";
import { connect } from "react-redux";
import { AppState } from "reducers";
import { HotkeysTarget2, HotkeyConfig } from "@blueprintjs/core";

import {
  closePropertyPane,
  closeTableFilterPane,
  copyWidget,
  cutWidget,
  deleteSelectedWidget,
  groupWidgets,
  pasteWidget,
} from "actions/widgetActions";
import {
  deselectAllInitAction,
  selectAllWidgetsInCanvasInitAction,
} from "actions/widgetSelectionActions";
import { setGlobalSearchCategory } from "actions/globalSearchActions";
import { isMac } from "utils/helpers";
import { getSelectedWidget, getSelectedWidgets } from "selectors/ui";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import { getSelectedText } from "utils/helpers";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { WIDGETS_SEARCH_ID } from "constants/Explorer";
import { resetSnipingMode as resetSnipingModeAction } from "actions/propertyPaneActions";
import { showDebugger } from "actions/debuggerActions";

import { setCommentModeInUrl } from "pages/Editor/ToggleModeButton";
import { runActionViaShortcut } from "actions/pluginActionActions";
import {
  filterCategories,
  SearchCategory,
  SEARCH_CATEGORY_ID,
} from "components/editorComponents/GlobalSearch/utils";
import { redoAction, undoAction } from "actions/pageActions";
import { Toaster } from "components/ads/Toast";
import { Variant } from "components/ads/common";

import { getAppMode } from "selectors/applicationSelectors";
import { APP_MODE } from "entities/App";

import {
  createMessage,
  SAVE_HOTKEY_TOASTER_MESSAGE,
} from "@appsmith/constants/messages";
import { setPreviewModeAction } from "actions/editorActions";
import { previewModeSelector } from "selectors/editorSelectors";
import { getExplorerPinned } from "selectors/explorerSelector";
import { setExplorerPinnedAction } from "actions/explorerActions";
import { setIsGitSyncModalOpen } from "actions/gitSyncActions";
import { GitSyncModalTab } from "entities/GitSync";
import { matchBuilderPath } from "constants/routes";
import { commentModeSelector } from "selectors/commentsSelectors";

type Props = {
  copySelectedWidget: () => void;
  pasteCopiedWidget: (mouseLocation: { x: number; y: number }) => void;
  deleteSelectedWidget: () => void;
  cutSelectedWidget: () => void;
  groupSelectedWidget: () => void;
  setGlobalSearchCategory: (category: SearchCategory) => void;
  resetSnipingMode: () => void;
  openDebugger: () => void;
  closeProppane: () => void;
  closeTableFilterProppane: () => void;
  executeAction: () => void;
  selectAllWidgetsInit: () => void;
  deselectAllWidgets: () => void;
  selectedWidget?: string;
  selectedWidgets: string[];
  isDebuggerOpen: boolean;
  children: React.ReactNode;
  undo: () => void;
  redo: () => void;
  appMode?: APP_MODE;
  isCommentMode: boolean;
  isPreviewMode: boolean;
  setPreviewModeAction: (shouldSet: boolean) => void;
  isExplorerPinned: boolean;
  setExplorerPinnedAction: (shouldPinned: boolean) => void;
  showCommitModal: () => void;
  getMousePosition: () => { x: number; y: number };
};

class GlobalHotKeys extends React.Component<Props> {
  public stopPropagationIfWidgetSelected(e: KeyboardEvent): boolean {
    const multipleWidgetsSelected =
      this.props.selectedWidgets && this.props.selectedWidgets.length;
    const singleWidgetSelected =
      this.props.selectedWidget &&
      this.props.selectedWidget != MAIN_CONTAINER_WIDGET_ID;
    if (
      (singleWidgetSelected || multipleWidgetsSelected) &&
      !getSelectedText()
    ) {
      e.preventDefault();
      e.stopPropagation();
      return true;
    }
    return false;
  }

  public onOnmnibarHotKeyDown(
    e: KeyboardEvent,
    categoryId: SEARCH_CATEGORY_ID = SEARCH_CATEGORY_ID.NAVIGATION,
  ) {
    e.preventDefault();

    // don't open omnibar if preview mode is on
    if (this.props.isPreviewMode) return;

    const category = filterCategories[categoryId];
    this.props.setGlobalSearchCategory(category);
    AnalyticsUtil.logEvent("OPEN_OMNIBAR", {
      source: "HOTKEY_COMBO",
      category: category.title,
    });
  }

  get hotKeysConfig(): HotkeyConfig[] {
    return [
      {
        combo: "ctrl + shift + g",
        onKeyDown: () => {
          this.props.showCommitModal();
        },
        global: true,
        label: "Show git commit modal",
      },
      {
        combo: "mod + /",
        onKeyDown: () => {
          this.props.setExplorerPinnedAction(!this.props.isExplorerPinned);
        },
        global: true,
        label: "Pin/Unpin Entity Explorer",
      },
      {
        combo: "p",
        onKeyDown: () => {
          setCommentModeInUrl(false);
          this.props.setPreviewModeAction(!this.props.isPreviewMode);
        },
        global: true,
        label: "Preview mode",
      },
      {
        combo: "mod + s",
        onKeyDown: () => {
          Toaster.show({
            text: createMessage(SAVE_HOTKEY_TOASTER_MESSAGE),
            variant: Variant.info,
          });
        },
        global: true,
        preventDefault: true,
        stopPropagation: true,
        label: "Save progress",
      },
      {
        combo: "mod + g",
        onKeyDown: (e) => {
          if (this.stopPropagationIfWidgetSelected(e)) {
            this.props.groupSelectedWidget();
          }
        },
        global: true,
        group: "Canvas",
        label: "Cut Widgets for grouping",
      },
      {
        combo: "mod + y",
        onKeyDown: this.props.redo,
        global: true,
        preventDefault: true,
        stopPropagation: true,
        label: "Redo change in canvas",
      },
      {
        combo: "mod + shift + z",
        onKeyDown: this.props.redo,
        global: true,
        preventDefault: true,
        stopPropagation: true,
        label: "Redo change in canvas",
      },
      {
        combo: "mod + z",
        onKeyDown: this.props.undo,
        global: true,
        preventDefault: true,
        stopPropagation: true,
        label: "Redo change in canvas",
      },
      {
        combo: "mod + enter",
        onKeyDown: this.props.executeAction,
        global: true,
        allowInInput: true,
        preventDefault: true,
        stopPropagation: true,
        label: "Execute Action",
      },
      {
        combo: "c",
        onKeyDown: () => {
          if (!this.props.isCommentMode)
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: "COMMENT",
              source: "HOTKEY",
              combo: "c",
            });
          setCommentModeInUrl(true);
        },
        global: true,
        label: "Comment mode",
      },
      {
        combo: "v",
        onKeyDown: (e: any) => {
          if (this.props.isCommentMode)
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: this.props.appMode,
              source: "HOTKEY",
              combo: "v",
            });
          setCommentModeInUrl(false);
          this.props.resetSnipingMode();
          e.preventDefault();
        },
        global: true,
        label: "Edit mode",
      },
      {
        combo: "esc",
        onKeyDown: (e: any) => {
          if (this.props.isCommentMode) {
            AnalyticsUtil.logEvent("COMMENTS_TOGGLE_MODE", {
              mode: this.props.appMode,
              source: "HOTKEY",
              combo: "esc",
            });
            setCommentModeInUrl(false);
          }
          this.props.resetSnipingMode();
          this.props.deselectAllWidgets();
          this.props.closeProppane();
          this.props.closeTableFilterProppane();
          e.preventDefault();
          this.props.setPreviewModeAction(false);
        },
        global: true,
        group: "Canvas",
        label: "Deselect all Widget",
      },
      {
        combo: "mod + a",
        onKeyDown: (e: any) => {
          if (matchBuilderPath(window.location.pathname)) {
            this.props.selectAllWidgetsInit();
            e.preventDefault();
          }
        },
        global: true,
        group: "Canvas",
        label: "Select all Widget",
      },
      {
        combo: "mod + x",
        onKeyDown: (e: any) => {
          if (this.stopPropagationIfWidgetSelected(e)) {
            this.props.cutSelectedWidget();
          }
        },
        global: true,
        group: "Canvas",
        label: "Cut Widget",
      },
      {
        combo: "del",
        onKeyDown: (e: any) => {
          if (this.stopPropagationIfWidgetSelected(e)) {
            this.props.deleteSelectedWidget();
          }
        },
        global: true,
        group: "Canvas",
        label: "Delete Widget",
      },
      {
        combo: "backspace",
        onKeyDown: (e: any) => {
          if (this.stopPropagationIfWidgetSelected(e) && isMac()) {
            this.props.deleteSelectedWidget();
          }
        },
        global: true,
        group: "Canvas",
        label: "Delete Widget",
      },
      {
        combo: "mod + v",
        onKeyDown: () => {
          this.props.pasteCopiedWidget(
            this.props.getMousePosition() || { x: 0, y: 0 },
          );
        },
        global: true,
        group: "Canvas",
        label: "Paste Widget",
      },
      {
        combo: "mod + c",
        onKeyDown: (e: any) => {
          if (this.stopPropagationIfWidgetSelected(e)) {
            this.props.copySelectedWidget();
          }
        },
        global: true,
        group: "Canvas",
        label: "Copy Widget",
      },
      {
        combo: "mod + d",
        onKeyDown: () => {
          this.props.openDebugger();
          if (this.props.isDebuggerOpen) {
            AnalyticsUtil.logEvent("OPEN_DEBUGGER", {
              source: "CANVAS",
            });
          }
        },
        global: true,
        allowInInput: true,
        preventDefault: true,
        group: "Canvas",
        label: "Open Debugger",
      },
      {
        combo: "mod + k",
        onKeyDown: (e) => {
          this.onOnmnibarHotKeyDown(e, SEARCH_CATEGORY_ID.INIT);
        },
        global: true,
        allowInInput: true,
        label: "Show omnibar",
      },
      {
        combo: "mod + l",
        onKeyDown: (e) => {
          this.onOnmnibarHotKeyDown(e, SEARCH_CATEGORY_ID.DOCUMENTATION);
        },
        global: true,
        allowInInput: true,
        label: "Search Documentation",
      },
      {
        combo: "mod + j",
        onKeyDown: (e) => {
          this.onOnmnibarHotKeyDown(e, SEARCH_CATEGORY_ID.SNIPPETS);
          AnalyticsUtil.logEvent("SNIPPET_LOOKUP", {
            source: "HOTKEY_COMBO",
          });
        },
        global: true,
        allowInInput: true,
        label: "Look up code snippet",
      },
      {
        combo: "mod + plus",
        onKeyDown: (e) => {
          this.onOnmnibarHotKeyDown(e, SEARCH_CATEGORY_ID.ACTION_OPERATION);
        },
        global: true,
        allowInInput: true,
        label: "Create New",
      },
      {
        combo: "mod + p",
        onKeyDown: (e) => this.onOnmnibarHotKeyDown(e),
        global: true,
        allowInInput: true,
        label: "Navigate",
      },
      {
        combo: "mod + f",
        onKeyDown: (e: any) => {
          const widgetSearchInput = document.getElementById(WIDGETS_SEARCH_ID);
          if (widgetSearchInput) {
            widgetSearchInput.focus();
            e.preventDefault();
            e.stopPropagation();
          }
        },
        global: true,
        label: "Search Entities",
      },
    ];
  }

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
  selectedWidget: getSelectedWidget(state),
  selectedWidgets: getSelectedWidgets(state),
  isDebuggerOpen: state.ui.debugger.isOpen,
  appMode: getAppMode(state),
  isCommentMode: commentModeSelector(state),
  isPreviewMode: previewModeSelector(state),
  isExplorerPinned: getExplorerPinned(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    copySelectedWidget: () => dispatch(copyWidget(true)),
    pasteCopiedWidget: (mouseLocation: { x: number; y: number }) =>
      dispatch(pasteWidget(false, mouseLocation)),
    deleteSelectedWidget: () => dispatch(deleteSelectedWidget(true)),
    cutSelectedWidget: () => dispatch(cutWidget()),
    groupSelectedWidget: () => dispatch(groupWidgets()),
    setGlobalSearchCategory: (category: SearchCategory) =>
      dispatch(setGlobalSearchCategory(category)),
    resetSnipingMode: () => dispatch(resetSnipingModeAction()),
    openDebugger: () => dispatch(showDebugger()),
    closeProppane: () => dispatch(closePropertyPane()),
    closeTableFilterProppane: () => dispatch(closeTableFilterPane()),
    selectAllWidgetsInit: () => dispatch(selectAllWidgetsInCanvasInitAction()),
    deselectAllWidgets: () => dispatch(deselectAllInitAction()),
    executeAction: () => dispatch(runActionViaShortcut()),
    undo: () => dispatch(undoAction()),
    redo: () => dispatch(redoAction()),
    setPreviewModeAction: (shouldSet: boolean) =>
      dispatch(setPreviewModeAction(shouldSet)),
    setExplorerPinnedAction: (shouldSet: boolean) =>
      dispatch(setExplorerPinnedAction(shouldSet)),
    showCommitModal: () =>
      dispatch(
        setIsGitSyncModalOpen({ isOpen: true, tab: GitSyncModalTab.DEPLOY }),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHotKeys);
