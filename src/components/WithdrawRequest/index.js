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

class WithdrawRequest extends Component {
  state = {
    data: [],
    apiSecretShown: false,
    addressModalShown: false,
    createNewAddressModalShown: false,
    createNewAddressError: false,
    page: 1,
    sizePerPage: 10,
    loading: false
  };

  componentDidMount() {
    const { page, sizePerPage } = this.state;
    this.loadWithdrawRequest(page, sizePerPage);
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.loadWithdrawRequest(page, sizePerPage);
  };

  loadWithdrawRequest = (page = 1, sizePerPage = 10) => {
    const query = {
      page: page,
      size: sizePerPage,
      active: true
    };

    const { user } = this.props;
    const userId = path(["id"], user);

    if (userId) {
      this.setState({ data: [], loading: true });
      API.getWithdrawRequest(userId, query).then(response => {
        this.setState({loading: false})
        if (response.status === 200) {
          const data = pathOr([], ["data", "items"], response);
          const count = pathOr([], ["data", "count"], response);

          this.setState({ data, count, page });
        }
      }).catch(e => {
        console.log(e)
        this.setState({loading: false})
      });
    }
  };

  createUserAddress = () => {
    const { user } = this.props;
    const { address, currency, page, sizePerPage } = this.state;
    const userId = path(["id"], user);
    this.setState({ data: [], loading: true, createNewAddressModalShown: false });
    API.createUserAddress(userId, { address, currency }).then(response => {
      this.setState({address: null})
      if (response.status === 200) {
        this.loadUserAddress(page, sizePerPage);
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
    this.setState({ data: [], loading: true });
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
            this.setState({ ...row, addressModalShown: true });
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
                this.setState({ ...api, addressModalShown: true });
              }}
            >
              Edit
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  renderAddressInfoModal = () => {
    const { address, currency, createdAt } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.addressModalShown}
        toggle={() => {
          this.setState({ addressModalShown: !this.state.addressModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="address">Address</label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="currency">Currency</label>
                  <Input id="currency" type="text" value={currency} disabled />
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
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  const newState = !this.state.addressModalShown;
                  this.setState({ addressModalShown: newState });
                }}
              >
                Close
              </Button>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  };

  renderCreateNewAddressModal = () => {
    const { address, currency, createNewAddressError } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.createNewAddressModalShown}
        toggle={() => {
          this.setState({ createNewAddressModalShown: !this.state.createNewAddressModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="address">Address</label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={e => {
                      this.setState({ createNewAddressError: false, address: e.target.value });
                    }}
                    invalid={createNewAddressError}
                  />

                  {createNewAddressError && (
                    <FormFeedback>Address can't be empty</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="address">Currency</label>
                  <Input
                    id="currency"
                    type="text"
                    value={currency}
                    onChange={e => {
                      this.setState({ createNewAddressError: false, currency: e.target.value });
                    }}
                    invalid={createNewAddressError}
                  />

                  {createNewAddressError && (
                    <FormFeedback>Currency can't be empty</FormFeedback>
                  )}
                </FormGroup>
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  if (!currency) {
                    this.setState({createNewAddressError: true})
                    return;
                  }

                  if (!createNewAddressError) {
                  this.createUserAddress();
                    const newState = !this.state.createNewAddressModalShown;
                    this.setState({ createNewAddressModalShown: newState });
                  }
                }}
              >
                Create new Address
              </Button>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  };

  render() {
    const { data = [], message, status, count, sizePerPage, page, loading } = this.state;
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
                      <h3 className="mb-0">Withdraw Requests</h3>
                    </Col>
                    {/* <Col className="text-right" xs="6">
                      <Button
                        className="btn-round btn-icon"
                        color="primary"
                        id="tooltip443412080"
                        onClick={() => {
                          this.setState({createNewAddressModalShown: true})
                        }}
                      >
                        <span className="btn-inner--text">
                          Create a new API Key
                        </span>
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>

                {message && <Alert color={status}>{message}</Alert>}

                <ApiTable
                  keyField="apiKey"
                  bootstrap4={true}
                  bordered={false}
                  data={data}
                  columns={[
                    {
                      dataField: "createdAt",
                      text: "Created At",
                    },
                    {
                      dataField: "fromAddress",
                      text: "From Address",
                    },
                    {
                      dataField: "toAddress",
                      text: "To Address"
                    },
                    {
                      dataField: "amount",
                      text: "Amount"
                    },
                    {
                      dataField: "fromCurrency",
                      text: "Currency"
                    },
                    {
                      dataField: "code",
                      text: "Code"
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

          {this.renderAddressInfoModal()}
          {this.renderCreateNewAddressModal()}
        </Container>
      </>
    );
  }
}

export default WithdrawRequest;
