import React from 'react';
import fetch from 'jest-fetch-mock';
import {shallow} from 'enzyme';

import {Home,HomeTemplate} from '../Home.component';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const setUp=(props)=>{
  const wrapper=shallow(<Home {...props}/>);
  return wrapper;
};
const setUpHomeTemplate=(props)=>{
    const wrapper=shallow(<HomeTemplate {...props}/>);
    return wrapper;
  };
const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

describe('App Component',()=>{
  let state={
    rows:[
      "a","b","c"
    ],
    doNotSetStateFromProps:false
  }
  
  beforeEach(()=>{
    fetch.resetMocks();
  })
 
  test('Should render Home Component', () => {
    let props={
        totalData:state.rows,
        callback:(pageNumber)=>{},
        currentPage:0,
        totalPages:2,
        render:(data)=>{}
      }
    const wrapper = setUp(props);
    wrapper.instance().setState({...state});
    wrapper.update();
    const component = findByTestAtrr(wrapper, 'HomeComponent');
    expect(component.length).toBe(1);
  });
  test('Should render HomeTemplate Component', () => {
    let props={
        row:{
            title:"avc",
            points:50,
            author:"abc",
            duration:"2 min"
        },
        index:1,
        key:1,
        upvote:(row,index)=>{},
        hide:(row,index)=>{}
      };
    const wrapper = setUpHomeTemplate(props);
    const component = findByTestAtrr(wrapper, 'HomeTemplate');
    expect(component.length).toBe(1);
  });
  // test('should call the upvote function', () => {
  //   let props={
  //       totalData:state.rows,
  //       callback:(pageNumber)=>{},
  //       currentPage:0,
  //       totalPages:2,
  //       render:(data)=>{}
  //     }
  //   const wrapper = setUp(props);
  //   wrapper.instance().setState({...state});
  //   wrapper.instance().upvote({},0);
  //   expect(wrapper.instance().state.doNotSetStateFromProps).toBe(true);
  // });
  // test('should call the hide function', () => {
  //   //const mockFn = jest.fn().mockImplementation((newRecords,storageData) => {});
  //   let props={
  //       totalData:state.rows,
  //       callback:(pageNumber)=>{},
  //       currentPage:0,
  //       totalPages:2,
  //       render:(data)=>{}
  //     }
  //   const wrapper = setUp(props);
  //   wrapper.instance().setState({...state});
  //   wrapper.instance().hide({},0);
  //   const mockFn=jest.fn().mockImplementation((newRecords,storageData)=>{
  //     wrapper.instance().state={
  //       rows:[],
  //       doNotSetStateFromProps:true
  //     }
  //   });
  //   wrapper.instance().updateStateAndSave=mockFn;
  //   expect(mockFn.).toBeCalled();
  // });
})

