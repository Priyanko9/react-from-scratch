import React from "react";
import { shallow } from "enzyme";

import { Pagination } from "../Pagination.component";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const setUp = props => {
  const wrapper = shallow(<Pagination {...props} />);
  return wrapper;
};

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

describe("Pagination Component", () => {
  test("Should render Pagination Component and simulate click for more button", () => {
    let props = {
      totalData: [1, 2, 3],
      callback: jest.fn(),
      currentPage: 0,
      totalPages: 2,
      render: () => {}
    };
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, "pagination");
    const mockedEvent = {
      target: {
        textContent: "More"
      },
      keyCode: 13,
      type: "enter"
    };
    component.simulate("click", mockedEvent);
    expect(props.callback).toBeCalled();
  });
  test("Should render Pagination Component and simulate click for first button", () => {
    let props = {
      totalData: [1, 2, 3],
      callback: jest.fn(),
      currentPage: 0,
      totalPages: 2,
      render: () => {}
    };
    const wrapper = setUp(props);
    const component = findByTestAtrr(wrapper, "pagination");
    const mockedEvent = {
      target: {
        textContent: "First"
      },
      keyCode: 13,
      type: "enter"
    };
    component.simulate("click", mockedEvent);
    expect(props.callback).toBeCalled();
  });
});
