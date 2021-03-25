import * as React from "react"
import Particles from "react-particles-js";
import particlesParams from "./particlesParams"

export default (props) => {
  return <div
    style={{
      position: "absolute",
      top: props.top || 0,
      width: '100vw',
      left: 0,
      overflow: "hidden"
    }}
  >
    <Particles
      className="tsparticles-canvas-el"
      params={particlesParams()}
    />
  </div>
}
