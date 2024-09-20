import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { standardUser, customer1 } from '../testData/users';
import { getRandomArrayElementIndex } from '../helpers/inventory';

test.describe('Saucedemo app inventory tests', () => {
    test.beforeEach('Login with standard user', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin(standardUser.name, standardUser.password);

        await expect(app.inventory.headerTitle).toBeVisible();
    });
    test('Verify checkout', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemCount = await app.inventory.inventoryItems.count();
        const itemIds = getRandomArrayElementIndex(itemCount, 2).sort();
        const itemsData = await app.inventory.getInventoryItemDataById(itemIds[0]);
        const itemsData2 = await app.inventory.getInventoryItemDataById(itemIds[1]);
        await app.inventory.addItemToCartById(itemIds[0]);
        await app.inventory.addItemToCartById(itemIds[1] - 1);
        await app.baseSwagLab.shoppingCart.click();
        await app.baseSwagLab.checkoutButton.click();
        await app.customerData.setCustomerData(customer1);
        await app.customerData.continueButton.click();
    });
});
