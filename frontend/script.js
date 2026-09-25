const API_URL = "http://localhost:8080/customers";


// =========================
// TOAST NOTIFICATION
// =========================

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


let allCustomers = [];
let currentPage = 1;

const rowsPerPage = 5;


// =========================
// STATISTICS
// =========================

function getStatistics() {

    fetch(`${API_URL}/statistics`)

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch statistics"
                );
            }

            return response.json();

        })

        .then(statistics => {

            document.getElementById(
                "totalCustomers"
            ).textContent =
                statistics.totalCustomers;


            document.getElementById(
                "activeRecords"
            ).textContent =
                statistics.activeRecords;


            document.getElementById(
                "addedToday"
            ).textContent =
                statistics.addedToday;


            document.getElementById(
                "deletedRecords"
            ).textContent =
                statistics.deletedRecords;

        })

        .catch(error => {

            console.error(
                "Statistics Error:",
                error
            );

        });
}


// =========================
// ADD CUSTOMER
// =========================

function addCustomer() {

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();


    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        address === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    const customer = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        phone: phone,

        address: address

    };


    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to add customer"
            );

        }

        return response.json();

    })

    .then(data => {

        showToast(
            "Customer added successfully!"
        );


        clearForm();

        currentPage = 1;


        getCustomers();

        getStatistics();

        getActivityHistory();

    })

    .catch(error => {

        console.error(error);

        showToast(
            "Customer could not be added."
        );

    });
}


// =========================
// GET ALL CUSTOMERS
// =========================

function getCustomers() {

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to fetch customers"
                );

            }

            return response.json();

        })

        .then(customers => {

            // Sort by Customer ID
            customers.sort(
                (a, b) => a.id - b.id
            );


            allCustomers = customers;


            getStatistics();

            displayCustomers(
                allCustomers
            );

        })

        .catch(error => {

            console.error(error);

            alert(
                "Error: Customers could not be loaded."
            );

        });
}


// =========================
// DISPLAY CUSTOMERS
// =========================

