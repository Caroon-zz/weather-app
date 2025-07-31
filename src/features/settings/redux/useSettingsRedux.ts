import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUnitSystem, UnitSystem } from "../slices/settingsSlice";

export const useSettingsRedux = () => {
  const dispatch = useAppDispatch();
  const unitSystem = useAppSelector((state) => state.settings.unitSystem);

  const updateUnitSystem = useCallback(
    (units: UnitSystem) => {
      dispatch(setUnitSystem(units));
    },
    [dispatch],
  );

  return {
    unitSystem,
    updateUnitSystem,
  };
};
