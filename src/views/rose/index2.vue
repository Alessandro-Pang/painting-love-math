<script setup lang="ts">
import {Box, Rect, App} from 'leafer-ui'
import {nextTick} from "vue";
import {calculateDimensions, IPoint} from "../../utils";

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
 */
const draw = (size: number, count: number, boxSize: number) => {
  const points: IPoint[] = []
  for (let i = -500 / 2; i < 500 / 2; i++) {
    for (let j = -500 / 2; j < 500 / 2; j++) {
      // 计算网格点的笛卡尔坐标
      const x = i * boxSize;
      const y = j * boxSize;

      // 将 (x, y) 转换为极坐标 (r, theta)
      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);

      // 玫瑰线的极坐标方程
      const roseRadius = size * Math.cos(count * theta);

      // 判断点是否在玫瑰线的内部区域
      if (r <= Math.abs(roseRadius)) {
        points.push({x,y})
      }
    }
  }

  const {width, height} = calculateDimensions(points)
  points.forEach(({x, y}) => {
    box.add(Rect.one({
      x: x + width / 2,
      y: y + height / 2,
      width: boxSize - 1,
      height: boxSize - 1,
      fill: 'pink',
    }));
  })
};

nextTick(() => {
  const app = new App({view: 'graph', width, height})
  app.tree = app.addLeafer()
  draw(300, 6, 3);
  app.tree.add(box);
})
</script>

<template>
  <div id="graph"></div>
</template>
