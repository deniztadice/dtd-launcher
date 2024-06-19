import { isWelcomeDialog, registerSettings } from "./settings.js";
import { addButtonToSidebar, advDialog, log } from "./utils.js";

Hooks.once("init", async () => {
    log("Loading module")
    registerSettings()
    // console.log("Loading module")
})

Hooks.once("ready", function () {
    if(game.users.current.isGM){
        addButtonToSidebar()
        console.info('DEBUG:',isWelcomeDialog('get'))
        isWelcomeDialog('get') && advDialog.render({ force: true })
    } 
    log("Loaded")
});