import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Environment } from '@react-three/drei/Environment'
import { Gallery } from './Gallery'
import { useScroll } from 'react-use'
import { Html } from '@react-three/drei'
// import InView from 'react-intersection-observer'

function FollowMouse() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
  })
}

export default function App() {
  const scrollRef = useRef(null)
  const { x, y } = useScroll(scrollRef)

  const [scroll, setScroll] = useState(0)

  const normalize = (val, min, max) => {
    return (val - min) / (max - min)
  }

  useEffect(() => {
    const s = normalize(y, 0, 2000 - window.innerHeight)
    setScroll(s)
  }, [y])

  useEffect(() => {
    // window.onwheel = () => {
    //   scrollRef.current.style['pointer-events'] = 'auto'
    // }
    // window.onmousemove = () => {
    //   scrollRef.current.style['pointer-events'] = 'none'
    // }
    // const canvas = document.querySelector("canvas")
    // window.addEventListener("mousemove", (e) => {
    //   console.log("mousemove")
    //   canvas.onmousemove();
    // }, false)
  }, [])

  return (
    <div ref={scrollRef} id="scroll">
      <Canvas colorManagement shadowMap>
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
      <div id="scroll-content"></div>
    </div>
  )
}
