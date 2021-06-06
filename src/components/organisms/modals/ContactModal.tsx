import * as React from "react"
import "../../../assets/styles/components/modals/get-an-estimate-modal.scss"

import Modal from '@trendmicro/react-modal';

import EstimateForm from "../forms/EstimateForm";
import Estimate from "../../../models/Estimate";
import Contact from "../../../models/Contact"

import { Button } from "../../atoms/common/Button";
import Expand from "react-expand-animated";
import i18n from "../../../i18n/i18n";

import Checkbox from '@material-ui/core/Checkbox';
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
    const privateDataSet = estimate && !!(estimate.email || estimate.phone)

    return <Modal size="sm" show={visible || false} onClose={onClose}>
      <Modal.Header>
        <Modal.Title className="primary-color">
          {i18n.t('contact.contact')}
        </Modal.Title>
        <Modal.Body padding className="body">
          <div className="body">
            {estimate && <div className="form">
              <Button
                className={estimateFormExpanded && `pressed` || `primary`}
                onPress={toggleEstimateForm}
              >
                <span className="send-direct-contact-cta">
                  <span>{i18n.t('contact.send-a-message-directly')}</span>
                </span>
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
                {privateDataSet && <div className="consent">
                  <span className="required">*</span>
                  <Checkbox
                    onChange={this.checkConsent}
                    checked={consentChecked}
                  />
                  <a href="https://storage.googleapis.com/baycode-51877.appspot.com/privacy_policy.pdf">
                    {i18n.t('contact.agreement')}
                  </a>
                </div>}
                <div className="submit">
                  <Button
                    className="big accent"
                    onPress={submitEstimateForm}
                    disabled={privateDataSet && !consentChecked}
                    loading={estimateLoading}
                  >
                    {i18n.t('contact.send-a-message-cta')}
                  </Button>
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