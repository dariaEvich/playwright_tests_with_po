import { error } from 'console';
import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    inventoryItemNames = this.page.getByTestId('inventory-item-name');

    inventoryItemPrices = this.page.getByTestId('inventory-item-price');

    inventoryItemDescription = this.page.getByTestId('inventory-item-desc');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    filterDropdown = this.page.getByTestId('product-sort-container');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sort(reason) {
        let locator;
        switch (reason) {
            case 'fromLowToHighPrice':
                locator = 'lohi';
                break;
            case 'fromHighToLowPrice':
                locator = 'hilo';
                break;
            case 'fromZtoA':
                locator = 'za';
                break;
            default:
                throw error('Select correct menu item!!!!');
        }
        await this.filterDropdown.selectOption(locator);
    }

    async getInventoryItemNames() {
        const names = await this.inventoryItemNames.allTextContents();
        return names;
    }

    async getInventoryItemPrices() {
        const textPrices = await this.inventoryItemPrices.allTextContents();
        const prices = textPrices.map((textPrice) => parseFloat(textPrice.slice(1)));
        return prices;
    }

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
