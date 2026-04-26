const addNewPatient = require("../components/patients/add-new-patient.component");

class PatientsPage {
    constructor() {
        this.addNewPatient = addNewPatient;
    }

    async open() {
        await browser.url("https://ej2.syncfusion.com/showcase/angular/appointmentplanner/#/patients");
    }

    async openAddNewPatientDialog() {
        await this.addNewPatient.open();
        await this.addNewPatient.waitForOpened();
    }

    patientByName(name) {
        return $(`//*[contains(text(), "${name}")]`);
    }
}

module.exports = new PatientsPage();
