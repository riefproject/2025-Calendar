document.addEventListener("DOMContentLoaded", function () {
    // Reference HTML elements
    const holidayCheckbox = document.getElementById("holidayCheckbox");
    const collectiveLeaveCheckbox = document.getElementById("collectiveLeaveCheckbox");
    const polbanCheckbox = document.getElementById("polbanCheckbox");
    const snbtCheckbox = document.getElementById("snbtCheckbox");

    const calendarDiv = document.getElementById("calendar");
    const eventsDiv = document.getElementById("events");

    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const currentMonthLabel = document.getElementById("currentMonth");

    // Set initial date to the current month
    let currentDate = new Date();

    // Set default checkbox values
    holidayCheckbox.checked = true;
    collectiveLeaveCheckbox.checked = true;
    polbanCheckbox.checked = true;
    snbtCheckbox.checked = true;

    // --- Fetch events from JSON file ---
    fetch("assets/data/events.json")
        .then(response => response.json())
        .then(events => {
            // Initial render
            renderCalendar(events);

            // Checkbox event listeners
            holidayCheckbox.addEventListener("change", () => renderCalendar(events));
            collectiveLeaveCheckbox.addEventListener("change", () => renderCalendar(events));
            polbanCheckbox.addEventListener("change", () => renderCalendar(events));
            snbtCheckbox.addEventListener("change", () => renderCalendar(events));

            // Month navigation buttons
            prevMonthButton.addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(events);
            });
            nextMonthButton.addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(events);
            });
        });

    /**
     * Main function to render the calendar and events table
     */
    function renderCalendar(events) {
        // Clear containers
        calendarDiv.innerHTML = "";
        eventsDiv.innerHTML = "";

        // Get month and year data
        const month = currentDate.getMonth();   // 0=Jan, 1=Feb, 2=Mar, ...
        const year = currentDate.getFullYear();

        // Display label "April 2025" etc.
        currentMonthLabel.textContent = currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

        // Calculate info for the calendar grid
        const firstDayInMonth = new Date(year, month, 1).getDay(); // 0=Sunday
        // To start on Monday, we change 0=Sunday => index 6, etc.
        let firstDay = (firstDayInMonth === 0) ? 6 : firstDayInMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // ------------------------------------------------
        // 1) Create "filteredEvents" = events per day (for calendar coloring)
        // ------------------------------------------------
        const filteredEvents = [];

        // Helper function: split start-end range into per-day
        function addEventDays(event) {
            let start = new Date(event.startDate || event.date);
            let end = new Date(event.endDate || event.date);

            // Normalize hours to avoid timezone issues
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                filteredEvents.push({
                    date: new Date(d),
                    description: event.description,
                    type: event.type
                });
            }
        }

        // Add events to filteredEvents based on checkboxes
        if (holidayCheckbox.checked) {
            events.nationalHolidays.forEach(e => addEventDays({ ...e, type: "holiday" }));
        }
        if (collectiveLeaveCheckbox.checked) {
            events.collectiveLeaves.forEach(e => addEventDays({ ...e, type: "collectiveLeave" }));
        }
        if (polbanCheckbox.checked) {
            events.polbanEvents.forEach(e => addEventDays({ ...e, type: "polban" }));
        }
        if (snbtCheckbox.checked) {
            events.snbtEvents.forEach(e => addEventDays({ ...e, type: "snbt" }));
        }

        // ------------------------------------------------
        // 2) Build the calendar table (coloring from filteredEvents)
        // ------------------------------------------------
        const calendarTable = document.createElement("table");
        calendarTable.className = "table text-center calendar-table";

        const calendarHeader = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        daysOfWeek.forEach(day => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });
        calendarHeader.appendChild(headerRow);
        calendarTable.appendChild(calendarHeader);

        // Calendar body
        const calendarBody = document.createElement("tbody");

        // To highlight "today"
        const today = new Date();

        let date = 1;           // Date of "this month" (1..31)
        let nextMonthDate = 1;  // Date of "next month" (1..??)
        let rowAdded = false;

        // Max 6 rows (4-5 rows are sometimes enough, but prepare 6)
        for (let i = 0; i < 6; i++) {
            const row = document.createElement("tr");
            rowAdded = false;

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                cell.className = "calendar-cell";

                // First row, if j < firstDay => remaining days of last month
                if (i === 0 && j < firstDay) {
                    const dayNum = daysInPrevMonth - firstDay + j + 1;
                    cell.textContent = dayNum;
                    cell.style.color = "gray";
                    cell.style.backgroundColor = "transparent";
                }
                // If past the number of days in this month => start of next month
                else if (date > daysInMonth) {
                    cell.textContent = nextMonthDate++;
                    cell.style.color = "gray";
                    cell.style.backgroundColor = "transparent";
                }
                else {
                    // Valid date in this month
                    cell.textContent = date;

                    // Find events on this date
                    const eventForDay = filteredEvents.filter(ev => 
                        ev.date.getDate() === date &&
                        ev.date.getMonth() === month &&
                        ev.date.getFullYear() === year
                    );

                    // Coloring logic
                    if (j === 6 || eventForDay.some(ev => ev.type === "holiday")) {
                        // Sunday (j===6) / holiday
                        cell.style.color = "#ff1c1c";
                    }
                    else if (eventForDay.some(ev => ev.type === "collectiveLeave")) {
                        cell.style.color = "orange";
                    }
                    else if (j === 4) {
                        // Example: Green Friday
                        cell.style.color = "#2fde52";
                    }
                    
                    if (eventForDay.some(ev => ev.type === "polban")) {
                        cell.style.backgroundColor ="rgba(211, 151, 1, 0.3)";
                    }
                    else if (eventForDay.some(ev => ev.type === "snbt")) {
                        cell.style.backgroundColor ="rgba(124, 124, 124, 0.3)";
                    }else{
                        cell.style.backgroundColor ="transparent";
                    }
                    
                    // Highlight if (year, month, date) == today
                    if (
                        date === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear()
                    ) {
                        cell.style.fontWeight = "bold";
                        cell.style.borderRadius = "20px";
                        cell.style.backgroundColor = "rgba(0, 144, 255, 0.3)";
                    }

                    date++;
                    rowAdded = true;
                }

                row.appendChild(cell);
            }

            // Only append row if there is at least 1 valid date
            if (rowAdded) {
                calendarBody.appendChild(row);
            }
        }

        calendarTable.appendChild(calendarBody);
        calendarDiv.appendChild(calendarTable);

        // ------------------------------------------------
        // 3) Build the events table with custom overlap format
        // ------------------------------------------------
        const displayEvents = getDisplayEvents(events, month, year);

        // Display in table
        const eventsTable = document.createElement("table");
        eventsTable.className = "table no-border events-table";
        const eventsTableBody = document.createElement("tbody");

        displayEvents.forEach(ev => {
            const row = document.createElement("tr");
            const dateCell = document.createElement("td");
            const descriptionCell = document.createElement("td");

            // Example "25 - 3 March" or "1 - 3 March", etc.
            dateCell.textContent = ev.dateRange;
            descriptionCell.textContent = ev.description;

            row.appendChild(dateCell);
            dateCell.className = "text-nowrap";
            row.appendChild(descriptionCell);
            eventsTableBody.appendChild(row);
        });

        eventsTable.appendChild(eventsTableBody);
        eventsDiv.appendChild(eventsTable);
    }

    /**
     * Function to create the list of events (from the original data),
     * displaying overlap ranges with the format:
     * - Current month: 25 - 3 March (if displaying February)
     * - Next month:    1 - 3 March (if displaying March)
     */
    function getDisplayEvents(events, month, year) {
        let rawEvents = [];

        // Helper: add event to rawEvents if it overlaps with this month
        function maybePush(originalEvents, type) {
            originalEvents.forEach(e => {
                let startDate = new Date(e.startDate || e.date);
                let endDate = new Date(e.endDate || e.date);

                // Normalize hours
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);

                // Boundaries of the month being displayed
                const firstDayOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
                const lastDayOfMonth  = new Date(year, month + 1, 0, 23, 59, 59, 999);

                // If there is no overlap at all, skip
                if (endDate < firstDayOfMonth || startDate > lastDayOfMonth) {
                    return;
                }

                rawEvents.push({
                    startDate,
                    endDate,
                    description: e.description,
                    type
                });
            });
        }

        // Check checkboxes
        if (holidayCheckbox.checked) {
            maybePush(events.nationalHolidays, "holiday");
        }
        if (collectiveLeaveCheckbox.checked) {
            maybePush(events.collectiveLeaves, "collectiveLeave");
        }
        if (polbanCheckbox.checked) {
            maybePush(events.polbanEvents, "polban");
        }
        if (snbtCheckbox.checked) {
            maybePush(events.snbtEvents, "snbt");
        }

        // Sort by startDate
        rawEvents.sort((a, b) => a.startDate - b.startDate);

        // Format single-day vs multi-day, + special overlap logic
        const result = rawEvents.map(ev => {
            // Real start & end
            const sDate = ev.startDate;
            const eDate = ev.endDate;

            // Find "start" of this month
            // If the event starts before this month, we use "1" (first day of this month).
            // If the event starts within this month, use the actual date.
            const firstDayOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
            const lastDayOfMonth  = new Date(year, month + 1, 0, 23, 59, 59, 999);

            // Local start date
            let localStartDay;
            if (sDate < firstDayOfMonth) {
                // Starts before this month => show "1"
                localStartDay = 1;
            } else {
                // Starts in this month => use actual date
                localStartDay = sDate.getDate();
            }

            // Local end date
            // If the event continues beyond this month, we want to display "actualDate + monthName".
            // Example: "25 - 3 March"
            let localEndDay; 
            let localEndMonthName = null;

            if (eDate > lastDayOfMonth) {
                // Event continues to next month
                // => show "actual date" + "month name" from eDate
                localEndDay = eDate.getDate();
                localEndMonthName = eDate.toLocaleString("default", { month: "short" });
            } else {
                // Ends in (or before) the end of the month
                localEndDay = eDate.getDate();

                // If endDate is still in the same month, no special month name
                // (But if eDate is in a different month, it will be skipped by the overlap check, unless crossing?
                //  Well, with the logic above, we handle "crossing" = eDate > lastDayOfMonth.)
            }

            // If localStartDay == localEndDay and localEndMonthName === null
            // => means 1 day in this month only
            if (localStartDay === localEndDay && !localEndMonthName) {
                // Single-day event in this month
                return {
                    dateRange: localStartDay.toString(),
                    description: ev.description
                };
            } else {
                // Multi-day, or crossing to the next month
                const startStr = localStartDay.toString();
                // Example: "3 March" => "3" + " March"
                const endStr   = localEndMonthName
                    ? `${localEndDay} ${localEndMonthName}` 
                    : localEndDay.toString();

                return {
                    dateRange: `${startStr} - ${endStr}`,
                    description: ev.description
                };
            }
        });

        return result;
    }
});