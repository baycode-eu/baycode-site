import * as React from "react"

import Modal from '@trendmicro/react-modal';

import EstimateForm from "../forms/EstimateForm";
import Estimate from "../../../models/Estimate";
import Contact from "../../../models/Contact"

import { Button } from "../../atoms/common/Button";
import Expand from "react-expand-animated";

import Checkbox from '@material-ui/core/Checkbox';
import "../../../assets/styles/components/modals/get-an-estimate-modal.scss"
import ContactMolecule from "../../molecules/contact/Contact"

interface State {
  consentChecked: boolean
}

interface Props {
  visible: boolean
  onClose?: () => void,
  estimate?: Estimate,
  contact?: Contact | null,
  estimateErrors?: any,
  setEstimateEmail?: (email: string) => void,
  setEstimateCompany?: (company: string) => void,
  setEstimatePhone?: (phone: string) => void,
  setEstimateContents?: (contents: string) => void,
  submitEstimateForm?: () => void,
  setEstimateFormExpanded?: (expanded: boolean) => void
  estimateFormExpanded?: boolean
  estimateLoading?: boolean
}

class ContactModal extends React.Component<Props, State> {
  state = {
    consentChecked: false
  }

  public checkConsent = () => this.setState(prevState => ({consentChecked: !prevState.consentChecked}))

  public render() {
    const {
      visible,
      submitEstimateForm,
      estimate,
      contact,
      setEstimateEmail,
      setEstimateCompany,
      setEstimatePhone,
      setEstimateContents,
      onClose,
      estimateLoading,
      estimateFormExpanded,
      estimateErrors,
      setEstimateFormExpanded,
    } = this.props;

    const {consentChecked} = this.state
    const toggleEstimateForm = () => setEstimateFormExpanded(!estimateFormExpanded)

    return <Modal size="sm" show={visible || false} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          Contact
        </Modal.Title>
        <Modal.Body padding className="body">
          <div className="body">
            {estimate && <div className="form">
              <Button
                className={`${estimateFormExpanded && 'pressed' || 'primary '}`}
                onPress={toggleEstimateForm}
              >
                Send a message through cloud function
              </Button>
              <Expand
                open={estimateFormExpanded}
                duration={300}
                transitions={["height", "opacity"]}
              >
                <EstimateForm
                  estimate={estimate}
                  estimateErrors={estimateErrors}
                  setEstimateEmail={setEstimateEmail}
                  setEstimateCompany={setEstimateCompany}
                  setEstimatePhone={setEstimatePhone}
                  setEstimateContents={setEstimateContents}
                />
                <div className="submit">
                  <Button
                    className="big accent"
                    onPress={submitEstimateForm}
                    disabled={!consentChecked}
                    loading={estimateLoading}
                  >
                    Let's build
                  </Button>
                </div>
                <div className="consent">
                  <span className="required">*</span>
                  <Checkbox
                    onChange={this.checkConsent}
                    checked={consentChecked}
                  />
                  <a href="https://storage.googleapis.com/baycode-51877.appspot.com/privacy_policy.pdf">
                    I hereby give consent for my personal data in the form of my e-mail address, telephone number
                    to be processed by Baycode Krystian Bajno in accordance with the Privacy Policy,
                    the content of which I have read and is clear to me.
                  </a>
                </div>
              </Expand>
            </div>}
            <div className="contact-section">
              <Expand
                open={!estimateFormExpanded}
                duration={300}
                transitions={["height", "opacity"]}
              >
                {contact && <ContactMolecule
                  email={contact?.mail}
                  linkedin={contact?.linkedin}
                  phone={contact?.phone}
                  telegram={contact?.telegram}
                /> || <></>}
              </Expand>
            </div>
          </div>
        </Modal.Body>
      </Modal.Header>
    </Modal>;
  }
}

export default ContactModal