## compress with draco

https://github.com/CesiumGS/gltf-pipeline

gltf-pipeline -i model.glb -o modelDraco.glb -d

## create gltfjsx tags

https://github.com/pmndrs/gltfjsx#usage

npx gltfjsx [path/to/model.gltf] [options]

## controlling camera position

https://codesandbox.io/s/r3f-camera-animation-timeline-control-forked-tplze

## clickable meshes

```
onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.material.name))}
onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
onPointerMissed={() => (setClicked(null))}
onPointerDown={(e) => (e.stopPropagation(), (setClicked(e.object.material.name)))}
```