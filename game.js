
//For the game mechanics code, I used "Web dev simplified" tutorial on how to build an adventure game with javascript. His GitHub code is also referenced.

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


//this will create the fullscreen function, the key for fullscreen is "Enter" key
document.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}, false);

//full screen is toggle able so you can go in and out of fullscreen
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
  //I have implemented a game sound feature by playing a "beep" sound effect every time an option in the game is selected.
  const audio = new Audio("beep.mp3");
      audio.play();
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    
    text: 'You are training in the woods before you hear the kings soldiers approaching. You have the option to carry a slingshot or run',
    options: [
      {
        text: 'Take the slingshot',
        setState: { slingshot: true },
        nextText: 2
      },
      {
        text: 'Leave the slingshot and run',
        setState: { none: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You run and run from the human army until you find a nearby town, you are offered trade.',
    options: [
      {
        text: 'Trade the slingshot for a short-sword',
        requiredState: (currentState) => currentState.slingshot,
        setState: { slingshot: false, sword: true },
        nextText: 3
      },
      {
        
        text: 'Trade the slingshot for a shield',
        requiredState: (currentState) => currentState.slingshot,
        setState: { slingshot: false, shield: true },
        nextText: 3
      },

      {
        
        text: 'Reject the trade offer, keep the slingshot.',
        requiredState: (currentState) => currentState.slingshot,
        nextText: 3
      },

      {
        text: 'Reject the trade offer as you have nothing to trade.',
        requiredState: (currentState) => currentState.none,
        nextText: 3

        
      },

        

    ]
  },
  {
    id: 3,
    text: 'Upon exiting the town, you encounter a bounty hunter, who wants to kill you as you are an elf for a reward from the king.',
    options: [
      {
        text: 'Try to run away from the bounty hunter. Warning: you are already tired.',
        requiredState: (currentState) => currentState.none,
        nextText: 4
      },
      {
        requiredState: (currentState) => currentState.slingshot,
        text: 'Attack the bounty hunter with your slingshot',
        nextText: 5
      },
      {
        requiredState: (currentState) => currentState.slingshot,
        text: 'Run because you see the bounty hunter has a sword',
        nextText: 4
      },
      {
        requiredState: (currentState) => currentState.sword,
        text: 'Attack the bounty hunter with your short-sword.',
        
        nextText: 6
      },
      {
        requiredState: (currentState) => currentState.sword,
        text: 'Run because you see the bounty hunter has a much bigger sword',
        nextText: 4
      },
      {
        requiredState: (currentState) => currentState.shield,
        text: 'Close the distance by covering with your shield and block the bounty hunters attack',
        
        nextText: 7
      },
      {
        requiredState: (currentState) => currentState.shield,
        text: 'Run from the bounty hunters attack',
        
        nextText: 4
      },
    ]
  },
  {
    id: 4,
    text: 'The bounty hunter laughs at your patchetic attempt at fleeing as he easily catches up and takes you to the king to be executed.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    
    text: 'The bounty hunter laughed at your pathetic slingshot and kills you.',
    requiredState: (currentState) => currentState.slingshot,
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    
    id: 6,
    text: 'The bounty hunter laughs are he easily counters the parry from your puny short-sword with his longsword',
    requiredState: (currentState) => currentState.sword,
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You block the bounty hunters attack using your shield, thwarting his attack, you slay him with his own weapon, now the bounty hunters Longsword is yours. You also disguie as the bounty hunter that you have just slain and infiltrate the kings castle.',
    setState: { longsword: true , sword:false, shield: true }, //a new item is given
    options: [
      {
        text: 'Explore the castle',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: 'While exploring the castle you encounter the king alone on his throne, you challenge him to combat',
    options: [
      {
        text: 'Run from the battle as you are scared.',
        nextText: 9
      },
      {
        text: 'Attack the king with your sword',
        
        nextText: 10
      },
      {
        text: 'Dual wielld your sword and shield to attack and defend against the king',
        
        nextText: 11
      },
      {
        text: 'Hide behind your shield',
        
        nextText: 12
      },
      
    ]
  },
  {
    id: 9,
    text: 'The King is insulted by your cowardice and you are publicly executed',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The king kill kills you as he was simply too skillful and strong.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You Win! You succesfully defended the kings attack and striked a fatal blow which earned you the throne to the kingdom. Congratulations.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'The king easily manuouvered your shield and killed you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()


