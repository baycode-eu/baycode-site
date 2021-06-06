import * as React from "react"

import { debounce }  from 'simple-debouncer'
import FormInput from "../../molecules/common/FormInput"

export default (props) => {
  return <FormInput
    onChange={(change) => debounce(() => props.onSearch(change), 500)}
    placeholder="Search articles"
  />
}