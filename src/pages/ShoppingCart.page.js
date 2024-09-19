import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

    cartItemNames = this.page.getByTestId('inventory-item-name');

    cartItemDescriptions = this.page.getByTestId('inventory-item-desc');

    cartItemPrices = this.page.getByTestId('inventory-item-price');

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartItemDataById(id) {
        const name = await this.cartItemNames.nth(id).innerText();
        const description = await this.cartItemDescriptions.nth(id).innerText();
        const price = await this.cartItemPrices.nth(id).innerText();
        return {
            name,
            description,
            price,
        };
    }
}
