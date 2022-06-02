import React from "react";

import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

import HelloButtonComponent from "../component";
import { ValidationTypes } from "constants/WidgetValidation";

class HelloButtonWidget extends BaseWidget<
  HelloButtonWidgetProps,
  WidgetState
> {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "title",
            label: "Title",
            helpText: "Title of the Button",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSconvertible: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  getPageView() {
    return <HelloButtonComponent title={this.props.title} />;
  }

  static getWidgetType(): string {
    return "HELLOBUTTON_WIDGET";
  }
}

export interface HelloButtonWidgetProps extends WidgetProps {
  title: string;
}

export default HelloButtonWidget;
