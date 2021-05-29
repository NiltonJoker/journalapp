import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe("Test en <LoginScreen/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
  };

  const history = {
    replace: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe de realizar el dispatch y la navegacion", () => {
    const handleLogin = wrapper.find("button").prop("onClick");
    handleLogin();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Nilton",
      },
    });

    expect(history.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/dc");
    handleLogin();

    expect(history.replace).toHaveBeenCalledWith("/dc");
  });
});
