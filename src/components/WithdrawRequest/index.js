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
    code: null, 
    requestId: null,
    apiSecretShown: false,
    addressModalShown: false,
    approvalModalShown: false,
    approvalError: false,
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

  approveWithdrawRequest = () => {
    const { code, requestId, page, sizePerPage } = this.state;
    this.setState({ loading: true });
    API.approveWithdrawRequest(requestId, { code }).then(response => {
      this.setState({address: null})
      if (response.status === 204) {
        const newState = !this.state.approvalModalShown;
        this.setState({ approvalModalShown: newState });
        this.loadWithdrawRequest(page, sizePerPage);
      } else {
        this.setState({approvalError: true, approvalMessage: "Code is invalid"})
      }
    }).catch(e => {
      this.setState({approvalError: true, approvalMessage: "Code is invalid"})
      this.setState({
        loading: false
      })
    });;
  }

  createUserAddress = () => {
    const { user } = this.props;
    const { address, currency, page, sizePerPage } = this.state;
    const userId = path(["id"], user);
    this.setState({ data: [], loading: true, approvalModalShown: false });
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

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  buttonFormatter = (cell, row) => {
    console.log("cell", cell);
    console.log("row", row);
    const requestId = row.id;
    const active = row.active
    return (
      <div className="avatar-group">
        <Button
          color="default"
          size="sm"
          outline
          type="button"
          onClick={() => this.setState({approvalModalShown: true, requestId})}
          disabled={active}
        >
          <i className="fa fa-check-circle" aria-hidden="true"></i>
        </Button>
      </div>
    );
  };

  renderApprovalModal = () => {
    const { code, requestId, approvalError, approvalMessage } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.approvalModalShown}
        toggle={() => {
          this.setState({ approvalModalShown: !this.state.approvalModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="code">Enter the code</label>
                  <Input
                    id="address"
                    type="text"
                    value={code}
                    onChange={e => {
                      this.setState({ approvalError: false, code: e.target.value });
                    }}
                    invalid={approvalError}
                  />

                  {approvalError && (
                    <FormFeedback>{approvalMessage}</FormFeedback>
                  )}
                </FormGroup>
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  if (!code) {
                    this.setState({approvalError: true, approvalMessage: "Code can't be empty"})
                    return;
                  }

                  if (!approvalError) {
                    this.approveWithdrawRequest(requestId);
                  }
                }}
              >
                Approve
              </Button>
            </CardBody>
          </Card>
        </div>
      </Modal>
    );
  };

  approvalFormatter = (cell, row) => {
    return (
      <>
        {cell ? 'Approved' : 'Not approve'}
      </>
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
                          this.setState({approvalModalShown: true})
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
                      dataField: "active",
                      text: "Approval",
                      formatter: this.approvalFormatter
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

          {this.renderApprovalModal()}
        </Container>
      </>
    );
  }
}

export default WithdrawRequest;
