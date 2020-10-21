describe('Page load', () => {

  it('opens the page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#set-lang-en-button').click({ force: true })
    cy.contains('Welcome')
  })

  it('closes welcome info', () => {
    cy.get('#hide-welcome-button').contains('OK').click()
  })
})


describe('Toggle language', () => {

  it('changes language from info panel (-> FI -> EN)', () => {
    cy.get('#show-info-button').click()
    cy.get('#set-lang-fi-button').contains('FI').click()
    cy.contains('Tervetuloa')
    cy.get('#toggle-lang-button').contains('SV')
    cy.get('#set-lang-en-button').within(() => {
      cy.contains('EN').click()
    })
    cy.get('#toggle-lang-button').contains('FI')
    cy.get('#hide-welcome-button').contains('OK').click()
  })

  it('changes language from top panel (-> FI -> SV -> EN)', () => {
    cy.get('#toggle-lang-button').within(() => {
      cy.contains('FI').click()
    })
    cy.contains('Etsi hiljaiset reitit')
    cy.get('#toggle-lang-button').within(() => {
      cy.contains('SV').click()
      cy.contains('EN')
    })
    cy.contains('Sök tysta rutter')
    cy.get('#toggle-lang-button').within(() => {
      cy.contains('EN').click()
      cy.contains('FI')
    })
  })

  it('sets language selection to cookie (gp-lang)', () => {
    cy.get('#toggle-lang-button').within(() => {
      cy.contains('FI').click()
    })
    cy.getCookie('gp-lang')
      .should('exist')
      .should('have.property', 'value', 'fi')
    cy.get('#toggle-lang-button').click()
    cy.getCookie('gp-lang')
      .should('exist')
      .should('have.property', 'value', 'sv')
    cy.get('#toggle-lang-button').click()
    cy.getCookie('gp-lang')
      .should('exist')
      .should('have.property', 'value', 'en')
  })
})


describe('Set origin & destination with address inputs', () => {

  it('shows "use current location" option in origin input dropdown', () => {
    cy.get('#reset-origin-button').click()
    cy.get('#origin-input-container').within(() => {
      cy.get('#origin-input').click()
      cy.contains('Use current location')
    })
  })

  it('sets origin by typing address', () => {
    cy.get('#origin-input-container').within(() => {
      cy.get('#origin-input').type('Juhana Herttuan tie 3')
      cy.get('ul').within(() => {
        cy.contains('Juhana-herttuan tie 3').click()
      })
      cy.get('#origin-input').should('have.value', 'Juhana-herttuan tie 3')
    })
  })

  it('sets destination by typing address', () => {
    cy.get('#reset-destination-button').click()
    cy.get('#destination-input-container').within(() => {
      cy.get('#destination-input').click()
      cy.get('#destination-input').type('Physicum')
      cy.get('ul').within(() => {
        cy.contains('Physicum').click()
      })
      cy.get('#destination-input').should('have.value', 'Physicum')
    })
  })

  it('finds routes with geocoded OD', () => {
    cy.contains('Find quiet paths').click()
    cy.get('#reset-paths-container').click()
  })

  it('suggests and selects previously selected O/D to origin', () => {
    cy.get('#origin-input-container').within(() => {
      cy.get('#origin-input').should('have.value', 'Juhana-herttuan tie 3')
      cy.get('#origin-input').clear()
      cy.get('ul').within(() => {
        cy.contains('Physicum').click()
      })
      cy.get('#origin-input').should('have.value', 'Physicum')
    })
  })

  it('suggests and selects previously selected O/D to destination', () => {
    cy.get('#destination-input-container').within(() => {
      cy.get('#destination-input').should('have.value', 'Physicum')
      cy.get('#destination-input').clear()
      cy.get('ul').within(() => {
        cy.contains('Juhana-herttuan tie 3').click()
      })
      cy.get('#destination-input').should('have.value', 'Juhana-herttuan tie 3')
    })
  })

  it('finds routes with previously selected O/D', () => {
    cy.contains('Find quiet paths').click()
    cy.get('#reset-paths-container').click()
    cy.get('#od-container').within(() => {
      cy.get('#destination-input').should('have.value', 'Juhana-herttuan tie 3')
      cy.get('#origin-input').should('have.value', 'Physicum')
    })
  })
})


