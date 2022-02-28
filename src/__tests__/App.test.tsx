import { shallow } from "enzyme";
import App from "../App";

describe("<App />", () => {
  it("Renders app without crashing", () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.find("Span").findWhere((w) => w.text() === "Loading...")
    ).toBeTruthy();
  });
});
