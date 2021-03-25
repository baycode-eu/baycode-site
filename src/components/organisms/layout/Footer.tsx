import * as React from "react"
import {useDispatch} from "react-redux";

import "../../../assets/styles/footer.scss"
import {openContactModal} from "../../../store/actions/ModalActions";

export default (props) => {
  const dispatch = useDispatch()
  return <div className="footer">
    <a onClick={() => dispatch(openContactModal())}>
      Baycode © {props.currentYear}
    </a>
  </div>;
}