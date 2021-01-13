import i18n from "../../../i18n/i18n";
import * as React from "react";
import Card from "../../molecules/common/Card";


export default (props) => <Card title={i18n.t("welcome.security.title")}>
  <h3>{i18n.t("welcome.security.subtitle")}</h3>
  <h4>
    <p>{i18n.t("welcome.security.trait")}</p>
  </h4>
  <h4>
    <p><b>{i18n.t("welcome.security.advantage")}</b></p>
  </h4>
</Card>