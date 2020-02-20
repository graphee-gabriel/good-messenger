/////////////////////////////
// CONSTANTS

const REFRESH_INTERVAL = 500;

const selectorMyAvatar = '._7sta._7stb._87u_'
const selectorSettings = '._6ymu._7iq4'
const selectorNewMessage = 'a[data-href="https://www.messenger.com/new"]'
const selectorSearchBar = '._1nq2._7vup'
const selectorConversationListContainer = '.uiScrollableAreaContent'

const selectorChatInputExtraMenuContent = '._7mkk._7t1o._7t0j'
const selectorChatInputExtraMenuContentHorizontal = '._7mkk._7mkl'
const selectorChatInputChooseAGif = '._7mkk a[aria-label="Choose a gif"]'
const selectorChatInputChooseASticker = '._7mkk a[aria-label="Choose a sticker"]'
const selectorChatInputChooseAFile = '._7mkk form[title="Add files"]'
const selectorChatInputSendALike = 'a[aria-label="Send a Like"]'


const selectorInfoPannelConversationInfoButton = 'a[aria-label="Conversation Information"]'
const selectorInfoPannelFriendInfoContainer = '._2jnt._6_m-'
const selectorChatInputTextContentContainer = '._5rp7._5rp8 ._1mf._1mj > span > span'
const selectorSearchContactInput = 'input[class="_58al _7tpc"]'



/////////////////////////////
// VARIABLES

// let hasTextInInput = false;



/////////////////////////////
// HELPERS

const setStyleKeysForAllInstancesOfManySelectors = (selectors, styles, delay) => {
  const run = () => {
    for (const selector of selectors) {
      var elems = document.querySelectorAll(selector);
      for (i = 0; i < elems.length; i++) {
        for (const key in styles) {
          const value = styles[key];
          elems[i].style[key] = value;
        }
      }
    }
  }
  if (delay && delay > 0) {
    setTimeout(run, delay);
  } else {
    run();
  }
}

const setStyleKeysForAllInstances = (selector, styles, delay) => {
  setStyleKeysForAllInstancesOfManySelectors([selector], styles, delay);
}

const removeElementAll = (selector) => {
  var elems = document.querySelectorAll(selector);
  for (i = 0; i < elems.length; i++) {
    const elem = elems[i];
    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

}

const removeElement = (selector) => {
  var elem = document.querySelector(selector);
  return elem && elem.parentNode && elem.parentNode.removeChild(elem);
}



/////////////////////////////
// MAIN LOOP

const runUpdateStylesLoop = () => {


  // const chatInputExtraMenuContent = document.querySelector(selectorChatInputExtraMenuContent);
  // // const chatInputExtraMenuContentHorizontal = document.querySelector(selectorChatInputExtraMenuContentHorizontal);
  // // const chatInputExtraMenuContainer = chatInputExtraMenuContent || chatInputExtraMenuContentHorizontal
  // if (chatInputExtraMenuContent) {
  //   const selectors = [selectorChatInputChooseAGif, selectorChatInputChooseASticker, selectorChatInputSendALike]
  //   for (const selector of selectors) {
  //     const child = document.querySelector(selector);
  //     if (child && chatInputExtraMenuContent.querySelector(selector) === null) {
  //       chatInputExtraMenuContent.appendChild(child);
  //     }
  //   }
  // }

  const infoPannelFriendInfoContainer = document.querySelector(selectorInfoPannelFriendInfoContainer)
  if (infoPannelFriendInfoContainer) {
    if (infoPannelFriendInfoContainer.querySelector('div[class="call-buttons"]') === null) {
      const div = document.createElement('ul');
      div.className = 'call-buttons';
      div.style.display = 'flex';
      div.style['flex-direction'] = 'row';
      infoPannelFriendInfoContainer.appendChild(div);
    }
    const infoPannelFriendInfoContainerCallButtons = infoPannelFriendInfoContainer.querySelector('ul[class="call-buttons"]');
    for (var i = 0; i < 2; i++) {
      const child = document.querySelector('._fl2._6ymr li');
      if (child.querySelector('div[aria-label="Start a voice call"]') !== null || child.querySelector('div[aria-label="Start a video chat"]') !== null) {
        infoPannelFriendInfoContainerCallButtons.appendChild(child)
      }
    }
  }
}



/////////////////////////////
// MAIN INIT FUNCTION (DELAYED)

const runUpdateStylesOneShot = () => {
  const conversationListContainer = document.querySelector(selectorConversationListContainer);
  const searchBar = document.querySelector(selectorSearchBar);
  const settings = document.querySelector(selectorSettings);
  const newMessage = document.querySelector(selectorNewMessage);
  const optionContainer = document.createElement('div');
  optionContainer.style['margin-top'] = '12px';
  optionContainer.style.display = 'flex';
  conversationListContainer.insertBefore(optionContainer, searchBar);
  optionContainer.appendChild(searchBar);
  optionContainer.appendChild(settings);
  optionContainer.appendChild(newMessage);
  settings.style['margin-left'] = 0;
  settings.style['margin-top'] = '4px';
  newMessage.style['margin-top'] = '4px';
  newMessage.style['margin-right'] = '8px';
  removeElement(selectorMyAvatar);
  removeElement('._6-xl._6-xm');
  removeElement('div[role="banner"]');
}



/////////////////////////////
// ADD LISTENERS

document.addEventListener("keyup", function (event) {
  const searchContactInput = document.querySelector(selectorSearchContactInput);
  const searchContactInputIsFocused = searchContactInput && document.activeElement === searchContactInput;
  const hasTextInInput = document.querySelector(selectorChatInputTextContentContainer) !== null;
  if (!hasTextInInput) {
    switch (event.key) {
      case 'ArrowUp': {
        const previous = document.querySelector('._5l-3._1ht1._6zk9._1ht2');
        if (previous && previous.previousSibling) {
          previous.previousSibling.querySelector('a').click()
        }
        break;
      }
      case 'ArrowDown': {
        const next = document.querySelector('._5l-3._1ht1._6zk9._1ht2 + li a');
        if (next) {
          next.click()
        }
        break;
      }
      case 'ArrowRight': {
        const toggleInfoButton = document.querySelector(selectorInfoPannelConversationInfoButton)
        if (toggleInfoButton) {
          toggleInfoButton.click();
        }
        break;
      }
      case 'ArrowLeft': {
        if (searchContactInput && !searchContactInputIsFocused) {
          searchContactInput.focus();
          // TODO faire un systeme de up down / enter sur la selection des contacts
          // checker quand l'input est focus (donc search contact list visible)
          // stocker current selected
          // ajouter une classe de current selected pour le highlight
          // même systeme previous next que pour les conversations
        }
        break;
      }
    }
  }
})

/////////////////////////////
// RUN

// set up loop and delayed init function

runUpdateStylesLoop();
setInterval(runUpdateStylesLoop, REFRESH_INTERVAL);
setTimeout(runUpdateStylesOneShot, 300);