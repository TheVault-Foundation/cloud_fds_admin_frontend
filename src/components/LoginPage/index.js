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
  Col
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";
import ReCAPTCHA from "react-google-recaptcha";

class LoginPage extends Component {
  state = {};
  render() {
    const {
      formik,
      t,
      gCapchatSiteKey,
      handleCaptchaResponseChange,
      onClickForgotPassword,
      onClickCreateNewAccount
    } = this.props;

    const {
      isSubmitting,
      touched,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    console.log("errors", errors.email);

    return (
      <>
        <AuthHeader title="TheVault Foundation" lead="Admin dasboard" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>{t("login")}</small>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          placeholder="Email"
                          type="email"
                          name={"email"}
                          value={values["email"]}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedEmail: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedEmail: false })
                          }
                        />
                        {errors.email && (
                          <FormFeedback>{errors.email}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name={"password"}
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          onChange={e => {
                            setFieldValue("password", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedPassword: false
                            })
                          }
                        />
                        {errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">
                          {t("remember-me")}
                        </span>
                      </label>
                    </div>

                    <div className="text-center text-muted mb-4">
                      <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        className="mt-4"
                        ref={el => {
                          this.recaptcha = el;
                        }}
                        sitekey={gCapchatSiteKey}
                        onChange={handleCaptchaResponseChange}
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="info"
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        {t("sign-in")}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Button
                    color="link"
                    className="text-light"
                    onClick={onClickForgotPassword}
                  >
                    {t("forgot-password")}
                  </Button>
                </Col>
                <Col className="text-right" xs="6">
                  <Button
                    color="link"
                    className="text-light"
                    onClick={onClickCreateNewAccount}
                  >
                    {t("create-new-account")}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default LoginPage;
