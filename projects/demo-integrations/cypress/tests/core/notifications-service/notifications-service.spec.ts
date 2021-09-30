describe('NotificationsService', () => {
    beforeEach(() => {
        cy.viewport(720, 720);
    });

    it('is shown correctly', () => {
        cy.goToDemoPage(`/services/notifications-service`);

        cy.get(`tui-notifications-example-1 button`).first().click().wait(1000);

        cy.get('tui-notification-alert').first().matchImageSnapshot('notification');
    });
});
