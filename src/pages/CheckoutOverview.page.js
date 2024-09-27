import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutOverviewPage extends BaseSwagLabPage {
    inventoryItems = this.page.getByTestId('inventory-item');

    inventoryItemNames = this.page.getByTestId('inventory-item-name');

    inventoryItemPrices = this.page.getByTestId('inventory-item-price');

    inventoryItemDescription = this.page.getByTestId('inventory-item-desc');

    itemTotal = this.page.getByTestId('subtotal-label');

    tax = this.page.getByTestId('tax-label');

    total = this.page.getByTestId('total-label');

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

    async calculateItemTotal() {
        const textPrices = await this.inventoryItemPrices.allTextContents();
        const prices = textPrices.map((textPrice) => parseFloat(textPrice.slice(1)));
        const sum = prices.reduce((acc, el) => acc + el, 0);
        return sum.toFixed(2);
    }

    async getItemTotal() {
        const onPage = await this.itemTotal.innerText();
        const dollarSignIndex = onPage.indexOf('$');
        return parseFloat(onPage.slice(dollarSignIndex + 1)).toFixed(2);
    }

    async getTax() {
        const onPage = await this.tax.innerText();
        const dollarSignIndex = onPage.indexOf('$');
        return parseFloat(onPage.slice(dollarSignIndex + 1));
    }

    async getTotalWithTax() {
        const onPage = await this.total.innerText();
        const dollarSignIndex = onPage.indexOf('$');
        return parseFloat(onPage.slice(dollarSignIndex + 1));
    }

    async calculatedTotalWithTax() {
        const onPageTax = await this.getTax();
        const calculatedPricesTotal = parseFloat(await this.calculateItemTotal());
        const result = parseFloat((calculatedPricesTotal + onPageTax).toFixed(2));
        return result;
    }
}
