import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { standardUser } from '../testData/users';
import { getRandomArrayElementIndex } from '../helpers/inventory';

test.describe('Saucedemo app inventory tests', () => {
    test.beforeEach('Login with standard user', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin(standardUser.name, standardUser.password);

        await expect(app.inventory.headerTitle).toBeVisible();
    });
    test('Add several random products to the Shopping Cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemCount = await app.inventory.inventoryItems.count();
        const itemIds = getRandomArrayElementIndex(itemCount, 2).sort();
        const itemsData = await app.inventory.getInventoryItemDataById(itemIds[0]);
        const itemsData2 = await app.inventory.getInventoryItemDataById(itemIds[1]);
        await app.inventory.addItemToCartById(itemIds[0]);
        await app.inventory.addItemToCartById(itemIds[1] - 1);
        await expect(app.baseSwagLab.shoppingCartBadge).toHaveText('2');
        await app.baseSwagLab.shoppingCart.click();
        const cardItemData = await app.shoppingCart.getCartItemDataById(0);
        const cardItemData2 = await app.shoppingCart.getCartItemDataById(1);
        expect(itemsData).toStrictEqual(cardItemData);
        expect(itemsData2).toStrictEqual(cardItemData2);
    });
});
