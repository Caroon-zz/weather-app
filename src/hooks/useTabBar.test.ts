import { renderHook } from "@testing-library/react-native";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTabBarHeight, useTabBarPadding } from "./useTabBar";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock("react-native", () => ({
  Platform: {
    select: jest.fn(),
  },
}));

const mockUseSafeAreaInsets = useSafeAreaInsets as jest.MockedFunction<
  typeof useSafeAreaInsets
>;
const mockPlatformSelect = Platform.select as jest.MockedFunction<
  typeof Platform.select
>;

describe("useTabBar hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useTabBarHeight", () => {
    it("returns correct height for iOS with insets", () => {
      const mockInsets = { bottom: 34, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(119);

      const { result } = renderHook(() => useTabBarHeight());

      expect(result.current).toBe(119);
      expect(Platform.select).toHaveBeenCalledWith({
        ios: 85 + mockInsets.bottom,
        default: 60 + mockInsets.bottom,
      });
    });

    it("returns correct height for Android with insets", () => {
      const mockInsets = { bottom: 0, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(60);

      const { result } = renderHook(() => useTabBarHeight());

      expect(result.current).toBe(60);
      expect(Platform.select).toHaveBeenCalledWith({
        ios: 85 + mockInsets.bottom,
        default: 60 + mockInsets.bottom,
      });
    });

    it("handles different inset values correctly", () => {
      const mockInsets = { bottom: 20, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(105);

      const { result } = renderHook(() => useTabBarHeight());

      expect(result.current).toBe(105);
    });

    it("updates when insets change", () => {
      const initialInsets = { bottom: 10, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(initialInsets);
      mockPlatformSelect.mockReturnValue(95);

      const { result, rerender } = renderHook(() => useTabBarHeight());
      expect(result.current).toBe(95);

      const newInsets = { bottom: 25, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(newInsets);
      mockPlatformSelect.mockReturnValue(110);

      rerender({});
      expect(result.current).toBe(110);
    });
  });

  describe("useTabBarPadding", () => {
    it("returns correct padding object for iOS", () => {
      const mockInsets = { bottom: 34, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(119);

      const { result } = renderHook(() => useTabBarPadding());

      expect(result.current).toEqual({
        paddingBottom: 119,
      });
    });

    it("returns correct padding object for Android", () => {
      const mockInsets = { bottom: 0, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(60);

      const { result } = renderHook(() => useTabBarPadding());

      expect(result.current).toEqual({
        paddingBottom: 60,
      });
    });

    it("uses useTabBarHeight internally", () => {
      const mockInsets = { bottom: 15, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);
      mockPlatformSelect.mockReturnValue(100);

      const { result } = renderHook(() => useTabBarPadding());

      expect(result.current.paddingBottom).toBe(100);
    });

    it("updates when tab bar height changes", () => {
      const initialInsets = { bottom: 5, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(initialInsets);
      mockPlatformSelect.mockReturnValue(90);

      const { result, rerender } = renderHook(() => useTabBarPadding());
      expect(result.current.paddingBottom).toBe(90);

      const newInsets = { bottom: 30, top: 0, left: 0, right: 0 };
      mockUseSafeAreaInsets.mockReturnValue(newInsets);
      mockPlatformSelect.mockReturnValue(115);

      rerender({});
      expect(result.current.paddingBottom).toBe(115);
    });
  });
});
