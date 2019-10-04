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

class ResetPassword extends Component {
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
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    console.log("errors", errors.email);

    return (
      <>
        <AuthHeader title="TheVault Foundation" lead="Admin dashboard" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              {message && <Alert color={status}>
                {message}
              </Alert>}
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>{t("title")}</small>
                  </div>
                  <Form role="form">
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
                          placeholder={t('password')}
                          type="password"
                          name={"password"}
                          invalid={errors.password ? true : false}
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
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t('confirm-password')}
                          type="password"
                          name={"confirm_password"}
                          invalid={errors.confirm_password ? true : false}
                          disabled={isSubmitting}
                          onChange={e => {
                            setFieldValue("confirm_password", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedConfirmPassword: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedConfirmPassword: false
                            })
                          }
                          onKeyDown={this.onKeyDown} 
                        />
                        {errors.confirm_password && (
                          <FormFeedback>{errors.confirm_password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className="my-4"
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

export default ResetPassword;
