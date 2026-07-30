export interface DotPoint {
  id: string
  x: number
  y: number
}

export interface FlowLine {
  key: string
  x1: number
  y1: number
  x2: number
  y2: number
  delayClass: string
}

export interface MapNode {
  key: string
  x: number
  y: number
}

export const cloudDots: DotPoint[] = Array.from({ length: 60 }, (_, rowIndex) => {
  const y = Number((0.375 + rowIndex * 1.375).toFixed(3))
  const offset = rowIndex % 2 === 0 ? 0 : 0.685

  return Array.from({ length: 66 }, (_, colIndex) => {
    const x = Number((52.407 + offset + colIndex * 1.369).toFixed(3))
    return { id: `cloud-${rowIndex}-${colIndex}`, x, y }
  })
}).flat().filter((dot) => {
  const clusters = [
    { x: 66, y: 19, rx: 18, ry: 21 },
    { x: 96, y: 18, rx: 17, ry: 18 },
    { x: 124, y: 22, rx: 22, ry: 23 },
    { x: 82, y: 50, rx: 24, ry: 25 },
    { x: 116, y: 58, rx: 24, ry: 22 },
  ]
  const holes = [
    { x: 76, y: 19, rx: 7, ry: 5 },
    { x: 103, y: 34, rx: 9, ry: 8 },
    { x: 135, y: 48, rx: 7, ry: 11 },
  ]
  const inCluster = clusters.some((cluster) => {
    const dx = (dot.x - cluster.x) / cluster.rx
    const dy = (dot.y - cluster.y) / cluster.ry
    return dx * dx + dy * dy <= 1
  })
  const inHole = holes.some((hole) => {
    const dx = (dot.x - hole.x) / hole.rx
    const dy = (dot.y - hole.y) / hole.ry
    return dx * dx + dy * dy <= 1
  })

  return inCluster && !inHole
})

export const tokenNodes: MapNode[] = [
  { key: 'north-east', x: 133.194, y: 27.875 },
  { key: 'center', x: 118.132, y: 44.375 },
  { key: 'west', x: 86.639, y: 37.5 },
  { key: 'south', x: 103.755, y: 66.375 },
]

export const tokenPaths = [
  { key: 'token-a', d: 'M86.639 37.5 C98 31 112 31 133.194 27.875', delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'token-b', d: 'M86.639 37.5 C95 50 105 56 118.132 44.375', delayClass: 'ecosystem-visual__flow--delay-1' },
  { key: 'token-c', d: 'M103.755 66.375 C112 58 122 53 133.194 27.875', delayClass: 'ecosystem-visual__flow--delay-2' },
]

export const edgeLines: FlowLine[] = [
  { key: 'edge-a', x1: 105, y1: 30, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'edge-b', x1: 145, y1: 35, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-3' },
  { key: 'edge-c', x1: 135, y1: 70, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'edge-d', x1: 95, y1: 65, x2: 125, y2: 55, delayClass: 'ecosystem-visual__flow--delay-4' },
]

export const edgeNodes: MapNode[] = [
  { key: 'edge-node-a', x: 105, y: 30 },
  { key: 'edge-node-b', x: 145, y: 35 },
  { key: 'edge-node-c', x: 135, y: 70 },
  { key: 'edge-node-d', x: 95, y: 65 },
]

export const serverLines: FlowLine[] = [
  { key: 'server-a', x1: 120, y1: 28, x2: 140, y2: 52, delayClass: 'ecosystem-visual__flow--delay-0' },
  { key: 'server-b', x1: 140, y1: 52, x2: 110, y2: 65, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'server-c', x1: 120, y1: 28, x2: 110, y2: 65, delayClass: 'ecosystem-visual__flow--delay-5' },
]

export const serverNodes = [
  { key: 'server-top', transform: 'translate(115, 21)', delaySet: 'ecosystem-visual__server--top' },
  { key: 'server-right', transform: 'translate(135, 45)', delaySet: 'ecosystem-visual__server--right' },
  { key: 'server-left', transform: 'translate(105, 58)', delaySet: 'ecosystem-visual__server--left' },
]

export const rackRows = [
  { key: 'row-a', y: 2, cy: 3.2, delayClass: 'ecosystem-visual__led--delay-0' },
  { key: 'row-b', y: 5.8, cy: 7, delayClass: 'ecosystem-visual__led--delay-1' },
  { key: 'row-c', y: 9.6, cy: 10.8, delayClass: 'ecosystem-visual__led--delay-2' },
]

export const bridgeLines: FlowLine[] = [
  { key: 'bridge-a', x1: 80, y1: 42, x2: 115, y2: 40, delayClass: 'ecosystem-visual__flow--delay-1' },
  { key: 'bridge-b', x1: 115, y1: 40, x2: 150, y2: 38, delayClass: 'ecosystem-visual__flow--delay-2' },
  { key: 'bridge-c', x1: 150, y1: 38, x2: 115, y2: 40, delayClass: 'ecosystem-visual__flow--delay-6' },
]