describe('Set origin & destination from the map', () => {

  it('sets origin from the map', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#hide-welcome-button').contains('OK').click()
    cy.wait(1000)
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .click(465, 520)
    cy.contains('Route from here').click()
  })

  it('sets destination from the map', () => {
    cy.get('.mapboxgl-canvas')
      .click(565, 160)
    cy.contains('Route here').click()
  })
})

describe('Query and show quiet paths', () => {

  it('finds quiet paths (walk)', () => {
    cy.contains('Find quiet paths').click()
    cy.contains('high noise')
    cy.contains('2.5 km')
    cy.contains('26 min')
  })

  it('shows dB legend', () => {
    cy.contains('dB')
    cy.contains('40')
    cy.contains('50')
  })
})


describe('Toggle travel mode', () => {

  it('finds biking routes', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.contains('8 min')
  })

  it('toggles to walking routes', () => {
    cy.get('#toggle-to-walk-button').click()
    cy.contains('4/4')
    cy.contains('26 min')
  })

  it('toggles to biking routes', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.contains('8 min')
  })

  it('toggles back to walking routes', () => {
    cy.get('#toggle-to-walk-button').click()
    cy.wait(200)
  })

  it('shows find fresh air paths button', () => {
    cy.contains('Show')
    cy.contains('fresh air')
    cy.contains('paths')
  })
})


describe('Filter paths', () => {

  it('filters paths by length', () => {
    cy.get('#filter-by-length-button').click()
    cy.contains('2.2 km').click()
    cy.get('#close-filter-panel').children().click()
    cy.contains('2/4')
  })

  it('disables filter paths', () => {
    cy.get('#filter-by-length-button').click()
    cy.contains('2.5 km').click()
    cy.get('#close-filter-panel').children().click()
    cy.contains('4/4')
  })

  it('toggling back to biking routes resets filtering', () => {
    cy.get('#toggle-to-bike-button').click()
    cy.contains('4/4')
    cy.get('#toggle-to-walk-button').click()
    cy.contains('4/4')
  })
})


describe('Reset paths', () => {

  it('resets paths from reset paths button', () => {
    cy.get('#reset-paths-container').click()
  })

  it('resets paths by selecting new destination from map', () => {
    cy.contains('Find quiet paths').click()
    cy.get('.mapboxgl-canvas')
      .wait(500)
      .click(565, 160)
    cy.contains('Route here').click()
  })

  it('resets paths by selecting new origin from map', () => {
    cy.contains('Find quiet paths').click()
    cy.get('.mapboxgl-canvas')
      .wait(500)
      .click(520, 550)
    cy.contains('Route from here').click()
    cy.contains('Find quiet paths')
  })
})


describe('Routing (more test cases)', () => {

  it('opens the page (again)', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#hide-welcome-button').contains('OK').click()
  })

  it('finds quiet paths (walk)', () => {
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .click(465, 210)
    cy.contains('Route from here').click()
    cy.get('.mapboxgl-canvas')
      .wait(100)
      .click(565, 520)
    cy.contains('Route here').click()
    cy.contains('Find quiet paths').click()
  })

  it('shows shortest path stats (walk)', () => {
    cy.contains('29 min')
    cy.contains('2.3 km')
    cy.contains('moderate noise')
  })

  it('shows quiet path stats (walk)', () => {
    cy.contains('33 min')
    cy.contains('2.6 km')
    cy.contains('-21 % noise')
  })
})


describe('Path exposure info', () => {

  it('shows opened path stats', () => {
    cy.contains('-30 % noise').parent().parent().parent().within(() => cy.get('.open-path-button').click())
    cy.contains('Exposure to different traffic noise levels')
    cy.contains('40dB')
    cy.contains('50dB')
    cy.contains('18 min')
    cy.contains('10 min')
  })

  it('closes opened paths stats', () => {
    cy.get('.close-path-button').click()
    cy.contains('moderate noise')
  })
})
