import fetch from "jest-fetch-mock";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { checkTimeDifference } from "../FetchData.service";

configure({ adapter: new Adapter() });

describe("Fetch Data Service ", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("call checkTimeDifference function", () => {
    let duration = checkTimeDifference("2020-04-27T12:11:32.000Z");
    expect(duration.length).toBeGreaterThan(0);
  });
});
