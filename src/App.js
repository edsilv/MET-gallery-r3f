import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Environment } from '@react-three/drei/Environment'
import { Gallery } from './Gallery'

function FollowMouse() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
  })
}

export default function App() {
  return (
    <Canvas
      colorManagement
      shadowMap>
      <ambientLight intensity={0.5} />
      {/* <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} /> */}
      <Suspense fallback={null}>
        {/* <MusicBox /> */}
        <Gallery />
        <Environment files="royal_esplanade_1k.hdr" />
      </Suspense>
      {/* <OrbitControls enablePan={true} /> */}
      <FollowMouse />
    </Canvas>
  )
}
