import { app } from "./classes.js";
import { API } from "./const.js";
import { isWelcomeDialog } from "./settings.js";

const { DialogV2 } = foundry.applications.api

export const log = (log) => {
    const modName = '%cLauncher DTD | '
    const consoleStyle = 'color: orange; font-weight:bold'
    console.log(modName + log, consoleStyle)
}

export const addButtonToSidebar = () => {
    const sidebar = document.getElementById('game-details')
    const div = document.createElement('div')
    const header = document.createElement('h2')
    header.innerText = 'LAUNCHER'
    div.classList = ['dtd-launcher-sidebar']
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-circle-info"></i>' + "Menu"
    button.addEventListener('click', async () => {
        console.log('asd')
        app.render(true)
        // const lang = game.i18n.lang
        // const pack = game.packs.get("dft.dft-journal")
        // const entry = await pack.getDocument(pack.index.get(lang==='uk'? "6X18bTQODOupr2Jp": "5DR7lZZUgrQVTCf2")._id)
        // entry.sheet.render(true)
    })
    sidebar.insertAdjacentElement('afterend', header)
    header.insertAdjacentElement('afterend', div)
    div.insertAdjacentElement('afterend', button)
}

export const getAdventures = async (api) => {
    let adventures = []
    try {
        let data = await fetch(api).then((res) => res.json())
        for (const key in data) {
            const adventureUrl = data[key]
            await fetch(adventureUrl).then((res) => res.json()).then((data) => adventures.push(data))
        }
        const content = adventures.map(adventure => {
            return `<li>${adventure.title}</li>`
        }).join('')
        return adventures
    } catch (error) {
        return ['Oooops!']
    }



    //console.log(adventures)

}
//console.log(adventures)
export const adventures = await getAdventures(API)

// console.log(content)

const dialogContent = `Hi!<br>You can found launcher in "Seetings" => "Launcher" section.<br>This launcher show list of adventures which were converted for Foundry VTT.`

export const advDialog = new DialogV2({
    window: { title: 'DTD Launcher' },
    content: dialogContent,
    buttons: [{
        action: 'open',
        label: 'Open Launcher',
        icon: 'fa-solid fa-rocket-launch',
        callback: () => app.render(true),
        default: true
    }, {
        action: 'dontShowMe',
        label: "Don't show me it again",
        icon: 'fa-solid fa-eye-slash',
        callback: () => isWelcomeDialog('set',false),
    }]
});





