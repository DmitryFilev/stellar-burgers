import * as selectors from './dataTests'
    describe('Tests for project work 12', function () {
        before(function () {
        });
        beforeEach(function () {
            window.localStorage.setItem('refreshToken', JSON.stringify('test'));
            cy.setCookie('accessToken', JSON.stringify('test'));
            cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('fetchGetUser');
            cy.intercept('GET', 'api/ingredients').as('fetchIngredients');
            cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('fetchPostOrder');
            cy.visit('http://localhost:4000');
            cy.wait('@fetchIngredients');
            cy.wait('@fetchGetUser');
        });
        afterEach(function () {
            cy.clearCookie('accessToken');
            cy.clearCookie('refreshToken');
        });
        after(function () {
        });
        describe('Constructor tests', ()=> {
            it('1 task. Add ingredients', ()=> {
                //Добавляем булку и убеждаемся, что их две
                cy.get(selectors.testConstructorBun).should('not.exist')// для начала теста убеждаемся, что нет такой булки
                cy.get(`${selectors.testBun} button`).click();
                cy.get(selectors.testConstructorBun).should('exist').should('have.length', 2);
                //Добавляем конкретный ингредиент main и убеждаемся, что он появился
                cy.get(selectors.testConstructorMain).should('not.exist')//для начала теста убеждаемся, что нет такого ингредиента
                cy.get(`${selectors.testMain} button`).click();
                cy.get(selectors.testConstructorMain)
                .should('exist')//убеждаемся что конкретный тестовый ингредиент есть
                .should('have.length', 1);//
                //добавляем соус и убеждаемся, что он появился
                cy.get(selectors.testConstructorSauce).should('not.exist')// для начала теста убеждаемся, что нет такого ингредиента
                cy.get(`${selectors.testSauce} button`).click();
                cy.get(selectors.testConstructorSauce).should('exist').should('have.length', 1);
            });
            it('2 task. Modal Detail ingredient and close button', function () {
                //Открываем модальное окно просмотра ингредиента, убеждаемся в его наличии и что в нем то, что мы хотели
                cy.get(selectors.testBun).click();
                cy.get(selectors.modalDiv).should('exist').contains(selectors.testBunName);
                //Закрываем модальное окно крестом и убеждаемся, что его нет
                cy.get(`${selectors.modalDiv} button`).click();
                cy.get(selectors.modalDiv).should('not.exist');
            });
            it('3 task. Open Modal "Detail ingredient" and close for overlay', function () {
                //Открываем модальное окно просмотра ингредиента, убеждаемся в его наличии и что в нем то, что мы хотели 
                cy.get(selectors.testMain).click();
                cy.get(selectors.modalDiv).should('exist').contains(selectors.testMainName);
                //Закрываем модальное окно кликом по оверлею и убеждаемся, что его нет 
                cy.get(selectors.modalOverlay).click('top', { force: true });
                cy.get(selectors.modalDiv).should('not.exist');
            });
            it('4. Create order and close it', function () {
                //убеждаемся, что конструктор чист
                cy.get(`${selectors.burgerConstructor} li`).should('not.exist');
                cy.get(selectors.testConstructorBun).should('not.exist');//убеждаемся, что как минимум такой булки в конструкторе нет
                //добавляем булки и убеждаемя в их наличии и количестве
                cy.get(`${selectors.testBun} button`).click();
                cy.get(selectors.testConstructorBun).should('exist');
                cy.get(selectors.testConstructorBun).should('have.length', 2);
                //добавляем ингредиент main и убеждаемся в его наличии
                cy.get(`${selectors.testMain} button`).click();
                cy.get(selectors.testConstructorMain).should('exist');
                //добавляем соус и убеждаемся в его наличии
                cy.get(`${selectors.testSauce} button`).click();
                cy.get(selectors.testConstructorSauce).should('exist');
                //убеждаемся, что в конструкторе 4 элемента
                cy.get(`${selectors.burgerConstructor} li`).should('exist').should('have.length', '2');
                cy.get(selectors.testConstructorBun).should('have.length', 2);
                //активируем выполнение заказа и убеждаемся, что окно открылось и номер в нем тестовый
                cy.get(selectors.orderMakeButton).click();
                cy.wait('@fetchGetUser');
                cy.wait('@fetchPostOrder');
                cy.get(selectors.modalDiv).should('exist').contains(selectors.testOrderNumber);
                //закрываем окно и убеждаемся, что его нет
                cy.get(`${selectors.modalDiv} button`).click();
                cy.get(selectors.modalDiv).should('not.exist');
                //Убеждаемся, что конструктор чист
                cy.get(`${selectors.burgerConstructor} li`).should('not.exist');
                cy.get(selectors.testConstructorBun).should('not.exist');
            });
        });
    });

    
