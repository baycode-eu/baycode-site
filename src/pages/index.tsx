import * as React from "react"
import LandingPageView from "../components/pages/LandingPage";

import Article from "../models/Article";
import Project from "../models/Project";
import Estimate from "../models/Estimate";
import Stack from "../models/Stack"
import Menu from "../menu/models/Menu"
import Company from "../models/Company"
import Contact from "../models/Contact"

import {compose} from "redux";

import withArticles from "../components/hoc/withArticles";
import withExperience from "../components/hoc/withExperience";
import withEstimate from "../components/hoc/withEstimate"
import withLandingPageMenu from "../components/hoc/menus/withLandingPageMenu"
import withContact from "../components/hoc/withContact"

import { MutableRefObject } from "react"

interface Props {
  blogRef: MutableRefObject<HTMLDivElement>;
  stackRef: MutableRefObject<HTMLDivElement>;
  submitEstimateForm;

  articles: Article[];
  projects: Project[];
  stack: Stack[];
  companies: Company[];
  estimate: Estimate;
  menu: Menu;

  contact: Contact,
  contactModalVisible: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  toggleProjectsDrawerVisible: () => void;
  projectsDrawerVisible: boolean;
  onBlogItemPressed?: (item) => void
  onBlogClicked?: () => void
}

interface State {}
class LandingPageController extends React.PureComponent<Props, State>
{
  render = () => <LandingPageView
    {...this.props}
  />;
}

export default compose(
  withArticles,
  withExperience,
  withContact,
  withEstimate,
  withLandingPageMenu
)(LandingPageController);