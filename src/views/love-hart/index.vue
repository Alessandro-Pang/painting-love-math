<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";

const width = window.innerWidth;
const height = window.innerHeight - 60;

const box = new Box({x: 0, y: 0, width, height})

/**
 * (x^2 + y^2 - 1)^3 - x^2 y^3 = 0
 * @param size
 * @param boxSize
 */
const drawDynamicHeart = (size = 100, boxSize = 5) => {
  const scale = 3 / size // 缩放因子，以适应不同尺寸

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // 将 i 和 j 转换成 [-1, 1] 范围的 x 和 y 坐标
      const x = (i - size / 2) * scale // 以中心为基准，向左移动
      const y = -(j - size / 2) * scale // 翻转 y 轴

      // 使用爱心的方程
      if (Math.pow(x * x + y * y - 1, 3) - Math.pow(x, 2) * Math.pow(y, 3) <= 0) {
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
  const app = new App({view: 'graph', width, height})
  app.tree = app.addLeafer()
  const size = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth

  drawDynamicHeart(size / 5, 5)
  app.tree.add(box)
})
</script>

<template>
  <div id="graph"></div>
</template>
