const dashboardPage = require("../po/pages/dashboard.page");
const doctorsPage = require("../po/pages/doctors.page");

describe("Appointment Planner", () => {
    afterEach(async () => {
        await doctorsPage.newDoctor.close();
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
            "Dr. John Doe",
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
    });
});
