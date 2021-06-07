import * as React from "react";
import LandingPageTemplate from "../templates/LandingPageTemplate";
import BlogCarousel from "../organisms/blog/carousel/BlogCarousel";
import GetInTouch from "../organisms/common/GetAQuote";
import LottieAnimation from "../molecules/common/LottieAnimation";

import securityAnimation from "../../assets/animations/security.json"
import programmingAnimation from "../../assets/animations/programming.json"

import ContactModal from "../organisms/modals/ContactModal";
import Stack from "../organisms/Stack";
import CheckOutSourceCode from "../organisms/common/CheckOutSourceCode";
import {Projects} from "../organisms/projects/Projects";
import WelcomeEngineer from "../organisms/landing/WelcomeEngineer";
import WelcomeSecurity from "../organisms/landing/WelcomeSecurity";

interface Props {
  articles
  projects
  companies
  stack
  menu
  contact,
  estimate
  estimateErrors
  estimateLoading
  estimateFormExpanded
  setEstimateEmail
  setEstimateCompany
  setEstimatePhone
  setEstimateContents
  setEstimateFormExpanded
  contactModalVisible
  openContactModal
  closeContactModal
  submitEstimateForm
  onBlogItemPressed
  toggleProjectsDrawerVisible
  projectsDrawerVisible
  stackRef
  blogRef
  onBlogClicked
  loadMoreArticles
}

const LandingPage = (props: Props) => {
  return <LandingPageTemplate
    stackRef={props.stackRef}
    blogRef={props.blogRef}
    menu={props.menu}
    welcomeEngineer={<WelcomeEngineer contact={props.contact} />}
    welcomeEngineerAnimation={<LottieAnimation
        width={364}
        animation={programmingAnimation}
      />}
    welcomeSecurity={<WelcomeSecurity />}
    welcomeSecurityAnimation={<LottieAnimation
        width={300}
        animation={securityAnimation}
      />}
    getInTouch={<GetInTouch
        onPress={props.openContactModal}
      />}
    checkOutSourceCode={
      props.contact?.githubRepo && <CheckOutSourceCode link={props.contact.githubRepo} />
    }
    blogCarousel={
      props.articles.length ? <BlogCarousel
        articles={props.articles}
        onItemPressed={props.onBlogItemPressed}
        onBlogClicked={props.onBlogClicked}
        onBlogEndReached={props.loadMoreArticles}
      /> : <></>
    }
    stack={
      props.stack && <Stack stack={props.stack} />
    }
    getAnEstimateModal={<ContactModal
        {...props}
        onClose={props.closeContactModal}
        visible={props.contactModalVisible}
      />}
    projectsModal={<Projects
        visible={props.projectsDrawerVisible}
        toggle={props.toggleProjectsDrawerVisible}
        projects={props.projects}
        companies={props.companies}
      />}
  />
}

export default LandingPage;