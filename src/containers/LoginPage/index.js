import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "i18next";
import { compose } from "recompose";

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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey =
  process.env.RECAPTCHA_SITE_KEY || "6LePkrgUAAAAAEaSfflZjl-UoDKATwlzaPaLIbug";

class LoginPage extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  goToSignUpPage = () => {
    this.props.history.push("/signup");
  };

  handleCaptchaResponseChange = (response) => {
    console.log("ReCAPTCHA", response);
  }
  render() {
    const { t } = this.props;

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
                          placeholder="Email"
                          type="email"
                          onFocus={() =>
                            this.setState({ focusedEmail: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedEmail: false })
                          }
                        />
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
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
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
                        sitekey={siteKey}
                        onChange={this.handleCaptchaResponseChange}
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button className="my-4" color="info" type="button">
                        {t("sign-in")}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>{t("forgot-password")}</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => {
                      e.preventDefault();
                      this.goToSignUpPage();
                    }}
                  >
                    <small>{t("create-new-account")}</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false
  };
};

export default compose(
  withNamespaces("login", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(LoginPage);
