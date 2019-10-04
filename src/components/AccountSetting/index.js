import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  FormFeedback
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

class AccountSetting extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  render() {
    const { formik, t, status, message } = this.props;

    const {
      isSubmitting,
      touched,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    // console.log("errors", errors.email);

    return (
      <>
        <SimpleHeader name={t('title')} />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader>
              <h3 className="mb-0">{t('title')}</h3>
            </CardHeader>
            <CardBody>
              {message && <Alert color={status}>{message}</Alert>}

              <Form>
                {/*  Field company name */}
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.company
                        })}
                      >
                        <Input
                          placeholder={t("company-name")}
                          type="text"
                          name="company"
                          value={values["company"]}
                          onFocus={e => this.setState({ company: true })}
                          onBlur={e => this.setState({ company: false })}
                          onChange={e => {
                            setFieldValue("company", e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field email */}
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.email
                        })}
                      >
                        <Input
                          placeholder={t("email")}
                          type="text"
                          name="email"
                          value={values["email"]}
                          onFocus={e => this.setState({ email: true })}
                          onBlur={e => this.setState({ email: false })}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                        />
                      </InputGroup>
                      {errors.email && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field contact number */}
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.contactNumber
                        })}
                      >
                        <Input
                          placeholder={t("contact-number")}
                          type="text"
                          name="contactNumber"
                          value={values["contactNumber"]}
                          onFocus={e => this.setState({ contactNumber: true })}
                          onBlur={e => this.setState({ contactNumber: false })}
                          onChange={e => {
                            setFieldValue("contactNumber", e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field address */}
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.address
                        })}
                      >
                        <Input
                          placeholder={t("address")}
                          type="text"
                          name="address"
                          value={values["address"]}
                          onFocus={e => this.setState({ address: true })}
                          onBlur={e => this.setState({ address: false })}
                          onChange={e => {
                            setFieldValue("address", e.target.value);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  color="primary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {t("submit-button-title")}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default AccountSetting;
