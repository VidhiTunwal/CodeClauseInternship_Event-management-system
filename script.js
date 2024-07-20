document.addEventListener('DOMContentLoaded', () => {
    const registrationSection = document.getElementById('registrationSection');
    const createEventSection = document.getElementById('createEventSection');
    const buyTicketSection = document.getElementById('buyTicketSection');
    const viewEventsSection = document.getElementById('viewEventsSection');
    const promoteEventSection = document.getElementById('promoteEventSection');
    const manageAttendeesSection = document.getElementById('manageAttendeesSection');
    const viewPromotionsSection = document.getElementById('viewPromotionsSection');
    const manageEventsSection = document.getElementById('manageEventsSection');

    const registrationForm = document.getElementById('registrationForm');
    const createEventForm = document.getElementById('createEventForm');
    const buyTicketForm = document.getElementById('buyTicketForm');
    const promoteEventForm = document.getElementById('promoteEventForm');
    const manageEventForm = document.getElementById('manageEventForm');

    const btnRegister = document.getElementById('btnRegister');
    const btnCreateEvent = document.getElementById('btnCreateEvent');
    const btnBuyTicket = document.getElementById('btnBuyTicket');
    const btnViewEvents = document.getElementById('btnViewEvents');
    const btnPromoteEvent = document.getElementById('btnPromoteEvent');
    const btnManageAttendees = document.getElementById('btnManageAttendees');
    const btnViewPromotions = document.getElementById('btnViewPromotions');
    const btnManageEvents = document.getElementById('btnManageEvents');
    const btnFetchEvent = document.getElementById('btnFetchEvent');
    const btnUpdateEvent = document.getElementById('btnUpdateEvent');
    const btnDeleteEvent = document.getElementById('btnDeleteEvent');

    let eventsData = []; // Array to store events data
    let registeredUsers = []; // Array to store registered users
    let promotionsData = []; // Array to store promotions data
    let attendeesData = []; // Array to store attendees data

    // Show Registration Form
    btnRegister.addEventListener('click', () => {
        showSection(registrationSection);
    });

    // Show Create Event Form
    btnCreateEvent.addEventListener('click', () => {
        showSection(createEventSection);
    });

    // Show Buy Ticket Form
    btnBuyTicket.addEventListener('click', () => {
        showSection(buyTicketSection);
    });

    // Show View Events Section
    btnViewEvents.addEventListener('click', () => {
        showSection(viewEventsSection);
        displayEvents();
    });

    // Show Promote Event Section
    btnPromoteEvent.addEventListener('click', () => {
        showSection(promoteEventSection);
    });

    // Show Manage Attendees Section
    btnManageAttendees.addEventListener('click', () => {
        showSection(manageAttendeesSection);
        displayAttendees();
    });

    // Show View Promotions Section
    btnViewPromotions.addEventListener('click', () => {
        showSection(viewPromotionsSection);
        displayPromotions();
    });

    // Show Manage Events Section
    btnManageEvents.addEventListener('click', () => {
        showSection(manageEventsSection);
    });

    // Fetch Event Details
    btnFetchEvent.addEventListener('click', () => {
        const eventNameManage = document.getElementById('eventNameManage').value;
        const event = eventsData.find(evt => evt.eventName === eventNameManage);
        
        if (event) {
            document.getElementById('eventDateManage').value = event.eventDate;
            document.getElementById('eventDescriptionManage').value = event.eventDescription;
            document.getElementById('ticketPriceManage').value = event.ticketPrice;
        } else {
            alert('Event not found.');
        }
    });

    // Update Event
    btnUpdateEvent.addEventListener('click', () => {
        const eventNameManage = document.getElementById('eventNameManage').value;
        const eventDateManage = document.getElementById('eventDateManage').value;
        const eventDescriptionManage = document.getElementById('eventDescriptionManage').value;
        const ticketPriceManage = document.getElementById('ticketPriceManage').value;

        const eventIndex = eventsData.findIndex(evt => evt.eventName === eventNameManage);

        if (eventIndex !== -1) {
            eventsData[eventIndex].eventDate = eventDateManage;
            eventsData[eventIndex].eventDescription = eventDescriptionManage;
            eventsData[eventIndex].ticketPrice = ticketPriceManage;

            alert('Event updated successfully.');
            displayEvents(); // Refresh the displayed events
        } else {
            alert('Event not found.');
        }
    });

    // Delete Event
    btnDeleteEvent.addEventListener('click', () => {
        const eventNameManage = document.getElementById('eventNameManage').value;

        const eventIndex = eventsData.findIndex(evt => evt.eventName === eventNameManage);

        if (eventIndex !== -1) {
            eventsData.splice(eventIndex, 1);
            alert('Event deleted successfully.');
            displayEvents(); // Refresh the displayed events
        } else {
            alert('Event not found.');
        }
    });

    // User Registration Form Submission
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check if user already exists
        const existingUser = registeredUsers.find(user => user.username === username);
        if (existingUser) {
            alert('User already registered.');
            return;
        }

        // Register user
        registeredUsers.push({ username, email, password });
        alert('User registered successfully.');
        registrationForm.reset();
    });

    // Create Event Form Submission
    createEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const ticketPrice = document.getElementById('ticketPrice').value;

        // Check if event already exists
        const existingEvent = eventsData.find(event => event.eventName === eventName);
        if (existingEvent) {
            alert('Event already exists.');
            return;
        }

        // Create event object
        const event = { eventName, eventDate, eventDescription, ticketPrice };
        eventsData.push(event);
        alert('Event created successfully.');
        createEventForm.reset();
    });

    // Buy Ticket Form Submission
    buyTicketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventName = document.getElementById('eventNameTicket').value;
        const ticketQuantity = document.getElementById('ticketQuantity').value;
        const username = document.getElementById('usernameTicket').value;
        const password = document.getElementById('passwordTicket').value;

        // Find the event
        const event = eventsData.find(evt => evt.eventName === eventName);
        if (!event) {
            alert('Event not found.');
            return;
        }

        // Find the user
        const user = registeredUsers.find(user => user.username === username && user.password === password);
        if (!user) {
            alert('Invalid username or password. Please try again.');
            return;
        }

        // Simulate ticket purchase process
        event.ticketsSold = parseInt(ticketQuantity); // Example: Assigning tickets sold to the event object
        alert(`Tickets (${ticketQuantity}) purchased for ${eventName} successfully.`);
        buyTicketForm.reset();
        updateAttendeesData(eventName, username, ticketQuantity); // Update the attendees data
        displayAttendees(); // Update the displayed attendees
    });

    // Promote Event Form Submission
    promoteEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventName = document.getElementById('eventNamePromote').value;
        const promotionMessage = document.getElementById('promotionMessage').value;

        // Check if event exists
        const event = eventsData.find(evt => evt.eventName === eventName);
        if (!event) {
            alert('Event does not exist. Promotion cannot be completed.');
            return;
        }

        // Save promotion data
        promotionsData.push({ eventName, promotionMessage });
        alert('Event promotion message saved successfully.');
        promoteEventForm.reset();
    });

    // Fetch and Display Events
    function displayEvents() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = ''; // Clear existing list

        eventsData.forEach(event => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.eventName}</td>
                <td>${event.eventDescription}</td>
                <td>${event.eventDate}</td>
                <td>${event.ticketPrice}</td>
            `;
            eventsList.appendChild(row);
        });
    }

    // Display Promotions
    function displayPromotions() {
        const promotionsList = document.getElementById('promotionsList');
        promotionsList.innerHTML = ''; // Clear existing list

        promotionsData.forEach(promotion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${promotion.eventName}</td>
                <td>${promotion.promotionMessage}</td>
            `;
            promotionsList.appendChild(row);
        });
    }

    // Display Attendees
    function displayAttendees() {
        const attendeesList = document.getElementById('attendeesList');
        attendeesList.innerHTML = ''; // Clear existing list

        attendeesData.forEach(attendee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${attendee.eventName}</td>
                <td>${attendee.username}</td>
                <td>${attendee.ticketQuantity}</td>
            `;
            attendeesList.appendChild(row);
        });
    }

    // Helper function to show a specific section and hide others
    function showSection(section) {
        const sections = [
            registrationSection,
            createEventSection,
            buyTicketSection,
            viewEventsSection,
            promoteEventSection,
            manageAttendeesSection,
            viewPromotionsSection,
            manageEventsSection
        ];

        sections.forEach(sec => {
            if (sec === section) {
                sec.classList.remove('hidden');
            } else {
                sec.classList.add('hidden');
            }
        });
    }

    // Update Attendees Data
    function updateAttendeesData(eventName, username, ticketQuantity) {
        // Add logic to update attendeesData based on the actual ticket purchase process
        attendeesData.push({ eventName, username, ticketQuantity });
    }
});
