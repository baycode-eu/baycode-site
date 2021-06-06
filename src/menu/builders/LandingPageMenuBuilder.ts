import Builder from "../Builder"
import Menu from "../models/Menu"
import MenuFactory from "../factories/MenuFactory";
import MenuEntryFactory from "../factories/MenuEntryFactory";
import { MutableRefObject } from "react"
import * as React from "react"
import {redirect} from "../../utils/navigation"

export class LandingPageMenuBuilder implements Builder {
  private menu: Menu;
  private menuFactory: MenuFactory;
  private menuEntryFactory: MenuEntryFactory
  private readonly stackRef: MutableRefObject<HTMLDivElement>;
  private readonly blogRef: MutableRefObject<HTMLDivElement>;
  private readonly openProjects: () => void;
  private readonly openContact: () => void;

  constructor(
    menuFactory: MenuFactory,
    menuEntryFactory: MenuEntryFactory,
    stackRef: MutableRefObject<HTMLDivElement>,
    blogRef: MutableRefObject<HTMLDivElement>,
    openProjects: () => void,
    openContact: () => void
  ) {
    this.menuFactory = menuFactory;
    this.menuEntryFactory = menuEntryFactory;
    this.stackRef = stackRef;
    this.blogRef = blogRef;
    this.openProjects = openProjects
    this.openContact = openContact
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

    this.menu.addMenuEntry(
      this.menuEntryFactory.create({
        title: "Stack",
        hiddenMobile: true,
        onPress: () => this.stackRef.current.scrollIntoView({behavior: "smooth"})
      })
    )

    this.menu.addMenuEntry(
      this.menuEntryFactory.create({
        title:"Projects",
        hiddenMobile: false,
        onPress: () => this.openProjects()
      })
    )

    this.menu.addMenuEntry(
       this.menuEntryFactory.create({
         title:"Get a quote",
         hiddenMobile: false,
         onPress: () => this.openContact()
       })
    )
  }

  getMenu = (): Menu => this.menu
}

export const makeLandingPageMenuBuilder = (
  menuFactory: MenuFactory,
  menuEntryFactory: MenuEntryFactory,
  stackRef: React.MutableRefObject<HTMLDivElement>,
  blogRef: React.MutableRefObject<HTMLDivElement>,
  openProjects: () => void,
  openContact: () => void
): Builder => {
  return new LandingPageMenuBuilder(
    menuFactory,
    menuEntryFactory,
    stackRef,
    blogRef,
    openProjects,
    openContact
  )
}
