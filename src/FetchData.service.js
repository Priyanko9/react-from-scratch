import { API_URL, FRONTPAGE_TAG } from "./Constants";

export const checkTimeDifference = created_at => {
  const date1 = new Date();
  const date2 = new Date(created_at);
  const diffTime = Math.abs(date2 - date1);

  if (Math.ceil(diffTime / (1000 * 60) < 60)) {
    return Math.ceil(diffTime / (1000 * 60) < 60) + "seconds ago";
  } else if (
    Math.ceil(
      diffTime / (1000 * 60 * 60) < 24 &&
        Math.ceil(diffTime / (1000 * 60) >= 60)
    )
  ) {
    return Math.ceil(diffTime / (1000 * 60 * 60)) + "minutes ago";
  } else {
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + "days ago";
  }
};

export const getFeedData = async pageNumber => {
  let totalRows = [],
    data;
  if (localStorage) {
    data = JSON.parse(localStorage.getItem("newsData"));
  }
  let url = API_URL + "?tags=" + FRONTPAGE_TAG;
  if (pageNumber) {
    url = url + "&page=" + pageNumber;
  }
  try {
    let result = await fetch(url);
    let totalData = await result.json();
    let count = totalData.hits;
    count.forEach(ele => {
      let duration = checkTimeDifference(ele.created_at);
      let row = {
        title: ele.title,
        url: ele.url,
        author: ele.author,
        points: ele.points,
        duration: duration,
        hide: false,
        objectID: ele.objectID
      };
      totalRows.push(row);
    });
    if (data && data.length > 0) {
      data = data.concat(totalRows);
    } else {
      data = totalRows;
    }
    localStorage.setItem("newsData", JSON.stringify(data));
    return { totalRows, totalData };
  } catch (e) {
    console.log(e);
  }
};
