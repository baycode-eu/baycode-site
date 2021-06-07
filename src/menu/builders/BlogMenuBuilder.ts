import Builder from "../Builder"
import Menu from "../models/Menu"
import MenuFactory from "../factories/MenuFactory";
import MenuEntryFactory from "../factories/MenuEntryFactory";
import {redirect} from "../../utils/navigation"

export class BlogMenuBuilder implements Builder {
  private menu: Menu;
  private menuFactory: MenuFactory;
  private menuEntryFactory: MenuEntryFactory

  constructor(
    menuFactory: MenuFactory,
    menuEntryFactory: MenuEntryFactory,
  ) {
    this.menuFactory = menuFactory;
    this.menuEntryFactory = menuEntryFactory;
  }

  createMenu = (): void => {
    this.menu = this.menuFactory.create()
  }

  addMenuEntries = (): void => {
    this.menu.addMenuEntry(
      this.menuEntryFactory.create({
        title: "Blog",
        hiddenMobile: true,
        onPress: () => redirect(`/blog/`)
      })
    )
  }

  getMenu = (): Menu => this.menu
}

export const makeBlogMenuBuilder = (
  menuFactory: MenuFactory,
  menuEntryFactory: MenuEntryFactory,
): Builder => {
  return new BlogMenuBuilder(
    menuFactory,
    menuEntryFactory
  )
}
