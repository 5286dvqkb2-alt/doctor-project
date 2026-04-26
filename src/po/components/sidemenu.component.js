class SideMenu {
    get rootEl() {
        return $("#plannerSiderBar");
    }

    itemByName(name) {
        const selectors = {
            dashboard: '[routerlink="/dashboard"]',
            doctors: '[routerlink="/doctors"]',
            patients: '[routerlink="/patients"]'
        };

        const selector = selectors[name.toLowerCase()];

        if (!selector) {
            throw new Error(`Side menu item "${name}" is not supported`);
        }

        return this.rootEl.$(selector);
    }

    async openItem(name) {
        await this.itemByName(name).click();
    }
}

module.exports = new SideMenu();
