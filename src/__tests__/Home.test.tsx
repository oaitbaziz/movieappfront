import { mount } from "enzyme";
import Searchbar from "pages/Home/components/Searchbar";
import Home from "pages/Home";
import { Provider } from "react-redux";
import store from "redux/store";

describe("<Home />", () => {
  it("Renders searchbar", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(wrapper.contains(Searchbar)).toBe(true);
  });
});
