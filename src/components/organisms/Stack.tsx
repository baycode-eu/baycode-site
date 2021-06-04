import * as React from "react"

import "../../assets/styles/components/organisms/stack.scss"
import Stack from "../../models/Stack"
import i18n from "../../i18n/i18n";


const RecurseChild = (props) => {
  const { title, children, link } = props.child

  return <li style={{zIndex: 100}}>
    {link ? <a href={link}>
      {title}
    </a> : title}
    {children && <ul>
      {children.map((item, key) => <RecurseChild
        key={key}
        child={item}
      />)}
    </ul>}
  </li>
}

export default ({ stack }) => {
  return <div className="stack">
    <h2 className="heading">
      {i18n.t('stack')}
    </h2>
    <div className="tools">
      {stack?.map((item: Stack, key) => (
        <div key={key} className={item.className}>
          <h3>{item.title}</h3>
          <ul>
            {item.children && item.children.map(({
               title,
               children,
               link
             }, keySub) => <RecurseChild
              key={keySub}
              child={{
                title,
                children,
                link
              }}
            />)}
          </ul>
        </div>
      ))}
    </div>
    <div className="services">
      <h2>{i18n.t('services')}</h2>
      <ul>
        <li>Backend Dev</li>
        <li>Frontend Dev</li>
        <li>Mobile Dev</li>
        <li>Cyber Security</li>
        <li>Cloud & Dev Ops</li>
        <li>Consultancy</li>
      </ul>
    </div>
  </div>
}