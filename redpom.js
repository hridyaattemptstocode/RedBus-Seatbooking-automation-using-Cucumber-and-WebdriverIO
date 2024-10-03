class plswork {
    // Elements on the homepage
    get sourceInput() { return $("//input[@id='src']"); }
    get destinationInput() { return $("//input[@id='dest']"); }
    get calendarInput() { return $("//span[@class='dateText']"); }
    get calendarHeader() { return $("//div[@class='DayNavigator__CalendarHeader-qj8jdz-1 fxvMrr']//div[2]"); }

    get nextMonthButton() { return $("//div[@class='DayNavigator__CalendarHeader-qj8jdz-1 fxvMrr']//div[3]//*[name()='svg']"); }
    get searchButton() { return $("#search_button"); }
    get viewSeatsButton() { return $("//li[@id='12078866']//div[@class='button view-seats fr'][normalize-space()='View Seats']");}
    get seatCanvas() { return $("//canvas[@data-type='lower']");}
    get ProceedPay() {return $("//button[@class='button continue inactive']");}
    // Method to navigate to the homepage and maximize the window
    async openHomePage() {
        await browser.url('https://www.redbus.in/');
        await browser.maximizeWindow();
        
    }

    // Method to enter source and destination locations
    async enterSourceAndDestination(source, destination) {
        await this.sourceInput.setValue(source);
        await this.destinationInput.setValue(destination);
       
    }

    // Method to select a date from the calendar
    async selectDate(targetMonth, targetYear, targetDate) {
        await this.calendarInput.click();
        await browser.pause(1000);

        // Loop through the calendar to find the correct month/year
        while (true) {
            const calenderText = await this.calendarHeader.getText();
            const [monthYear] = calenderText.split('\n').filter(line => line.trim() !== '');
            const [mon, yr] = monthYear.trim().split(' ');

            if (mon === targetMonth && yr === targetYear) {
                break;
            } else {
                // Move to the next month
                await this.nextMonthButton.click();
                await browser.pause(500);
            }
        }

        // Click the target date
        await $(`//span[text()='${targetDate}']`).click();
    }

    // Method to click the search button
    async clickSearchButton() {
        await this.searchButton.moveTo();
        await this.searchButton.waitForClickable();
        await this.searchButton.click();
       
    }

    async viewSeats() {
    await this.viewSeatsButton.moveTo();
    await this.viewSeatsButton.waitForClickable()
    await this.viewSeatsButton.waitForEnabled();
    await this.viewSeatsButton.click();
}

  

async clickOnSeat(x, y) {
    
    await browser.pause(4000);
    
    await this.seatCanvas.moveTo()
    await this.seatCanvas.waitForDisplayed();  // Ensure canvas is visible
    await browser.execute((xCoord, yCoord) => {
        const canvas = document.querySelector('canvas[data-type="lower"]');
        console.log(canvas);

        const rect = canvas.getBoundingClientRect();
        const clickEvent = new MouseEvent('click', {
            clientX: rect.left + xCoord,
            clientY: rect.top + yCoord,
            view: window
        });
        canvas.dispatchEvent(clickEvent);
    }, x, y);  // Pass the X and Y coordinates
}

  async Payment (){
    await this.ProceedPay.click()
  }
}



module.exports = new plswork();

