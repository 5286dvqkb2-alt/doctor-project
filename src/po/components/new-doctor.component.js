class NewDoctorComponent {
    get rootEl() {
        return $(".new-doctor-dialog");
    }

    get closeButton() {
        return this.rootEl.$(".e-dlg-closeicon-btn");
    }

    get nameInput() {
        return this.rootEl.$('[name="Name"]');
    }

    get mobileInput() {
        return this.rootEl.$('[name="Mobile"]');
    }

    get emailInput() {
        return this.rootEl.$('[name="Email"]');
    }

    get departmentDropdown() {
        return this.rootEl.$("#Specialization");
    }

    get EducationInput() {
        return this.rootEl.$('[name="Education"]');
    }

    get experienceDropdown() {
        return this.rootEl.$("#Experience");
    }

    get DesignationInput() {
        return this.rootEl.$('[name="Designation"]');
    }

    get dutyTimingDropdown() {
        return this.rootEl.$("#DutyTiming");
    }

    get saveButton() {
        return this.rootEl.$('button.e-primary');
    }

    async waitForOpened() {
        await this.rootEl.waitForDisplayed();
    }

    async close() {
        if (await this.rootEl.isDisplayed()) {
            await this.closeButton.click();
            await this.rootEl.waitForDisplayed({ reverse: true });
        }
    }

    async fillForm(name, mobile, email, education, designation) {
        await this.nameInput.setValue(name);
        await this.mobileInput.setValue(mobile);
        await this.emailInput.setValue(email);
        await this.EducationInput.setValue(education);
        await this.DesignationInput.setValue(designation);
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

    async selectDepartment(department) {
        await this.selectDropdown(this.departmentDropdown, department);
    }

    async selectExperience(experience) {
        await this.selectDropdown(this.experienceDropdown, experience);
    }

    async selectDutyTiming(dutyTiming) {
        await this.selectDropdown(this.dutyTimingDropdown, dutyTiming);
    }

    async selectDropdown(dropdown, visibleText) {
        await dropdown.waitForExist();

        const wasSelected = await browser.execute((element, text) => {
            const dropdownInstance = element.ej2_instances[0];
            const textField = dropdownInstance.fields.text;
            const valueField = dropdownInstance.fields.value;
            const option = dropdownInstance.dataSource.find((item) => item[textField] === text);

            if (!option) {
                return false;
            }

            dropdownInstance.value = option[valueField];
            dropdownInstance.dataBind();
            return true;
        }, await dropdown, visibleText);

        if (!wasSelected) {
            throw new Error(`Dropdown option "${visibleText}" was not found`);
        }
    }

    async dropdownText(dropdown) {
        return browser.execute((element) => {
            return element.ej2_instances[0].text;
        }, await dropdown);
    }
}

module.exports = new NewDoctorComponent();