function displayCustomers(customers) {

    const customerList =
        document.getElementById(
            "customerList"
        );

    const pagination =
        document.getElementById(
            "pagination"
        );


    const totalPages =
        Math.ceil(
            customers.length / rowsPerPage
        );


    if (
        currentPage > totalPages &&
        totalPages > 0
    ) {

        currentPage = totalPages;

    }


    // =========================
    // NO CUSTOMERS
    // =========================

    if (customers.length === 0) {

        customerList.innerHTML = `

            <div class="empty-message">

                <i class="fas fa-users"></i>

                <p>
                    No customers found.
                </p>

            </div>

        `;


        pagination.innerHTML = "";

        return;
    }


    // =========================
    // CURRENT PAGE
    // =========================

    const startIndex =
        (currentPage - 1) *
        rowsPerPage;


    const endIndex =
        startIndex +
        rowsPerPage;


    const pageCustomers =
        customers.slice(
            startIndex,
            endIndex
        );


    // =========================
    // CUSTOMER TABLE
    // =========================

    let table = `

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>#</th>

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Address</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

    `;


    pageCustomers.forEach(
        (customer, index) => {

            table += `

                <tr>

                    <td>
                        ${startIndex + index + 1}
                    </td>

                    <td>
                        ${customer.firstName}
                    </td>

                    <td>
                        ${customer.lastName}
                    </td>

                    <td>
                        ${customer.email}
                    </td>

                    <td>
                        ${customer.phone}
                    </td>

                    <td>
                        ${customer.address}
                    </td>

                    <td class="action-buttons">

                        <button
                            class="edit-btn"
                            onclick="editCustomer(${customer.id})"
                        >

                            <i class="fas fa-pen"></i>

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteCustomer(${customer.id})"
                        >

                            <i class="fas fa-trash"></i>

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    table += `

                </tbody>

            </table>

        </div>

    `;


    customerList.innerHTML =
        table;


    // =========================
    // PAGINATION
    // =========================

    let paginationHTML = `

        <div class="pagination-info">

            Showing

            <strong>
                ${startIndex + 1}
            </strong>

            to

            <strong>
                ${Math.min(
                    endIndex,
                    customers.length
                )}
            </strong>

            of

            <strong>
                ${customers.length}
            </strong>

            customers

        </div>


        <div class="pagination-buttons">

            <button
                onclick="changePage(1)"
                ${currentPage === 1
                    ? "disabled"
                    : ""}
            >
                «
            </button>


            <button
                onclick="changePage(${currentPage - 1})"
                ${currentPage === 1
                    ? "disabled"
                    : ""}
            >
                ‹
            </button>

    `;


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        paginationHTML += `

            <button
                class="${
                    i === currentPage
                    ? "active-page"
                    : ""
                }"
                onclick="changePage(${i})"
            >

                ${i}

            </button>

        `;

    }


    paginationHTML += `

            <button
                onclick="changePage(${currentPage + 1})"
                ${
                    currentPage === totalPages
                    ? "disabled"
                    : ""
                }
            >
                ›
            </button>


            <button
                onclick="changePage(${totalPages})"
                ${
                    currentPage === totalPages
                    ? "disabled"
                    : ""
                }
            >
                »
            </button>

        </div>

    `;


    pagination.innerHTML =
        paginationHTML;
}


// =========================
// CHANGE PAGE
// =========================

function changePage(page) {

    const totalPages =
        Math.ceil(
            allCustomers.length /
            rowsPerPage
        );


    if (
        page < 1 ||
        page > totalPages
    ) {

        return;

    }


    currentPage = page;

    applySearch();
}


// =========================
// SEARCH CUSTOMERS
// =========================

function searchCustomers() {

    currentPage = 1;

    applySearch();
}


function applySearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        displayCustomers(
            allCustomers
        );

        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredCustomers =
        allCustomers.filter(
            customer => {

                const firstName =
                    (
                        customer.firstName ||
                        ""
                    ).toLowerCase();


                const lastName =
                    (
                        customer.lastName ||
                        ""
                    ).toLowerCase();


                const email =
                    (
                        customer.email ||
                        ""
                    ).toLowerCase();


                const phone =
                    (
                        customer.phone ||
                        ""
                    ).toLowerCase();


                const address =
                    (
                        customer.address ||
                        ""
                    ).toLowerCase();


                return (

                    firstName.includes(
                        searchText
                    )

                    ||

                    lastName.includes(
                        searchText
                    )

                    ||

                    email.includes(
                        searchText
                    )

                    ||

                    phone.includes(
                        searchText
                    )

                    ||

                    address.includes(
                        searchText
                    )

                );

            }
        );


    displayCustomers(
        filteredCustomers
    );
}


// =========================
// EDIT CUSTOMER
// =========================

function editCustomer(id) {

    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Customer not found"
                );

            }

            return response.json();

        })

        .then(customer => {

            document.getElementById(
                "firstName"
            ).value =
                customer.firstName || "";


            document.getElementById(
                "lastName"
            ).value =
                customer.lastName || "";


            document.getElementById(
                "email"
            ).value =
                customer.email || "";


            document.getElementById(
                "phone"
            ).value =
                customer.phone || "";


            document.getElementById(
                "address"
            ).value =
                customer.address || "";


            document.getElementById(
                "updateId"
            ).value =
                customer.id;


            document.getElementById(
                "home"
            ).scrollIntoView({
                behavior: "smooth"
            });


            showToast(
                "Customer details loaded for editing."
            );

        })

        .catch(error => {

            console.error(error);

            showToast(
                "Customer could not be loaded."
            );

        });
}


// =========================
// UPDATE CUSTOMER
// =========================

function updateCustomer() {

    const id =
        document.getElementById(
            "updateId"
        ).value;


    if (id === "") {

        showToast(
            "Please select a customer to update."
        );

        return;
    }


    const firstName =
        document.getElementById(
            "firstName"
        ).value.trim();


    const lastName =
        document.getElementById(
            "lastName"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        address === ""
    ) {

        showToast(
            "Please fill all fields."
        );

        return;
    }


    const customer = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        phone: phone,

        address: address

    };


    fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(customer)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to update customer"
            );

        }

        return response.json();

    })

    .then(data => {

        showToast(
            "Customer updated successfully!"
        );


        clearForm();

        getCustomers();

        getStatistics();

        getActivityHistory();

    })

    .catch(error => {

        console.error(error);

        showToast(
            "Error: Customer could not be updated."
        );

    });
}


// =========================
// DELETE CUSTOMER
// =========================

function deleteCustomer(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this customer?"
        );


    if (!confirmDelete) {

        return;

    }


    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to delete customer"
            );

        }

        return response.text();

    })

    .then(message => {

        showToast(message);


        getCustomers();

        getStatistics();

        getActivityHistory();

    })

    .catch(error => {

        console.error(error);

        showToast(
            "Error: Customer could not be deleted."
        );

    });
}


// =========================
// CLEAR FORM
// =========================

function clearForm() {

    document.getElementById(
        "firstName"
    ).value = "";


    document.getElementById(
        "lastName"
    ).value = "";


    document.getElementById(
        "email"
    ).value = "";


    document.getElementById(
        "phone"
    ).value = "";


    document.getElementById(
        "address"
    ).value = "";


    document.getElementById(
        "updateId"
    ).value = "";
}


// =========================
// ACTIVITY HISTORY
// =========================

let allActivities = [];

let currentActivityPage = 1;

const activitiesPerPage = 5;


// =========================
// GET ACTIVITY HISTORY
// =========================

function getActivityHistory() {

    const activityHistory =
        document.getElementById(
            "activityHistory"
        );


    if (!activityHistory) {

        return;

    }


    fetch(
        `${API_URL}/activity-history`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to fetch activity history"
                );

            }

            return response.json();

        })

        .then(activities => {

            allActivities =
                activities || [];


            currentActivityPage = 1;


            displayActivities(
                allActivities
            );

        })

        .catch(error => {

            console.error(
                "Activity History Error:",
                error
            );


            activityHistory.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        class="activity-empty"
                    >

                        <i
                            class="fas fa-triangle-exclamation"
                        ></i>

                        Activity history could not be loaded.

                    </td>

                </tr>

            `;


            document.getElementById(
                "activityPagination"
            ).innerHTML = "";

        });
}


