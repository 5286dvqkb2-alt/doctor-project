class SideMenu {
    get rootEl() {
        return $("#plannerSiderBar");
    }

    itemByName(name) {
        const selectors = {
            dashboard: '[routerlink="/dashboard"]',
            schedule: '[routerlink="/calendar"]',
            doctors: '[routerlink="/doctors"]'
        };

        return this.rootEl.$(selectors[name.toLowerCase()]);
    }

    async openItem(name) {
        await this.itemByName(name).click();
    }
}

module.exports = new SideMenu();
