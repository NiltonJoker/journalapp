import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const initialState = {
    logged: false,
  };

  let state = {};

  test("Debe de retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Debe de autenticar y colocar el name del usuario", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Nilton",
      },
    };

    const expectedState = {
      name: "Nilton",
      logged: true,
    };

    state = authReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  test("Debe de borrar el name del usuario y el logged en false", () => {
    const action = {
      type: types.logout,
    };

    state = authReducer(state, action);
    expect(state).toEqual(initialState);
  });
});
