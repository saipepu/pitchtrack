enum COLORS {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  BLACK = 'black'
}
interface message {
  id: string,
  desc: string,
  color: COLORS,
  isCap: boolean,
  onDisplay: boolean,
  column: string
}

let message1: message = {
  id: '1',
  desc: 'Message 1',
  color: COLORS.RED,
  isCap: true,
  onDisplay: false,
  column: 'backlog'
}
let message2: message = {
  id: '2',
  desc: 'Message 2',
  color: COLORS.BLUE,
  isCap: true,
  onDisplay: false,
  column: 'backlog'
}
let message3: message = {
  id: '3',
  desc: 'Message 3',
  color: COLORS.GREEN,
  isCap: false,
  onDisplay: false,
  column: 'backlog'
}
let message4: message = {
  id: '4',
  desc: 'Message 4',
  color: COLORS.BLACK,
  isCap: true,
  onDisplay: false,
  column: 'backlog'
}

export default [message1, message2, message3, message4]
