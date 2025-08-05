import { getWeatherDescription } from "./weatherCodeToDescription";

describe("getWeatherDescription", () => {
  describe("valid weather codes", () => {
    it("returns correct description for clear weather (code 0)", () => {
      expect(getWeatherDescription(0)).toBe("Clear");
    });

    it("returns correct description for mostly clear weather (code 1)", () => {
      expect(getWeatherDescription(1)).toBe("Mostly Clear");
    });

    it("returns correct description for partly cloudy weather (code 2)", () => {
      expect(getWeatherDescription(2)).toBe("Partly Cloudy");
    });

    it("returns correct description for overcast weather (code 3)", () => {
      expect(getWeatherDescription(3)).toBe("Overcast");
    });

    it("returns correct description for fog conditions", () => {
      expect(getWeatherDescription(45)).toBe("Fog");
      expect(getWeatherDescription(48)).toBe("Icy Fog");
    });

    it("returns correct description for drizzle conditions", () => {
      expect(getWeatherDescription(51)).toBe("Light Drizzle");
      expect(getWeatherDescription(53)).toBe("Drizzle");
      expect(getWeatherDescription(55)).toBe("Heavy Drizzle");
      expect(getWeatherDescription(56)).toBe("Light Freezing Drizzle");
      expect(getWeatherDescription(57)).toBe("Freezing Drizzle");
    });

    it("returns correct description for rain conditions", () => {
      expect(getWeatherDescription(61)).toBe("Light Rain");
      expect(getWeatherDescription(63)).toBe("Rain");
      expect(getWeatherDescription(65)).toBe("Heavy Rain");
      expect(getWeatherDescription(66)).toBe("Light Freezing Rain");
      expect(getWeatherDescription(67)).toBe("Freezing Rain");
    });

    it("returns correct description for snow conditions", () => {
      expect(getWeatherDescription(71)).toBe("Light Snow");
      expect(getWeatherDescription(73)).toBe("Snow");
      expect(getWeatherDescription(75)).toBe("Heavy Snow");
      expect(getWeatherDescription(77)).toBe("Snow Grains");
    });

    it("returns correct description for shower conditions", () => {
      expect(getWeatherDescription(80)).toBe("Light Showers");
      expect(getWeatherDescription(81)).toBe("Showers");
      expect(getWeatherDescription(82)).toBe("Heavy Showers");
      expect(getWeatherDescription(85)).toBe("Light Snow Showers");
      expect(getWeatherDescription(86)).toBe("Snow Showers");
    });

    it("returns correct description for thunderstorm conditions", () => {
      expect(getWeatherDescription(95)).toBe("Thunderstorm");
      expect(getWeatherDescription(96)).toBe("Light T-storm w/ Hail");
      expect(getWeatherDescription(99)).toBe("T-storm w/ Hail");
    });
  });

  describe("invalid weather codes", () => {
    it("returns 'Unknown' for invalid numeric codes", () => {
      expect(getWeatherDescription(100)).toBe("Unknown");
      expect(getWeatherDescription(-1)).toBe("Unknown");
      expect(getWeatherDescription(999)).toBe("Unknown");
      expect(getWeatherDescription(50)).toBe("Unknown");
    });

    it("returns 'Unknown' for undefined input", () => {
      expect(getWeatherDescription(undefined)).toBe("Unknown");
    });

    it("returns 'Unknown' for null input", () => {
      expect(getWeatherDescription(null as any)).toBe("Unknown");
    });

    it("returns 'Unknown' for string input", () => {
      expect(getWeatherDescription("sunny" as any)).toBe("Unknown");
      expect(getWeatherDescription("0" as any)).toBe("Unknown");
    });

    it("returns 'Unknown' for boolean input", () => {
      expect(getWeatherDescription(true as any)).toBe("Unknown");
      expect(getWeatherDescription(false as any)).toBe("Unknown");
    });

    it("returns 'Unknown' for object input", () => {
      expect(getWeatherDescription({} as any)).toBe("Unknown");
      expect(getWeatherDescription({ code: 0 } as any)).toBe("Unknown");
    });

    it("returns 'Unknown' for array input", () => {
      expect(getWeatherDescription([] as any)).toBe("Unknown");
      expect(getWeatherDescription([0] as any)).toBe("Unknown");
    });
  });

  describe("edge cases", () => {
    it("handles zero correctly (valid weather code)", () => {
      expect(getWeatherDescription(0)).toBe("Clear");
    });

    it("handles floating point numbers as invalid", () => {
      expect(getWeatherDescription(0.5 as any)).toBe("Unknown");
      expect(getWeatherDescription(1.1 as any)).toBe("Unknown");
    });

    it("handles NaN as invalid", () => {
      expect(getWeatherDescription(NaN)).toBe("Unknown");
    });

    it("handles Infinity as invalid", () => {
      expect(getWeatherDescription(Infinity)).toBe("Unknown");
      expect(getWeatherDescription(-Infinity)).toBe("Unknown");
    });
  });

  describe("type checking", () => {
    it("correctly identifies non-number types", () => {
      const nonNumberInputs = [
        undefined,
        null,
        "string",
        true,
        false,
        {},
        [],
        () => {},
        Symbol("test"),
      ];

      nonNumberInputs.forEach((input) => {
        expect(getWeatherDescription(input as any)).toBe("Unknown");
      });
    });

    it("correctly identifies number types", () => {
      expect(getWeatherDescription(0)).toBe("Clear");
      expect(getWeatherDescription(999)).toBe("Unknown");
    });
  });

  describe("comprehensive weather code coverage", () => {
    const allValidCodes = [
      0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75,
      77, 80, 81, 82, 85, 86, 95, 96, 99,
    ];

    it("handles all documented weather codes", () => {
      allValidCodes.forEach((code) => {
        const description = getWeatherDescription(code);
        expect(description).not.toBe("Unknown");
        expect(typeof description).toBe("string");
        expect(description.length).toBeGreaterThan(0);
      });
    });

    it("returns consistent results for the same input", () => {
      allValidCodes.forEach((code) => {
        const firstCall = getWeatherDescription(code);
        const secondCall = getWeatherDescription(code);
        expect(firstCall).toBe(secondCall);
      });
    });
  });
});
