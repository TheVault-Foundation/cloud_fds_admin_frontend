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
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  Input,
  CustomInput,
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
  ModalFooter,
  ModalBody
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import API from "../../network/API";
import { path } from "ramda";
const { SearchBar } = Search;
const UserTable = ({
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize
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
      noDataIndication={() => <NoDataIndication />}
    />
  </div>
);

const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

class UserManagement extends Component {
  state = {
    users: [],
    page: 1,
    sizePerPage: 10,
    apiModalShown: false,
    userConfirmModalShown: false,
    selectedUserId: null,
    selectedUserStatus: false
  };

  componentDidMount() {
    this.getUsers(1);
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.getUsers(page, sizePerPage);
  };

  onUserConfirmYes = () => {
    this.setState({ userConfirmModalShown: false }, () => {
      const { selectedUserId = null, selectedUserStatus = false } = this.state;
      if (selectedUserId) {
        this.updateUserStatus(selectedUserId, selectedUserStatus);
      }
    });
  };

  onUserConfirmNo = () => {
    this.setState({
      userConfirmModalShown: false,
      selectedUserIdToDeactivate: null
    });
  };

  getUsers = (page, sizePerPage) => {
    const query = {
      page: page,
      size: sizePerPage
    };

    console.log("getUsers - this.props.userId", this.props.userId);
    console.log("getUsers - page", page);

    API.getUsers(query)
      .then(response => {
        console.log("getUsers", response);
        if (response.status === 200) {
          // Success
          const users = path(["data", "items"], response);
          const count = path(["data", "count"], response);
          this.setState({ users, count, page, sizePerPage });
        }
      })
      .catch(e => {
        console.log(e);
      });

    this.setState({ users: [] });
  };

  updateUserStatus = (userId, currentStatus) => {
    const { page, sizePerPage } = this.state;
    this.setState({ users: [] });
    API.updateUser(userId, { isActive: !currentStatus }).then(response => {
      if (response.status === 204) {
        this.getUsers(page, sizePerPage);
      }
    });
  };

  updateUser = () => {
    const {
      id,
      page,
      sizePerPage,
      username,
      company,
      contactNumber,
      address,
      billingType,
      emailVerified,
      roleType,
      isActive
    } = this.state;
    this.setState({ users: [] });
    API.updateUser(id, {
      username,
      company,
      contactNumber,
      address,
      billingType,
      emailVerified,
      roleType,
      isActive
    }).then(response => {
      if (response.status === 204) {
        this.getUsers(page, sizePerPage);

        this.setState({
          username: null,
          company: null,
          contactNumber: null,
          address: null,
          billingType: null,
          emailVerified: false,
          roleType: null,
          isActive: false
        });
      }
    });
  };

  buttonFormatter = (cell, row) => {
    console.log("cell", cell);
    console.log("row", row);
    const userId = row.id;
    const isActive = row.isActive;
    return (
      <div className="avatar-group">
        <Button
          color="default"
          size="sm"
          outline
          type="button"
          disabled={!isActive}
          onClick={() =>
            this.setState({
              selectedUserId: userId,
              selectedUserStatus: isActive,
              userConfirmModalShown: true
            })
          }
        >
          <i class="fa fa-ban" aria-hidden="true"></i>
        </Button>
        <Button
          color="default"
          size="sm"
          outline
          type="button"
          disabled={isActive}
          onClick={() =>
            this.setState({
              selectedUserId: userId,
              selectedUserStatus: isActive,
              userConfirmModalShown: true
            })
          }
        >
          <i class="fa fa-check-circle" aria-hidden="true"></i>
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
          <i class="fa fa-eye" aria-hidden="true"></i>
        </Button>
      </div>
    );
  };

  renderAPIInfoModal = () => {
    const {
      username,
      company,
      email,
      contactNumber,
      address,
      billingType,
      emailVerified,
      roleType,
      isActive
    } = this.state;

    return (
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={this.state.apiModalShown}
        scrollable={true}
        toggle={() => {
          this.setState({ apiModalShown: !this.state.apiModalShown });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody>
              <Form>
                <FormGroup>
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => {
                      this.setState({ username: e.target.value });
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="company">Company</label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={e => {
                      this.setState({ company: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="text" value={email} disabled />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="contactNumber">Contact number</label>
                  <Input
                    id="contactNumber"
                    type="text"
                    value={contactNumber}
                    onChange={e => {
                      this.setState({ contactNumber: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="address">Address</label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={e => {
                      this.setState({ address: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="billingType">Billing Type</label>
                  <Input
                    type="select"
                    name="billingType"
                    id="billingType"
                    disabled
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="emailVerified">Email Verified?</label>
                  <CustomInput
                    id="emailVerified"
                    name="emailVerified"
                    type="switch"
                    checked={emailVerified}
                    onChange={e => {
                      this.setState({ emailVerified: e.target.checked });
                    }}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="isActive">Is active?</label>
                  <CustomInput
                    id="isActive"
                    name="isActive"
                    type="switch"
                    checked={isActive}
                    onChange={e => {
                      this.setState({ isActive: e.target.checked });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="roleType">Role</label>
                  <Input
                    type="select"
                    name="roleType"
                    id="roleType"
                    onChange={e => {
                      this.setState({ roleType: e.target.value });
                    }}
                    defaultValue={roleType}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </Input>
                </FormGroup>
              </Form>
              <Button
                color="primary"
                type="button"
                onClick={() => {
                  const newState = !this.state.apiModalShown;
                  this.setState({ apiModalShown: newState });

                  this.updateUser();
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

  renderUserConfirmationModal = () => {
    const { selectedUserStatus } = this.state;

    return (
      <Modal
        isOpen={this.state.userConfirmModalShown}
        toggle={() => {
          this.setState({
            userConfirmModalShown: !this.state.userConfirmModalShown
          });
        }}
        className={this.props.className}
      >
        <ModalBody>
          Are you sure you want to{" "}
          {selectedUserStatus ? "deactivate" : "activate"} this user?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onUserConfirmYes}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={this.onUserConfirmNo}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    const { users = [], count, page, sizePerPage } = this.state;

    console.log("users", users);

    return (
      <>
        <SimpleHeader name="Tables" parentName="Tables" />

        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="border-0">
                  <h3 className="mb-0">User List</h3>
                </CardHeader>

                <UserTable
                  bootstrap4={true}
                  bordered={false}
                  data={users}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={count}
                  onTableChange={this.handleTableChange}
                  columns={[
                    {
                      dataField: "username",
                      text: "Username",
                      searchable: true
                    },
                    {
                      dataField: "company",
                      text: "Company"
                    },
                    {
                      dataField: "email",
                      text: "Email"
                    },
                    {
                      dataField: "contactNumber",
                      text: "Contact number"
                    },
                    {
                      dataField: "roleType",
                      text: "Role"
                    },
                    {
                      dataField: "emailVerified",
                      text: "Verified"
                    },
                    {
                      dataField: "isActive",
                      text: "Active"
                    },
                    {
                      dataField: "actions",
                      formatter: this.buttonFormatter,
                      csvExport: false,
                      text: "Actions",
                      isDummyField: true
                    }
                  ]}
                />

                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>

          {this.renderAPIInfoModal()}
          {this.renderUserConfirmationModal()}
        </Container>
      </>
    );
  }
}

export default UserManagement;
