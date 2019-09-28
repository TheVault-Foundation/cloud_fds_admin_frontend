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
import BootstrapTable, { TableHeaderColumn } from "react-bootstrap-table-next";
import { path, pathOr } from "ramda";

import API from "../../network/API";

const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

class ApiManagement extends Component {
  state = {
    apis: [],
    apiSecretShown: false
  };

  componentDidMount() {
    this.loadUserApi();
  }

  loadUserApi = () => {
    const { user } = this.props;
    const userId = path(["id"], user);
    if (userId) {
      API.getUserApi(userId).then(response => {
        if (response.status === 200) {
          const apis = pathOr([], ["data", "items"], response);
          const activateAPIs = apis.filter(api => api.isActive);
          this.setState({ apis: activateAPIs });
        }
      });
    }
  };

  createUserApi = () => {
    const { user } = this.props;
    const userId = path(["id"], user);
    this.setState({ apis: [] });
    API.createUserApi(userId).then(response => {
      if (response.status === 200) {
        this.loadUserApi();
      }
    });
  };

  deactivateUserApi = apiId => {
    const { user } = this.props;
    const userId = path(["id"], user);
    this.setState({ apis: [] });
    API.updateUserApi(userId, apiId, { isActive: false }).then(response => {
      if (response.status === 204) {
        this.loadUserApi();
      }
    });
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  buttonFormatter = (cell, row) => {
    console.log("cell", cell);
    console.log("row", row);
    const apiId = row.id;
    return (
      <div className="avatar-group">
        <Button color="default" size="sm" outline type="button" onClick={() => this.deactivateUserApi(apiId)}>
          Deactivate
        </Button>
      </div>
    );
  };

  renderItem = api => {
    return (
      <tr key={api.apiKey}>
        <th scope="row">{api.apiKey}</th>
        <td className="budget">{api.createdBy}</td>
        <td className="budget">{api.createdAt}</td>
        <td>
          <div className="avatar-group">
            <Button
              color="default"
              size="sm"
              outline
              type="button"
              onClick={e => {
                e.preventDefault();
                this.deactivateUserApi(api.id);
              }}
            >
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

  renderModal = api => {
    return (
      <tr>
        <th scope="row">{api.apiKey}</th>
        <td className="budget">{api.createdBy}</td>
        <td className="budget">{api.createdAt}</td>
        <td>
          <div className="avatar-group">
            <Button color="default" size="sm" outline type="button" id={api.id}>
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
                      <h3 className="mb-0">API Management</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Button
                        className="btn-round btn-icon"
                        color="primary"
                        id="tooltip443412080"
                        onClick={this.createUserApi}
                      >
                        <span className="btn-inner--text">
                          Create a new API Key
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <BootstrapTable
                  noDataIndication={() => <NoDataIndication />}
                  keyField="apiKey"
                  bootstrap4={true}
                  bordered={false}
                  data={apis}
                  columns={[
                    {
                      dataField: "apiKey",
                      text: "API Key",
                      searchable: true
                    },
                    {
                      dataField: "createdBy",
                      text: "Created By"
                    },
                    {
                      dataField: "createdAt",
                      text: "Created At"
                    },
                    {
                      dataField: "actions",
                      formatter: this.buttonFormatter,
                      csvExport: false,
                      text: "Actions",
                      isDummyField: true
                    }
                  ]}
                  page={1}
                  sizePerPage={10}
                  totalSize={10}
                />
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
                          {this.state.apiSecretShown ? "Hide" : "Show"}
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
