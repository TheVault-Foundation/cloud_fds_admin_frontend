import React, { Component } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Modal,
  Form,
  FormGroup,
  FormFeedback,
  InputGroupAddon,
  CardBody,
  Input,
  Alert
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { path, pathOr } from "ramda";

import API from "../../network/API";
import { LoadingIndication } from "components/Indication/LoadingIndication"
import { NoDataIndication } from "components/Indication/NoDataIndication"

const ApiTable = ({
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading = false
}) => (
  <div style={{ maxWidth: "100%", overflow: "scroll" }}>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      pagination={paginationFactory({
        page,
        sizePerPage,
        totalSize,
        alwaysShowAllBtns: true,
        showTotal: true,
        withFirstAndLast: false,
        sizePerPageRenderer: ({
          options,
          currSizePerPage,
          onSizePerPageChange
        }) => (
          <div className="dataTables_length" id="datatable-basic_length">
            <label>
              Show{" "}
              {
                <select
                  name="datatable-basic_length"
                  aria-controls="datatable-basic"
                  className="form-control form-control-sm"
                  onChange={e => onSizePerPageChange(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              }{" "}
              entries.
            </label>
          </div>
        )
      })}
      onTableChange={onTableChange}
      noDataIndication={() => !loading ? <NoDataIndication /> : <LoadingIndication />}
    />
  </div>
);

class ApiManagement extends Component {
  state = {
    apis: [],
    apiSecretShown: false,
    apiModalShown: false,
    createNewAPIModalShown: false,
    createNewAPIError: false,
    page: 1,
    sizePerPage: 10,
    loading: false
  };

  componentDidMount() {
    const { page, sizePerPage } = this.state;
    this.loadUserApi(page, sizePerPage);
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.loadUserApi(page, sizePerPage);
  };

  loadUserApi = (page = 1, sizePerPage = 10) => {
    const query = {
      page: page,
      size: sizePerPage,
      active: true
    };

    const { user } = this.props;
    const userId = path(["id"], user);

    if (userId) {
      this.setState({ apis: [], loading: true });
      API.getUserApi(userId, query).then(response => {
        this.setState({loading: false})
        if (response.status === 200) {
          const apis = pathOr([], ["data", "items"], response);
          const count = pathOr([], ["data", "count"], response);

          const activateAPIs = apis.filter(api => api.isActive);
          this.setState({ apis: activateAPIs, count, page });
        }
      }).catch(e => {
        console.log(e)
        this.setState({loading: false})
      });
    }
  };

  createUserApi = () => {
    if (this.state.apis && this.state.apis.length === 3) {
      this.setState({
        status: "danger",
        message: "Maximum number of api keys is 3"
      });
      setTimeout(() => {
        this.setState({
          status: null,
          message: null
        });
      }, 5000);
      return;
    }

    const { user } = this.props;
    const { apiName, page, sizePerPage } = this.state;
    const userId = path(["id"], user);
    this.setState({ apis: [], loading: true, createNewAPIModalShown: false });
    API.createUserApi(userId, { apiName }).then(response => {
      this.setState({apiName: null})
      if (response.status === 200) {
        this.loadUserApi(page, sizePerPage);
      }
    }).catch(e => {
      console.log(e);
      this.setState({
        loading: false
      })
    });;
  };

  deactivateUserApi = apiId => {
    const { user } = this.props;
    const { page, sizePerPage } = this.state;
    const userId = path(["id"], user);
    this.setState({ apis: [], loading: true });
    API.updateUserApi(userId, apiId, { isActive: false }).then(response => {
      if (response.status === 204) {
        this.loadUserApi(page, sizePerPage);
      }
    }).catch(e => {
      console.log(e);
      this.setState({
        loading: false
      })
    });;
  };

  updateUserApi = () => {
    const { id: userId } = this.props.user;
    const { id: appId, apiName, page, sizePerPage } = this.state;
    this.setState({ users: [], loading: true });
    API.updateUserApi(userId, appId, {
      apiName
    }).then(response => {
      if (response.status === 204) {
        this.loadUserApi(page, sizePerPage);

        this.setState({
          id: null,
          apiName: null,
        });
      }
    }).catch(e => {
      console.log(e);
      this.setState({
        loading: false
      })
    });;
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
        <Button
          color="default"
          size="sm"
          outline
          type="button"
          onClick={() => this.deactivateUserApi(apiId)}
        >
          <i className="fa fa-ban" aria-hidden="true"></i>
        </Button>
        <Button
          color="default"
          size="sm"
          outline
          type="button"
          onClick={() => {
            this.setState({ ...row, apiModalShown: true });
          }}
        >
          <i className="fa fa-eye" aria-hidden="true"></i>
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
              onClick={() => {
                this.setState({ ...api, apiModalShown: true });
              }}
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  renderAPIInfoModal = () => {
    const { apiName, apiKey, apiSecret, createdAt, createdBy } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.apiModalShown}
        toggle={() => {
          this.setState({ apiModalShown: !this.state.apiModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="apiName">API Name</label>
                  <Input
                    id="apiName"
                    type="text"
                    value={apiName}
                    onChange={e => {
                      this.setState({ apiName: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="apiKey">API Key</label>
                  <Input id="apiKey" type="text" value={apiKey} disabled />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="apiSecret">API Secret</label>
                  <Input
                    id="apiSecret"
                    type={this.state.apiSecretShown ? "text" : "password"}
                    value={apiSecret}
                    disabled
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="primary"
                      onClick={() => {
                        const newState = !this.state.apiSecretShown;
                        this.setState({ apiSecretShown: newState });
                      }}
                    >
                      {this.state.apiSecretShown ? "Hide" : "Show"}
                    </Button>
                  </InputGroupAddon>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="createdAt">Created At</label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={createdAt}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="createdBy">Created By</label>
                  <Input
                    id="createdBy"
                    type="text"
                    value={createdBy}
                    disabled
                  />
                </FormGroup>
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  this.updateUserApi();
                  const newState = !this.state.apiModalShown;
                  this.setState({ apiModalShown: newState });
                }}
              >
                Save changes
              </Button>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  };

  renderCreateNewAPIModal = () => {
    const { apiName, createNewAPIError } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.createNewAPIModalShown}
        toggle={() => {
          this.setState({ createNewAPIModalShown: !this.state.createNewAPIModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="apiName">API Name</label>
                  <Input
                    id="apiName"
                    type="text"
                    value={apiName}
                    onChange={e => {
                      this.setState({ createNewAPIError: false, apiName: e.target.value });
                    }}
                    invalid={createNewAPIError}
                  />

                  {createNewAPIError && (
                    <FormFeedback>API Name can't be empty</FormFeedback>
                  )}
                </FormGroup>
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  if (!apiName) {
                    this.setState({createNewAPIError: true})
                    return;
                  }

                  if (!createNewAPIError) {
                  this.createUserApi();
                    const newState = !this.state.createNewAPIModalShown;
                    this.setState({ createNewAPIModalShown: newState });
                  }
                }}
              >
                Create API Key
              </Button>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  };

  render() {
    const { apis = [], message, status, count, sizePerPage, page, loading } = this.state;
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
                        onClick={() => {
                          this.setState({createNewAPIModalShown: true})
                        }}
                      >
                        <span className="btn-inner--text">
                          Create a new API Key
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                {message && <Alert color={status}>{message}</Alert>}

                <ApiTable
                  keyField="apiKey"
                  bootstrap4={true}
                  bordered={false}
                  data={apis}
                  columns={[
                    {
                      dataField: "apiName",
                      text: "API Name",
                      searchable: true,
                    },
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
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={count}
                  onTableChange={this.handleTableChange}
                  loading={loading}
                />
              </Card>
            </div>
          </Row>

          {this.renderAPIInfoModal()}
          {this.renderCreateNewAPIModal()}
        </Container>
      </>
    );
  }
}

export default ApiManagement;
