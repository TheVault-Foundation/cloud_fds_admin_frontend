import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Modal,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardBody,
  Input
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

class ApiManagement extends Component {
  state = {
    apis: [],
    apiSecretShown: false
  };

  componentDidMount() {
    let apis = [];
    for (let i = 0; i < 3; i++) {
      apis.push({
        key: this.makeId(20),
        createdBy: "00" + i,
        created: this.randomDate(
          new Date(2012, 0, 1),
          new Date()
        ).toDateString()
      });
    }
    this.setState({ apis });
  }

  randomDate = (start, end) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  makeId = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  renderItem = api => {
    return (
      <tr>
        <th scope="row">{api.key}</th>
        <td className="budget">{api.createdBy}</td>
        <td className="budget">{api.created}</td>
        <td>
          <div className="avatar-group">
            <Button color="default" size="sm" outline type="button">
              Deactivate
            </Button>
            <Button
              color="default"
              size="sm"
              outline
              type="button"
              onClick={() => this.toggleModal("formModal")}
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  render() {
    const { apis = [] } = this.state;
    return (
      <>
        <SimpleHeader name="Tables" parentName="Tables" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="border-0">
                <Row>
                <Col xs="6">
                  <h3 className="mb-0">Striped table</h3>
                </Col>
                  <Col className="text-right" xs="6">
                  <Button
                    className="btn-round btn-icon"
                    color="primary"
                    id="tooltip443412080"
                    onClick={e => e.preventDefault()}
                  >
                    <span className="btn-inner--text">Create a new API Key</span>
                  </Button>
                </Col>
                </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">API Key</th>
                      <th scope="col">Created by</th>
                      <th scope="col">Created</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {apis.map(api => this.renderItem(api))}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>

          <Modal
            className="modal-dialog-centered"
            size="lg"
            isOpen={this.state.formModal}
            toggle={() => this.toggleModal("formModal")}
          >
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardBody>
                  <Form>
                    <FormGroup>
                      <label htmlFor="exampleFormControlInput1">API Key</label>
                      <Input
                        id="exampleFormControlInput1"
                        type="text"
                        value={"AHJRWGHWOFNANVAOHFASOFA"}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="exampleFormControlInput1">
                        API Secret
                      </label>
                      <Input
                        id="exampleFormControlInput1"
                        type={this.state.apiSecretShown ? "text" : "password"}
                        value={"AHJRWGHWOFNANVAOHFASOFA"}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="primary"
                          outline
                          onClick={() => {
                            const newState = !this.state.apiSecretShown;
                            this.setState({ apiSecretShown: newState });
                          }}
                        >
                          {this.state.apiSecretShown ? "Hide": "Show"}
                        </Button>
                      </InputGroupAddon>
                    </FormGroup>
                  </Form>
                  <Button color="primary" type="button">
                    Save changes
                  </Button>
                  <Button color="danger" type="button">
                    Deactivate
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default ApiManagement;
