import voice12 from '../statics/audio/guoan.mp3'
import voice13 from '../statics/audio/open.wav'
import voice0 from '../statics/audio/m_0.wav'
import voice1 from '../statics/audio/m_1.wav'
import voice2 from '../statics/audio/m_2.wav'
import voice3 from '../statics/audio/m_3.wav'
import voice4 from '../statics/audio/m_4.wav'
import voice5 from '../statics/audio/m_5.wav'
import voice6 from '../statics/audio/m_6.wav'
import voice7 from '../statics/audio/m_7.wav'
import voice8 from '../statics/audio/m_8.wav'
import voice9 from '../statics/audio/m_9.wav'
import voice10 from '../statics/audio/m_10.wav'
import voice11 from '../statics/audio/m_11.wav'
// 开奖声音
export const prizeVoice = [
  {
    type: 0,
    path: voice0
  },
  {
    type: 1,
    path: voice1
  },
  {
    type: 2,
    path: voice2
  },
  {
    type: 3,
    path: voice3
  },
  {
    type: 4,
    path: voice4
  },
  {
    type: 5,
    path: voice5
  },
  {
    type: 6,
    path: voice6
  },
  {
    type: 7,
    path: voice7
  },
  {
    type: 8,
    path: voice8
  },
  {
    type: 9,
    path: voice9
  },
  {
    type: 10,
    path: voice10
  },
  {
    type: 11,
    path: voice11
  },
  {
    type: 'guoan',
    path: voice12
  },
  {
    type: 'open',
    path: voice13
  }
]

export function openVoice (audio, openNumber, lotteryId) {
  if (openNumber.indexOf(' ') !== -1) {
    openNumber = openNumber.split(' ')
  } else {
    openNumber = openNumber.split('')
  }
  var i = 0
  var openball = []
  for (var x = 0; x < openNumber.length; x++) {
    openball.push(+openNumber[x])// 去掉开奖号码前面的0
  }
  audio.src = voice13
  audio.play()
  audio.onended = function () {
    openBallVoice(openball, openball.length, i, audio)
  }
}

function openBallVoice (openball, length, i, audio) {
  // console.log(openball)
  audio.src = prizeVoice[openball[i]].path
  audio.play()
  i++
  audio.onended = function () {
    if (i < length) {
      openBallVoice(openball, length, i, audio)
    }
  }
}
