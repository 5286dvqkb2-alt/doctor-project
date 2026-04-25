class AddDoctorComponent {
    get openButton() {
        return $(".specialization-types button.e-control");
    }

    async open() {
        await this.openButton.click();
    }
}

module.exports = new AddDoctorComponent();
