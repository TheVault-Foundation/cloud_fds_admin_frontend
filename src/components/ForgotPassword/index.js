import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  FormFeedback,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";

class ForgotPassword extends Component {
  state = {};

  onKeyDown = (e) => {
    const {
      submitForm,
    } = this.props.formik;
    if (e.key === 'Enter') {
      submitForm();
    }
  }

  renderSuccessView = () => {

    const {
      t,
      message,
      onReturnLoginClick
    } = this.props;

    return (
      <>
        <AuthHeader title="TheVault Foundation" lead="Admin dashboard" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                  {message && <label>{message}</label>}

                    <div className="text-center">
                      <Button
                        className="my-4 "
                        color="info"
                        type="button"
                        onClick={onReturnLoginClick}
                      >
                        {t("return-login-button-title")}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  render() {
    const {
      formik,
      t,
      status,
      message
    } = this.props;

    const {
      isSubmitting,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    // If status === 200, submit successfully, then return successful view
    if (status === 200) {
      return this.renderSuccessView();
    }

    return (
      <>
        <AuthHeader title="TheVault Foundation" lead="Admin dasboard" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              {message && <Alert color={status}>
                {message}
              </Alert>}
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <label for="email">{t('description')}</label>
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          placeholder={t('email-placeholder')}
                          type="email"
                          name={"email"}
                          value={values["email"]}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.email && (
                          <FormFeedback>{errors.email}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    

                    <div className="text-center">
                      <Button
                        className="my-4 "
                        color="info"
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        {t("submit-button-title")}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ForgotPassword;
