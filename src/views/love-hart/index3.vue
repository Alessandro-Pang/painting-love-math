<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";
import {calculateDimensions, IPoint} from "../../utils";

const width = window.innerWidth;
const height = window.innerHeight - 60;

const box = new Box({x: 0, y: 0, width, height})

/**
 * x = 16sin^3(t)
 * y = 13cos(t) − 5cos(2t) − 2cos(3t) − cos(4t)
 * @param boxSize
 */
const drawDynamicHeart = (boxSize = 5) => {
  const points: IPoint[] = []
  for (let t = 0; t <= Math.PI * 2; t += 0.005) {
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({x,y})
  }
  // 计算大小
  const {width, height} = calculateDimensions(points)

  let idx = 0;
  const animate = () => {
    if(points.length === idx) return
    requestAnimationFrame(() => {
      const {x, y} = points[idx++];
      box.add(Rect.one({
        x: x * boxSize + (width * boxSize) / 2,
        y: y * boxSize + (height * boxSize) / 2,
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
  const app = new App({view: 'graph', width, height})
  app.tree = app.addLeafer()
  drawDynamicHeart(23)
  app.tree.add(box)
})
</script>

<template>
  <div id="graph"></div>
</template>
