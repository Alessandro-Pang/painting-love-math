<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";

const box = new Box({
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
const drawDynamicHeart = (size = 100, boxSize = 5) => {
  const scale = size / 4.1 // 缩放因子，以适应不同尺寸
  const center = size / 2;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // 将 i 和 j 转换成 [-1, 1] 范围的 x 和 y 坐标
      const x = (i - center) / scale // 以中心为基准，向左移动
      const y = -(j - center) / scale // 翻转 y 轴

      // 将笛卡尔坐标转换为极坐标，检查是否符合心形方程
      const theta = Math.atan2(y, x);
      const r = Math.sqrt(x * x + y * y);
      const heartR = 1 - Math.sin(theta); // 心形方程

      // 使用爱心的方程
      if (r < heartR) {
        box.add(Rect.one({
          x: i * boxSize,
          y: j * boxSize,
          width: boxSize - 1,
          height: boxSize - 1,
          fill: 'pink',
          zIndex: 1
        }))
      }
    }
  }
}

nextTick(() => {
  const app = new App({view: 'graph'})
  app.tree = app.addLeafer()
  const size = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth

  drawDynamicHeart(size / 5, 5)
  app.tree.add(box)
})
</script>

<template>
  <div id="graph"></div>
</template>
