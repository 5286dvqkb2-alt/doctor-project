const newDoctor = require("../components/new-doctor.component");

class DoctorsPage {
    constructor() {
        this.newDoctor = newDoctor;
    }

    get addDoctorButton() {
        return $(".specialization-types button.e-control");
    }

    async open() {
        await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/doctors");
    }

    async openAddDoctorDialog() {
        await this.addDoctorButton.click();
        await this.newDoctor.waitForOpened();
    }

    doctorByName(name) {
        return $(`//*[contains(text(), "${name}")]`);
    }
}

module.exports = new DoctorsPage();
