import { editIcon } from "./editIcon";
import { flaskIcon } from "./flaskIcon";
import { trashIcon } from "./trashIcon";

export class CustomIconMapper {
  static getCustomIcon(iconName: string) {
    switch (iconName) {
      case "flask":
        return flaskIcon;
      case "edit":
        return editIcon;
      case "trash":
        return trashIcon;
      default:
        return null;
    }
  }
}
