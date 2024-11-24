import React, { useState } from "react";
import "./App.css";
import bgApi from "@/repositories/bg-api";
import config from "@config";

const App: React.FC = () => {
  // define states
  const [isActivated, setisActivated] = useState(config.isActivated.default);
  const [isHorizontal, setisHorizontal] = useState(config.isHorizontal.default);
  const [spaceSize, setSpaceSize] = useState(config.spaceSize.default);
  const [maxSpaceSize, setMaxSpaceSize] = useState(
    config.spaceSize.max.default
  );
  const [opacity, setOpacity] = useState(config.opacity.default);
  // initialize states
  useEffect(() => {
    const update = async () => {
      const result = await bgApi.getConfig();
      setisActivated(result.isActivated);
      setisHorizontal(result.isHorizontal);
      setSpaceSize(result.spaceSize);
      setMaxSpaceSize(result.maxSpaceSize);
      setOpacity(result.opacity);
    };
    update();
  }, []);
  // define functions to handle events
  const toggleIsActivated = async () => {
    const newValue = !isActivated;
    await bgApi.setIsActivated(newValue);
    setisActivated(newValue);
    bgApi.updateBlinds();
  };
  const toggleIsHorizontal = async () => {
    const newValue = !isHorizontal;
    await bgApi.setIsHorizontal(newValue);
    setisHorizontal(newValue);
    bgApi.updateBlinds();
  };
  const changeSpaceSize = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    await bgApi.setSpaceSize(newValue);
    setSpaceSize(newValue);
    bgApi.updateBlinds();
  };
  const changeMaxSpaceSize = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(event.target.value);
    await bgApi.setMaxSpaceSize(newValue);
    setMaxSpaceSize(newValue);
  };
  const changeOpacity = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    await bgApi.setOpacity(newValue);
    setOpacity(newValue);
    bgApi.updateBlinds();
  };
  // render
  return (
    <div className="body">
      <h1>Document Curtain</h1>
      <div id="config">
        <button
          onClick={toggleIsActivated}
          className={isActivated ? "active" : "disabled"}
        >
          {isActivated ? "Activated" : "Disabled"}
        </button>
        <button onClick={toggleIsHorizontal}>
          {isHorizontal ? "Horizontal" : "Vertical"}
        </button>
        <div id="space-size" className="slider">
          <div className="label">
            <label>Space Size</label>
            <div className="max">
              <label>max</label>
              <input
                type="number"
                value={maxSpaceSize}
                onChange={changeMaxSpaceSize}
              ></input>
            </div>
          </div>
          <input
            type="range"
            min={config.spaceSize.min}
            max={maxSpaceSize}
            step="1"
            value={spaceSize}
            onChange={changeSpaceSize}
          ></input>
        </div>
        <div id="opacity" className="slider">
          <label className="label">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={changeOpacity}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default App;