// =========================
// DISPLAY ACTIVITIES
// =========================

function displayActivities(
    activities
) {

    const activityHistory =
        document.getElementById(
            "activityHistory"
        );


    const pagination =
        document.getElementById(
            "activityPagination"
        );


    if (!activityHistory) {

        return;

    }


    const totalPages =
        Math.ceil(
            activities.length /
            activitiesPerPage
        );


    if (
        currentActivityPage > totalPages &&
        totalPages > 0
    ) {

        currentActivityPage =
            totalPages;

    }


    // =========================
    // NO ACTIVITIES
    // =========================

    if (activities.length === 0) {

        activityHistory.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="activity-empty"
                >

                    <i
                        class="fas fa-clock-rotate-left"
                    ></i>

                    No activity history found.

                </td>

            </tr>

        `;


        pagination.innerHTML = "";

        return;

    }


    // =========================
    // CURRENT PAGE
    // =========================

    const startIndex =
        (currentActivityPage - 1) *
        activitiesPerPage;


    const endIndex =
        startIndex +
        activitiesPerPage;


    const pageActivities =
        activities.slice(
            startIndex,
            endIndex
        );


    // =========================
    // DISPLAY TABLE
    // =========================

    activityHistory.innerHTML = "";


    pageActivities.forEach(
        (activity, index) => {

            const activityType =
                (
                    activity.activityType ||
                    ""
                ).toUpperCase();


            const isAdd =
                activityType === "ADD";


            const badgeClass =
                isAdd
                ? "activity-add"
                : "activity-delete";


            const iconClass =
                isAdd
                ? "fa-plus"
                : "fa-trash";


            const activityTime =
                formatActivityTime(
                    activity.activityTime
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${startIndex + index + 1}
                </td>


                <td>
                    ${activity.customerId}
                </td>


                <td>

                    <strong>
                        ${
                            activity.customerName ||
                            "—"
                        }
                    </strong>

                </td>


                <td>

                    <span
                        class="activity-badge ${badgeClass}"
                    >

                        <i
                            class="fas ${iconClass}"
                        ></i>

                        ${activityType}

                    </span>

                </td>


                <td>
                    ${activityTime}
                </td>

            `;


            activityHistory.appendChild(
                row
            );

        }
    );


    // =========================
    // PAGINATION
    // =========================

    createActivityPagination(
        activities,
        totalPages,
        startIndex,
        endIndex
    );
}


// =========================
// ACTIVITY SEARCH
// =========================

