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
import ReCAPTCHA from "react-google-recaptcha";

class LoginPage extends Component {
  state = {};

  onKeyDown = (e) => {
    const {
      submitForm,
    } = this.props.formik;
    if (e.key === 'Enter') {
      submitForm();
    }
  }

  render() {
    const {
      formik,
      t,
      onClickForgotPassword,
      onClickCreateNewAccount,
      status,
      message
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
              {message && <Alert color={status}>
                {message}
              </Alert>}
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
                            <i className="fa fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={errors.username ? true : false}
                          disabled={isSubmitting}
                          placeholder="Username"
                          type="username"
                          name={"username"}
                          value={values["username"]}
                          onChange={e => {
                            setFieldValue("username", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.username && (
                          <FormFeedback>{errors.username}</FormFeedback>
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
                          onKeyDown={this.onKeyDown} 
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
                        <span className="text-muted">{t("remember-me")}</span>
                      </label>
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
