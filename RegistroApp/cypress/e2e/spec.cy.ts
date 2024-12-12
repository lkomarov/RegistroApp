describe('Verificar aplicación', () => {
  it('Ingreso con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/').then(() => {
      //cy.get('#logout').click();
      cy.get('#correo').invoke('val', 'cuenta-inexistente');
      cy.get('#password').invoke('val', '1234');
      cy.get('#ingresar').click();
      cy.intercept('/home').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('#saludo').should('contains.text', '¡Bienvenido Juan Pérez González!');
      });
    });
  });

  it('Ingreso con credenciales correctas', () => {
    cy.wait(3000);
    cy.visit('http://localhost:8100/').then(() => {
      cy.wait(3000);
      //cy.get('#logout').click();
      cy.get('#correo').invoke('val', 'atorres');
      cy.wait(3000);
      cy.get('#password').invoke('val', '1234');
      cy.wait(3000);
      cy.get('#ingresar').click();
      cy.wait(3000);
      cy.intercept('/home').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.get('#saludo').should('contains.text', '¡Bienvenido Juan Pérez González!');
        cy.wait(3000);
        cy.get('#logout').click();
      });
    });
  });

  it('Agregar y eliminar publicacion', () => {
    cy.visit('http://localhost:8100/home').then(() => {
      cy.get('#foro').click();
      cy.get('#pub-title').type('Test1');
      cy.get('#pub-desc').type('Lorem ipsum');
      cy.get('#publicar').click();
      cy.contains('contains.text', 'Test1').then(() => {
        cy.get('#borrar').click();
    });
  });
});

  it('Validar componente mis datos', () => {
    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#data').click();
      cy.get('#cuenta').invoke('val', 'atorr');
      cy.get('#nombre').invoke('val', 'A');
      cy.get('#apellido').invoke('val', 'Torr');
      cy.get('#email').invoke('val', 'atorr@duocuc.cl');
      cy.get('#adress').invoke('val', 'Santiago');
      cy.get('#pregunta').invoke('val', '¿Cuál es tu palabra secreta?');
      cy.get('#respuesta').invoke('val', 'hola');
      cy.get('#educ').click().then(() => {
        cy.get('#alert-input-4-4').click();
        cy.should('contain.text', 'OK').click();
      });
      cy.get('#date').should('contain.text', '11').click();
      cy.get('#pass').invoke('val', '4567');
      cy.get('#save').click();
      cy.get('#home').click();
    });
  });

});

