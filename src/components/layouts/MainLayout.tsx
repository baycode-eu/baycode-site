import * as React from "react";
import Header from "../organisms/layout/Header";
import "../../assets/styles/main-layout.scss"
import SEO from "../organisms/SEO";
import Particles from "../organisms/particles/Particles";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Footer from "../organisms/layout/Footer";
import {getYear} from "../../utils/dates";
import { graphql, useStaticQuery } from "gatsby"
import {height} from "../../utils/dom"

interface Props {
  seo?: any
  children: any
  article?: boolean
  noParticles?: boolean
  menu: any
}

export default  (props: Props) => {
  const {children, menu, article, seo, noParticles} = props
  const data = useStaticQuery(query)

  return <div className="layout">
    {!noParticles && <Particles height={height()}/>}
    <NotificationContainer />
    <SEO
      title={seo && seo.title || data.site.siteMetadata.title}
      description={seo && seo.description || data.site.siteMetadata.description}
      siteUrl={seo && seo.siteUrl || data.site.siteMetadata.siteUrl}
      image={seo && seo.image || data.site.siteMetadata.image}
      article={article || false}
    />
    <Header menu={menu} />
    <div className="page">
      {children}
    </div>
    <Footer currentYear={getYear(new Date)} />
  </div>
}

const query = graphql`
  query MainLayoutQuery {
    site { 
      siteMetadata {
        title
        description
        siteUrl,
        image
      }
    }
  }  
`