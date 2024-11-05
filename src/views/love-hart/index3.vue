<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";

let box = new Box({
  x: 0,
  y: 0,
  width: innerWidth,
  height: innerHeight
})

/**
 * r=1−sin(θ)
 * @param size
 * @param boxSize
 */
const drawDynamicHeart = (boxSize = 5) => {
  const points: {x: number, y:number}[] = []
  for (let t = 0; t <= Math.PI * 2; t += 0.005) {
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({x,y})
  }
  let idx = 0;

  const animate = () => {
    if(points.length === idx) return
    requestAnimationFrame(() => {
      const {x, y} = points[idx++];
      box.add(Rect.one({
        x: x * boxSize + (boxSize * 20),
        y: y * boxSize + (boxSize * 20),
        width: boxSize - 1,
        height: boxSize - 1,
        fill: 'pink',
        zIndex: 1
      }));
      animate()
    })
  }
  animate()
}

nextTick(() => {
  const app = new App({view: 'graph'})
  app.tree = app.addLeafer()
  drawDynamicHeart(23)
  app.tree.add(box)
})
</script>

<template>
  <div id="graph"></div>
</template>
