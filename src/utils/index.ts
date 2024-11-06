export type IPoint = {x: number, y:number}

/**
 * 计算图形宽高
 * @param points
 */
export function calculateDimensions(points: IPoint[]) {
	let xMax = -Infinity, xMin = Infinity;
	let yMax = -Infinity, yMin = Infinity;

	points.forEach(({x,y})=>{
		// 更新 x 和 y 的最大最小值
		if (x > xMax) xMax = x;
		if (x < xMin) xMin = x;
		if (y > yMax) yMax = y;
		if (y < yMin) yMin = y;
	})

	// 计算宽度和高度
	const width = xMax - xMin;
	const height = yMax - yMin;

	return { width, height, xMax, xMin, yMax, yMin };
}
