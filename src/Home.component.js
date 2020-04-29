import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      doNotSetStateFromProps: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.doNotSetStateFromProps) {
      return {
        rows: props.rows
      };
    } else {
      state.doNotSetStateFromProps = false;
      return state;
    }
  }
  //update the localStorage as well as the currentPage data
  updateStateAndSave(newRecords, storageData) {
    localStorage.setItem("newsData", JSON.stringify(storageData));
    this.setState(() => {
      return {
        rows: newRecords,
        doNotSetStateFromProps: true
      };
    });
  }
  upvote = (event, record) => {
    //checking for keyboard enter and mouse click event
    if (event.keyCode === 13 || event.type == "click") {
      let localRecord = { ...record }; //creating a new object from record object instead of copying
      let newRecords = this.mapData(localRecord, this.state.rows); //changing the current page data after upvotting
      let data = JSON.parse(localStorage.getItem("newsData"));
      let storageData = this.mapData(localRecord, data); //changing the localStorage data after upvotting
      this.updateStateAndSave(newRecords, storageData);
    }
  };
  hide = (event, record) => {
    if (event.keyCode === 13 || event.type == "click") {
      let localRecord = { ...record };
      let newRecords = this.filterData(localRecord, this.state.rows);
      let data = JSON.parse(localStorage.getItem("newsData"));
      let storageData = this.filterData(localRecord, data);
      this.updateStateAndSave(newRecords, storageData);
    }
  };
  //creating new newsFeedArray after upvotting
  mapData(record, rows) {
    return (
      rows &&
      rows.map(r => {
        if (r.objectID === record.objectID) {
          r.points = record.points + 1;
        }
        return r;
      })
    );
  }
  //filtering out the hidden news after hide click
  filterData(record, rows) {
    return (
      rows &&
      rows.filter(r => {
        if (r.objectID === record.objectID) {
          r.hide = !record.hide;
          return false;
        }
        return true;
      })
    );
  }
  render() {
    let rows = this.state.rows;

    return (
      <div className="home" data-test="HomeComponent">
        {rows &&
          rows.map((r, index) => (
            <HomeTemplate
              row={r}
              index={index}
              key={index}
              upvote={this.upvote}
              hide={this.hide}
            />
          ))}
      </div>
    );
  }
}

export const HomeTemplate = props => {
  let currentPage = localStorage.getItem("currentPage");
  let hitsPerPage = localStorage.getItem("hitsPerPage");
  return (
    <div className="newsfeedrow" data-test="HomeTemplate">
      <div className="upperRow">
        <span>{hitsPerPage * currentPage + props.index + 1}.</span>
        <span
          role="button"
          aria-label="upvote this news button"
          className="upvotePointer links"
          data-test="upvote"
          onClick={e => props.upvote(e, props.row)}
          onKeyDown={e => props.upvote(e, props.row)}
          tabIndex={0}
        ></span>
        <a
          href={props.row.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
        >
          <span className="title">{props.row.title}</span>
        </a>
      </div>
      <div className="bottomRow">
        <span>points:{props.row.points}</span>
        <span>by: {props.row.author}</span>
        <span>{props.row.duration}</span>
        <span
          role="button"
          aria-label="hide this news button"
          data-test="hide"
          className="links"
          onClick={e => props.hide(e, props.row)}
          onKeyDown={e => props.hide(e, props.row)}
          tabIndex={0}
        >
          hide
        </span>
      </div>
    </div>
  );
};

export default function HomeErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Home {...props} />
    </ErrorBoundary>
  );
}
