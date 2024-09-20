import { BasePage } from './Base.page';

export class CustomerData extends BasePage {
    customerFirstNameInput = this.page.getByTestId('firstName');

    customerLastNameInput = this.page.getByTestId('lastName');

    customerPostalCodeInput = this.page.getByTestId('postalCode');

    continueButton = this.page.getByTestId('continue');

    async setCustomerData(customerData) {
        await this.customerFirstNameInput.fill(customerData.firstName);
        await this.customerLastNameInput.fill(customerData.lastName);
        await this.customerPostalCodeInput.fill(customerData.postCode);
    }
}
