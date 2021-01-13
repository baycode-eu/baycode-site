import * as React from "react";

import "../../../assets/styles/components/common/card.scss"

interface Props {
  title?: string
  children?: any
}

const Card = (props: Props) => {
  const {children, title} = props;

  return <div className="card">
    <h2 className="title">
      {title}
    </h2>
    <div className="contents">
      {children}
    </div>
  </div>
}

export default Card