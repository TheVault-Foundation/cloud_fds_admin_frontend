import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactTooltip from "react-tooltip";
import { path } from "ramda";

import API from "../../network/API";

import { LoadingIndication } from "components/Indication/LoadingIndication";
import { NoDataIndication } from "components/Indication/NoDataIndication";
const TransactionTable = ({
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading = false,
  rowEvents
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
      noDataIndication={() =>
        !loading ? <NoDataIndication /> : <LoadingIndication />
      }
      rowEvents={rowEvents}
    />
  </div>
);

class Transaction extends Component {
  state = {
    transactions: [],
    page: 1,
    sizePerPage: 10,
    loading: false,
    popovers: {}
  };

  toggle(key) {
    let popovers = this.state.popovers;
    popovers[key] = !popovers[key];
    this.setState({
      popovers
    });
  }

  openPopover(key) {
    let popovers = this.state.popovers;
    if (!popovers[key]) {
      popovers[key] = true;
      this.setState({
        popovers
      });
    }
  }

  closePopover(key) {
    let popovers = this.state.popovers;
    if (popovers[key]) {
      popovers[key] = false;
      this.setState({
        popovers
      });
    }
  }

  usernameFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={cell}>{cell}</p>
        <ReactTooltip place="right" type="dark" effect="solid">
          <div>
            <p>{`From Address: ${row.fromAddress}`}</p>
            <p>{`From Currency: ${row.fromCurrency}`}</p>
            <p>{`To Address: ${row.toAddress}`}</p>
            <p>{`To Currency: ${row.toCurrency}`}</p>
            <p>{`Amount: ${row.amount}`}</p>
            <p>{`Created at: ${row.createdAt}`}</p>
          </div>
        </ReactTooltip>
      </>
    );
  };

  senderIPFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`senderIP-${row.id}`}>{cell}</p>
      </>
    );
  };

  fromAddressFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`fromAddress-${row.id}`}>{cell}</p>
      </>
    );
  };

  toAddressFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`toAddress-${row.id}`}>{cell}</p>
      </>
    );
  };

  amountFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`amount-${row.id}`}>{cell}</p>
      </>
    );
  };

  currencyFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`currency-${row.id}`}>{cell}</p>
      </>
    );
  };

  scoreFormatter = (cell, row) => {
    return (
      <>
        <p data-tip={`score-${row.id}`}>{cell}</p>
      </>
    );
  };

  senderIpFormatter = (cell, row) => {
    return (
      `<a href="https://www.freecodecamp.org/${cell}" target='_blank'>` +
      cell +
      `</a>`
    );
  };

  componentDidMount() {
    this.getTransactions(1);
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.getTransactions(page, sizePerPage);
  };

  getTransactions = (page, sizePerPage = 10) => {
    const query = {
      page: page,
      size: sizePerPage,
      sort: "createdAt_desc"
    };

    console.log("getTransactions - this.props.userId", this.props.userId);
    console.log("getTransactions - page", page);

    this.setState({ transactions: [], loading: true });
    API.getTransactions(this.props.userId, query)
      .then(response => {
        console.log("getTransactions", response);
        this.setState({ loading: false });
        if (response.status === 200) {
          // Success
          const transactions = path(["data", "items"], response);
          const count = path(["data", "count"], response);
          this.setState({
            popovers: {},
            transactions,
            count,
            page,
            sizePerPage
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { transactions = [], count, page, sizePerPage, loading } = this.state;

    console.log("transactions", transactions);

    return (
      <>
        <SimpleHeader name="Tables" parentName="Tables" />

        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card id="Popover1">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Transaction List</h3>
                </CardHeader>
                <TransactionTable
                  columns={[
                    {
                      dataField: "username",
                      text: "Username",
                      formatter: this.usernameFormatter
                    },
                    {
                      dataField: "senderIp",
                      text: "Sender IP",
                      formatter: this.senderIPFormatter
                    },
                    {
                      dataField: "fromAddress",
                      text: "From Address",
                      formatter: this.fromAddressFormatter
                    },
                    {
                      dataField: "toAddress",
                      text: "To Address",
                      formatter: this.toAddressFormatter
                    },
                    {
                      dataField: "amount",
                      text: "Amount",
                      formatter: this.amountFormatter
                    },
                    {
                      dataField: "fromCurrency",
                      text: "Currency",
                      formatter: this.currencyFormatter
                    },
                    {
                      dataField: "score",
                      text: "Score",
                      formatter: this.scoreFormatter
                    }
                  ]}
                  bootstrap4={true}
                  bordered={false}
                  data={transactions}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={count}
                  onTableChange={this.handleTableChange}
                  loading={loading}
                />
                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Transaction;
