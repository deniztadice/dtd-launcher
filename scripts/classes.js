import { getAdventures } from "./utils.js"

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api


class LauncherApplication extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "dtd-launcher-app",
        tag: "div",
        window: {
            title: 'DTD Launcher',
            icon: 'fa-solid fa-triangle-exclamation',
            controls: [
                {
                    icon: 'fa-solid fa-triangle-exclamation',
                    label: 'About',
                    action: 'aboutAction'
                }
            ]
        },
        position: {
            width: 600
        },
        actions: {
            aboutAction: LauncherApplication.aboutAction
        }
    }

    static PARTS = {
        div: {
            template: "modules/dtd-launcher/templates/games.hbs"
        }
    }

    async _prepareContext(context) {
        const data = await getAdventures()
        const games = data.map(game => ({
            title: game.title,
            system: game.relationships?.systems[0]?.id || 'Unknown',
            version: game.version,
            compatibility: game.compatibility,
            manifest: game.manifest
        }));
        return games
    }

    static aboutAction(event, target) {
        console.log(this) // logs the specific application class instance

    }
}

export const app = new LauncherApplication()