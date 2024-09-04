import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { standardUser } from '../testData/users';
import { sortFomLowToHigh } from '../helpers/inventory';

test.describe('Saucedemo app basic tests', () => {
    test.beforeEach('Login with standard user', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin(standardUser.name, standardUser.password);

        await expect(app.inventory.headerTitle).toBeVisible();
    });
    test('Sorting by price(from low to high)', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemsBeforeSort = await app.inventory.getInventoryItemPrices();
        await app.inventory.sortFromLowToHighPrice();
        const itemsAfterSort = await app.inventory.getInventoryItemPrices();
        const sortedArray = sortFomLowToHigh(itemsBeforeSort);
        expect(itemsAfterSort).toStrictEqual(sortedArray);
    });
    test('Sorting by price(from high to low)', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemsBeforeSort = await app.inventory.getInventoryItemPrices();
        await app.inventory.sortFromHighToLowPrice();
        const itemsAfterSort = await app.inventory.getInventoryItemPrices();
        const sortedArray = sortFomLowToHigh(itemsBeforeSort).reverse();
        expect(itemsAfterSort).toStrictEqual(sortedArray);
    });
    test('Sorting by Name(Z to A)', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemsBeforeSort = await app.inventory.getInventoryItemNames();
        await app.inventory.sortFromZtoA();
        const itemsAfterSort = await app.inventory.getInventoryItemNames();
        const sortedArray = itemsBeforeSort.sort().reverse();
        expect(itemsAfterSort).toStrictEqual(sortedArray);
    });
    test('Sorting by Name(A to Z)', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const itemsAfterSort = await app.inventory.getInventoryItemNames();
        const sortedArray = itemsAfterSort.sort();
        expect(itemsAfterSort).toStrictEqual(sortedArray);
    });
});
