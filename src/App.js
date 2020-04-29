import React, { Component } from "react";

import { getFeedData } from "./FetchData.service";
import Home from "./Home.component";
import { Pagination } from "./Pagination.component";
import ErrorBoundary from "./ErrorBoundary";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      currentPage: 0
    };
  }

  componentDidMount() {
    localStorage.removeItem("newsData");
    localStorage.removeItem("fromCache");
    this.getNewsFeedData(this.state.currentPage);
  }
  getNewsFeedData = async pageNumber => {
    let fetchedObject, rows, currentPage, totalPages;
    let fromCache = JSON.parse(localStorage.getItem("fromCache"));
    let hitsPerPage = this.state.hitsPerPage;
    if (fromCache) {
      rows = JSON.parse(localStorage.getItem("newsData")).slice(
        pageNumber * this.state.hitsPerPage,
        pageNumber * this.state.hitsPerPage + this.state.hitsPerPage
      );
      currentPage = pageNumber;
      totalPages = this.state.totalPages;
    } else {
      fetchedObject = await getFeedData(pageNumber);
      if (fetchedObject) {
        rows = fetchedObject.totalRows;
        currentPage = fetchedObject.totalData.page;
        totalPages = fetchedObject.totalData.nbPages;
        hitsPerPage = fetchedObject.totalData.hitsPerPage;
      }
    }
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("hitsPerPage", hitsPerPage);
    this.setState({ rows, currentPage, totalPages, hitsPerPage });
  };
  render() {
    return (
      <div className="App" data-test="AppComponent">
        <header>Hacker News</header>
        {this.state && this.state.rows && this.state.rows.length > 0 && (
          <Pagination
            totalData={this.state.rows}
            callback={this.getNewsFeedData}
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            render={data => <Home rows={data} />}
          />
        )}
      </div>
    );
  }
}

export default function AppErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  );
}
