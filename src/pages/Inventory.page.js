import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    inventoryItemNames = this.page.getByTestId('inventory-item-name');

    inventoryItemPrices = this.page.getByTestId('inventory-item-price');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    filterDropdown = this.page.getByTestId('product-sort-container');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sortFromLowToHighPrice() {
        await this.filterDropdown.selectOption('lohi');
    }

    async sortFromHighToLowPrice() {
        await this.filterDropdown.selectOption('hilo');
    }

    async sortFromAToZ() {
        await this.filterDropdown.selectOption('az');
    }

    async sortFromZtoA() {
        await this.filterDropdown.selectOption('za');
    }

    async getInventoryItemNames() {
        const names = await this.inventoryItemNames.allTextContents();
        return names;
    }

    async getInventoryItemPrices() {
        const prices = await this.inventoryItemPrices.allTextContents();
        return prices;
    }
}
