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

class RegisterPage extends Component {
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

    return (
      <>
        <AuthHeader
          title="TheVault Foundation"
          lead={t("create-new-account")}
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>{t("sign-up-label")}</small>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedName
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("name")}
                          type="text"
                          name={"name"}
                          value={values["name"]}
                          onChange={e => {
                            setFieldValue("name", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedName: true })}
                          onBlur={() => this.setState({ focusedName: false })}
                          invalid={errors.name ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.name && (
                          <FormFeedback>{errors.name}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("email")}
                          type="email"
                          name={"email"}
                          value={values["email"]}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown} 
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
                          placeholder={t("password")}
                          type="password"
                          name={"password"}
                          value={values["password"]}
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
                          invalid={errors.password ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown} 
                        />

                        {errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedCompany
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("company")}
                          type="text"
                          name={"company"}
                          value={values["company"]}
                          onChange={e => {
                            setFieldValue("company", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedCompany: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedCompany: false })
                          }
                          invalid={errors.company ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.company && (
                          <FormFeedback>{errors.company}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAddress
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-address-book" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("address")}
                          type="text"
                          name={"address"}
                          value={values["address"]}
                          onChange={e => {
                            setFieldValue("address", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedAddress: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedAddress: false })
                          }
                          invalid={errors.address ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.address && (
                          <FormFeedback>{errors.address}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                            checked={values["toc"]}
                            onChange={e => {
                              setFieldValue("toc", e.target.value);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              {t("toc-1")}{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                {t("toc-2")}
                              </a>
                            </span>
                          </label>
                        </div>
                        <Input
                          invalid={errors.toc ? true : false}
                          type="hidden"
                          value={values["toc"]}
                        />
                        {errors.toc && (
                          <FormFeedback>{errors.toc}</FormFeedback>
                        )}
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={submitForm}
                      >
                        {t("create-account")}
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

export default RegisterPage;
