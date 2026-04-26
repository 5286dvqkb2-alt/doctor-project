class AddNewPatient {
    get rootEl() {
        return $(".new-patient-dialog");
    }

    get addNewPatientButton() {
        return $(".e-control.e-btn.e-lib.e-normal.add-details.e-primary");
    }

    get closeButton() {
        return this.rootEl.$(".e-dlg-closeicon-btn");
    }

    get saveButton() {
        return this.rootEl.$(".e-footer-content .e-primary");
    }

    async open() {
        await this.addNewPatientButton.click();
    }

    async waitForOpened() {
        await this.rootEl.waitForDisplayed();
    }

    get nameInput() {
        return this.rootEl.$("[name='Name']");
    }

    get phoneInput() {
        return this.rootEl.$("[name='Mobile']");
    }

    get emailInput() {
        return this.rootEl.$("[name='Email']");
    }

    get symptomsInput() {
        return this.rootEl.$("[name='Symptoms']");
    }

    get dobInput() {
        return this.rootEl.$("#DOB input");
    }

    get bloodGroupDropdown() {
        return this.rootEl.$("#BloodGroup");
    }

    get bloodGroupInput() {
        return this.rootEl.$("#BloodGroup input");
    }

    bloodGroupOption(value) {
        return $(`//*[contains(@class, "e-list-item") and normalize-space()="${value}"]`);
    }

    genderRadio(gender) {
        return this.rootEl.$(`input[name="Gender"][value="${gender}"]`);
    }

    async selectGender(gender) {
        const radio = await this.genderRadio(gender);
        await radio.waitForExist();

        const id = await radio.getAttribute("id");
        const label = await this.rootEl.$(`label[for="${id}"]`);
        await label.waitForDisplayed();
        await label.click();
    }

    async selectDOB(dateText) {
        await this.dobInput.click();
        await browser.keys([process.platform === "darwin" ? "Command" : "Control", "a"]);
        await browser.keys(dateText);
        await browser.keys("Tab");
    }

    async selectBloodGroup(group) {
        await this.bloodGroupDropdown.click();

        const option = this.bloodGroupOption(group);
        await option.waitForDisplayed();
        await option.click();
    }

    async dobValue() {
        return this.dobInput.getValue();
    }

    async bloodGroupValue() {
        return this.bloodGroupInput.getValue();
    }

    async fillForm(name, phone, email, symptoms, dob, bloodGroup) {
        await this.nameInput.setValue(name);
        await this.phoneInput.setValue(phone);
        await this.emailInput.setValue(email);
        await this.symptomsInput.setValue(symptoms);
        await this.selectDOB(dob);
        await this.selectBloodGroup(bloodGroup);
    }

    async close() {
        if (await this.rootEl.isDisplayed()) {
            await this.closeButton.click();
            await this.rootEl.waitForDisplayed({ reverse: true });
        }
    }
}

module.exports = new AddNewPatient();
