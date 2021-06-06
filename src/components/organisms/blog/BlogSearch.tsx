import * as React from "react"

import { debounce }  from 'simple-debouncer'
import FormInput from "../../molecules/common/FormInput"
import "../../../assets/styles/components/organisms/articles/blog-search.scss";

export default (props) => {
  return <div className="blog-search">
    <FormInput
      onChange={(change) => debounce(() => props.onSearch(change), 500)}
      placeholder="Search articles"
    />
  </div>
}