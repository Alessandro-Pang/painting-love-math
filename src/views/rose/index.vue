<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";

const width = window.innerWidth;
const height = window.innerHeight - 60;

const box = new Box({x: 0, y: 0, width, height})

/**
 * r = a * cos(kθ)
 * 或者 r = a * sin(kθ)
 * @param size 玫瑰线的大小
 * @param count 花瓣的数量
 *    - 当 count 为奇数时会有 count 个花瓣，为偶数时会有 2count 个花瓣
 * @param boxSize 每个小矩形的尺寸
 * @param points 点的数量
 */
const draw = (size: number, count: number, boxSize: number, points: number) => {
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * Math.PI * 2; // 将 theta 从 0 到 2π 等分
    const r = size * Math.cos(count * theta); // 玫瑰线方程

    // 转换为笛卡尔坐标
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    // 绘制点
    box.add(Rect.one({
      x: x + size + 50,
      y: y + size + 50,
      width: boxSize,
      height: boxSize,
      fill: 'pink', // 可以更改颜色
    }));
  }
};

nextTick(() => {
  const app = new App({view: 'graph', width, height})
  app.tree = app.addLeafer()
  draw(300, 6, 3, 3000);
  app.tree.add(box);
})
</script>

<template>
  <div id="graph"></div>
</template>
