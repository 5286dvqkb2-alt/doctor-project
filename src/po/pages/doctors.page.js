const addDoctor = require("../components/add-doctor.component");
const newDoctor = require("../components/new-doctor.component");

class DoctorsPage {
    constructor() {
        this.addDoctor = addDoctor;
        this.newDoctor = newDoctor;
    }

    async open() {
        await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctors");
    }

    async openAddDoctorDialog() {
        await this.addDoctor.open();
        await this.newDoctor.waitForOpened();
    }

    doctorByName(name) {
        return $(`//*[contains(text(), "${name}")]`);
    }
}

module.exports = new DoctorsPage();