function searchActivities() {

    const searchInput =
        document.getElementById(
            "activitySearchInput"
        );


    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    currentActivityPage = 1;


    const filteredActivities =
        allActivities.filter(
            activity => {

                const customerId =
                    String(
                        activity.customerId || ""
                    ).toLowerCase();


                const customerName =
                    (
                        activity.customerName ||
                        ""
                    ).toLowerCase();


                const activityType =
                    (
                        activity.activityType ||
                        ""
                    ).toLowerCase();


                const activityTime =
                    (
                        activity.activityTime ||
                        ""
                    ).toLowerCase();


                return (

                    customerId.includes(
                        searchText
                    )

                    ||

                    customerName.includes(
                        searchText
                    )

                    ||

                    activityType.includes(
                        searchText
                    )

                    ||

                    activityTime.includes(
                        searchText
                    )

                );

            }
        );


    displayActivities(
        filteredActivities
    );
}


// =========================
// ACTIVITY PAGINATION
// =========================

function createActivityPagination(
    activities,
    totalPages,
    startIndex,
    endIndex
) {

    const pagination =
        document.getElementById(
            "activityPagination"
        );


    if (!pagination) {

        return;

    }


    const showingTo =
        Math.min(
            endIndex,
            activities.length
        );


    let paginationHTML = `

        <div class="activity-pagination-info">

            Showing

            <strong>
                ${startIndex + 1}
            </strong>

            to

            <strong>
                ${showingTo}
            </strong>

            of

            <strong>
                ${activities.length}
            </strong>

            activities

        </div>


        <button
            onclick="changeActivityPage(1)"
            ${
                currentActivityPage === 1
                ? "disabled"
                : ""
            }
        >
            «
        </button>


        <button
            onclick="changeActivityPage(
                ${currentActivityPage - 1}
            )"
            ${
                currentActivityPage === 1
                ? "disabled"
                : ""
            }
        >
            ‹
        </button>

    `;


    // =========================
    // PAGE NUMBERS
    // =========================

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        paginationHTML += `

            <button
                class="${
                    i === currentActivityPage
                    ? "active"
                    : ""
                }"
                onclick="changeActivityPage(${i})"
            >

                ${i}

            </button>

        `;

    }


    paginationHTML += `

        <button
            onclick="changeActivityPage(
                ${currentActivityPage + 1}
            )"
            ${
                currentActivityPage === totalPages
                ? "disabled"
                : ""
            }
        >
            ›
        </button>


        <button
            onclick="changeActivityPage(
                ${totalPages}
            )"
            ${
                currentActivityPage === totalPages
                ? "disabled"
                : ""
            }
        >
            »
        </button>

    `;


    pagination.innerHTML =
        paginationHTML;
}


// =========================
// CHANGE ACTIVITY PAGE
// =========================

function changeActivityPage(
    page
) {

    const searchInput =
        document.getElementById(
            "activitySearchInput"
        );


    const searchText =
        searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";


    const filteredActivities =
        allActivities.filter(
            activity => {

                const customerId =
                    String(
                        activity.customerId || ""
                    ).toLowerCase();


                const customerName =
                    (
                        activity.customerName ||
                        ""
                    ).toLowerCase();


                const activityType =
                    (
                        activity.activityType ||
                        ""
                    ).toLowerCase();


                const activityTime =
                    (
                        activity.activityTime ||
                        ""
                    ).toLowerCase();


                return (

                    customerId.includes(
                        searchText
                    )

                    ||

                    customerName.includes(
                        searchText
                    )

                    ||

                    activityType.includes(
                        searchText
                    )

                    ||

                    activityTime.includes(
                        searchText
                    )

                );

            }
        );


    const totalPages =
        Math.ceil(
            filteredActivities.length /
            activitiesPerPage
        );


    if (
        page < 1 ||
        page > totalPages
    ) {

        return;

    }


    currentActivityPage = page;


    displayActivities(
        filteredActivities
    );
}


// =========================
// FORMAT ACTIVITY TIME
// =========================

function formatActivityTime(
    activityTime
) {

    if (!activityTime) {

        return "—";

    }


    const date =
        new Date(activityTime);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return activityTime;

    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );
}


// =========================
// PAGE LOAD
// =========================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        getCustomers();

        getStatistics();

        getActivityHistory();

    }
);