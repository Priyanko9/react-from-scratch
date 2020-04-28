import React from 'react';
import fetch from 'jest-fetch-mock';
import {shallow} from 'enzyme';

import {App} from '../App';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const setUp=(props,component)=>{
  const wrapper=shallow(<App/>);
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
    currentPage:0,
    totalPages:2,
    hitsPerPage:20
  }
  

  // foo is a mock function
  // let getFeedData=jest.mock('../FetchData.service');
  // let mockGetFeedData=getFeedData.mockImplementation(async (pageNumber)=>{
  //   return Promise.resolve({
  //     totalRows:[{
  //       page:22,
  //       nbPages:88,
  //       hitsPerPage:20
  //     }],
  //     totalData:{
  //       page:22,
  //       nbPages:88,
  //       hitsPerPage:20
  //     }
  //   });
  // });
  beforeEach(()=>{
    
    fetch.resetMocks();
  })
 
  test('Should render App Component', () => {
    fetch.mockResponseOnce({
      totalRows:[{
        page:22,
        nbPages:88,
        hitsPerPage:20
      }],
      totalData:{
        page:22,
        nbPages:88,
        hitsPerPage:20
      }
    });
    const wrapper = setUp();
    wrapper.instance().setState({state});
    const component = findByTestAtrr(wrapper, 'AppComponent');
    
    expect(component.length).toBe(1);
  });
})

