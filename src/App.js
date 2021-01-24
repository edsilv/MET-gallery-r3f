import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Environment } from '@react-three/drei/Environment'
import { Gallery } from './Gallery'
import { Html } from '@react-three/drei'
// import InView from 'react-intersection-observer'

function FollowMouse() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
  })
}

export default function App() {

  const [absScrollY, setAbsScrollY] = useState(0)
  const [scroll, setScroll] = useState(0)

  const maxScrollY = 2000;

  const normalize = (val, min, max) => {
    return (val - min) / (max - min)
  }

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max)
  }

  const onWheelHandler = (e) => {
    let y = clamp(absScrollY + e.deltaY, 0, maxScrollY)
    y = normalize(y, 0, maxScrollY)
    setScroll(y)
    setAbsScrollY(clamp(absScrollY + e.deltaY, 0, maxScrollY))
  }

  return (
    <Canvas onWheel={onWheelHandler} colorManagement shadowMap>
      <ambientLight intensity={0.5} />
      {/* <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} /> */}
      <Suspense
        fallback={
          <Html center>
            <span className="loading">loading...</span>
          </Html>
        }>
        {/* <MusicBox /> */}
        <Gallery scroll={scroll} />
        <Environment files="royal_esplanade_1k.hdr" />
      </Suspense>
      {/* <OrbitControls enablePan={true} /> */}
      <FollowMouse />
    </Canvas>
  )
}
