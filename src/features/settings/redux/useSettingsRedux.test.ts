import { act, renderHook } from "@testing-library/react-native";
import { useSettingsRedux } from "./useSettingsRedux";

const mockDispatch = jest.fn();
let mockUseAppSelector: jest.Mock;

jest.mock("../../../hooks/redux", () => {
  mockUseAppSelector = jest.fn();
  return {
    useAppDispatch: jest.fn(() => mockDispatch),
    useAppSelector: (...args: any[]) => mockUseAppSelector(...args),
  };
});

jest.mock("../slices/settingsSlice", () => ({
  setUnitSystem: jest.fn((units) => ({
    type: "settings/setUnitSystem",
    payload: units,
  })),
}));

describe("useSettingsRedux", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReset();
  });

  it("returns unitSystem from selector", () => {
    mockUseAppSelector.mockImplementation((fn) =>
      fn({ settings: { unitSystem: "metric" } }),
    );
    const { result } = renderHook(() => useSettingsRedux());
    expect(result.current.unitSystem).toBe("metric");
  });

  it("dispatches setUnitSystem when updateUnitSystem is called", () => {
    mockUseAppSelector.mockImplementation((fn) =>
      fn({ settings: { unitSystem: "imperial" } }),
    );
    const { setUnitSystem } = require("../slices/settingsSlice");
    setUnitSystem.mockImplementation((units) => ({
      type: "settings/setUnitSystem",
      payload: units,
    }));
    const { result } = renderHook(() => useSettingsRedux());
    act(() => {
      result.current.updateUnitSystem("metric");
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "settings/setUnitSystem",
      payload: "metric",
    });
  });
});
