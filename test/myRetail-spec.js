describe('Data',function() {
  it('should have data to display on the DOM', function() {
    browser.get('http://localhost:8080/#/home0');
    var title = element(by.binding('catalogItem.title'));
    expect(title.getText()).toBe('Ninja™ Professional Blender with Single Serve Blending Cups');
  });
});

describe('Carousel', function() {
  it('should display first three slides', function() {
    browser.get('http://localhost:8080/#/home0');
    var count = element.all(by.id('carouselImage')).count();
    expect(count).toEqual(3);
  });
});

describe('Quantity', function() {
  it('should validate quantity not to be less than one ', function() {
    browser.get('http://localhost:8080/#/home0');
    var minus = browser.findElement(by.id('minusIcon')).click();
    var quantity = browser.findElement(by.id('quantityNumTxt')).getText();
    expect(quantity).toEqual('1');
  });
  it('should increase quantity when clicking on + icon and decrease when -', function() {
    browser.get('http://localhost:8080/#/home0');
    var plus = browser.findElement(by.id('plusIcon')).click();
    var quantity = browser.findElement(by.id('quantityNumTxt')).getText();
    expect(quantity).toEqual('2');
    var minus = browser.findElement(by.id('minusIcon')).click();
    var quantity = browser.findElement(by.id('quantityNumTxt')).getText();
    expect(quantity).toEqual('1');
  });
});

describe('show/noshow buttons functionality', function() {
  it('should show both add to cart and pick up in store buttons when purchasingChannelCode is 0', function() {
    browser.get('http://localhost:8080/#/home0');

    var addtocartbutton = element(by.id('addToCart'));
    expect(addtocartbutton.isDisplayed()).toBe(true);
    var pickupinstore = element(by.id('pickUpInStore'));
    expect(pickupinstore.isDisplayed()).toBe(true);
  });
  it('should show add to cart and hide pick up in store buttons when purchasingChannelCode is 1', function() {
    browser.get('http://localhost:8080/#/home1');

    var addtocartbutton = element(by.id('addToCart'));
    expect(addtocartbutton.isDisplayed()).toBe(true);
    var pickupinstore = element(by.id('pickUpInStore'));
    expect(pickupinstore.isDisplayed()).toBe(false);
  });
});
