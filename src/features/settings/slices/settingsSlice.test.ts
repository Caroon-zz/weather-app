import { settingsReducer, SettingsState, setUnitSystem } from "./settingsSlice";

describe("settingsSlice", () => {
  it("should return the initial state", () => {
    expect(settingsReducer(undefined, { type: undefined })).toEqual({
      unitSystem: "metric",
    });
  });

  it("should handle setUnitSystem to metric", () => {
    const prevState: SettingsState = { unitSystem: "imperial" };
    const action = setUnitSystem("metric");
    const nextState = settingsReducer(prevState, action);
    expect(nextState.unitSystem).toBe("metric");
  });

  it("should handle setUnitSystem to imperial", () => {
    const prevState: SettingsState = { unitSystem: "metric" };
    const action = setUnitSystem("imperial");
    const nextState = settingsReducer(prevState, action);
    expect(nextState.unitSystem).toBe("imperial");
  });
});
