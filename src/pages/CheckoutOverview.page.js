import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutOverviewPage extends BaseSwagLabPage {
    inventoryItems = this.page.getByTestId('inventory-item');

    inventoryItemNames = this.page.getByTestId('inventory-item-name');

    inventoryItemPrices = this.page.getByTestId('inventory-item-price');

    inventoryItemDescription = this.page.getByTestId('inventory-item-desc');

    async getInventoryItemDataById(id) {
        const name = await this.inventoryItemNames.nth(id).innerText();
        const description = await this.inventoryItemDescription.nth(id).innerText();
        const price = await this.inventoryItemPrices.nth(id).innerText();
        return {
            name,
            description,
            price,
        };
    }
}
