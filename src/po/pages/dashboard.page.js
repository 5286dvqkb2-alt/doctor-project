const sideMenu = require("../components/common/sidemenu.component");

class DashboardPage {
    constructor() {
        this.sideMenu = sideMenu;
    }

    get title() {
        return "Appointment Planner - Syncfusion Angular Components Showcase App";
    }

    async open() {
        await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/dashboard");
    }
}

module.exports = new DashboardPage();
