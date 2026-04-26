const dashboardPage = require("../po/pages/dashboard.page");
const doctorsPage = require("../po/pages/doctors.page");
const patientsPage = require("../po/pages/patients.page");

describe("Appointment Planner", () => {
    afterEach(async () => {
        await doctorsPage.newDoctor.close();
        await patientsPage.addNewPatient.close();
    });

    it("should open the page and check the title", async () => {
        await dashboardPage.open();
        await expect(browser).toHaveTitle(dashboardPage.title);
    });

    it("should open the Doctors page for adding a new doctor", async () => {
        await dashboardPage.sideMenu.openItem("doctors");
        await doctorsPage.openAddDoctorDialog();
        await expect(doctorsPage.newDoctor.rootEl).toBeDisplayed();
    });

    it("should add a new doctor", async () => {
        await doctorsPage.open();
        await doctorsPage.openAddDoctorDialog();
        await expect(doctorsPage.newDoctor.rootEl).toBeDisplayed();

        await doctorsPage.newDoctor.fillForm(
            "Dr. John Dexter",
            "1234567890",
            "john.doe@example.com",
            "MD",
            "Senior Neurologist"
        );

        await doctorsPage.newDoctor.selectGender("Female");
        await expect(doctorsPage.newDoctor.genderRadio("Female")).toBeSelected();

        await doctorsPage.newDoctor.selectDepartment("Neurology");
        await expect(await doctorsPage.newDoctor.dropdownText(doctorsPage.newDoctor.departmentDropdown)).toBe("Neurology");

        await doctorsPage.newDoctor.selectExperience("10+ years");
        await expect(await doctorsPage.newDoctor.dropdownText(doctorsPage.newDoctor.experienceDropdown)).toBe("10+ years");

        await doctorsPage.newDoctor.selectDutyTiming("10:00 AM - 07:00 PM");
        await expect(await doctorsPage.newDoctor.dropdownText(doctorsPage.newDoctor.dutyTimingDropdown)).toBe("10:00 AM - 07:00 PM");
        await doctorsPage.newDoctor.saveButton.click();

        await expect(doctorsPage.newDoctor.rootEl).not.toBeDisplayed();
        await expect(doctorsPage.doctorByName("Dr. John Dexter")).toBeDisplayed();
    });

    it("should open the patients page", async () => {
        await dashboardPage.sideMenu.openItem("patients");
        await patientsPage.openAddNewPatientDialog();
        await expect(patientsPage.addNewPatient.rootEl).toBeDisplayed();
    });

    it ("should add a new patient", async () => {
        await patientsPage.open();
        await patientsPage.openAddNewPatientDialog();
        await expect(patientsPage.addNewPatient.rootEl).toBeDisplayed();

        await patientsPage.addNewPatient.fillForm(
            "Jane Dopl",
            "0987654321",
            "jane.doe@example.com",
            "Headache",
            "05/10/1990",
            "A+"
        );

        await patientsPage.addNewPatient.selectGender("Female");
        await expect(patientsPage.addNewPatient.genderRadio("Female")).toBeSelected();

        await expect(await patientsPage.addNewPatient.dobValue()).toBe("5/10/1990");
        await expect(await patientsPage.addNewPatient.bloodGroupValue()).toBe("A+");

        await patientsPage.addNewPatient.saveButton.click();

        await expect(patientsPage.addNewPatient.rootEl).not.toBeDisplayed();
        await expect(patientsPage.patientByName("Jane Dopl")).toBeDisplayed();
    });
});
