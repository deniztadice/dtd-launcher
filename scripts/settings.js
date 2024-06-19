import { MODULE_ID } from "./const.js";

const logError = (log) => {
    console.error(MODULE_ID,'Settings:',log);
}

// Settings names

const welcomeDialog = 'welcomeDialog'

export const registerSettings = () =>{

    game.settings.register(MODULE_ID, welcomeDialog, {
        name: 'Welcome Dialog',
        hint: 'Should it be shown after each enter to the World?',
        config: true,       // false if you dont want it to show in module config
        type: Boolean,       // You want the primitive class, e.g. Number, not the name of the class as a string
        default: true,
        onChange: value => { // value is the new value of the setting
          console.log(value)
        },
        requiresReload: false,
      })

    
}
export const isWelcomeDialog = (action, value) => 
    action === 'get' ? game.settings.get(MODULE_ID, welcomeDialog) :
    action === 'set' ? game.settings.set(MODULE_ID, welcomeDialog, value) :
    logError(welcomeDialog);
