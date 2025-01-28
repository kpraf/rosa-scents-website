document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSearch();
    initProductTabs();
});

// Navigation Module
function initNavigation() {
    const CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#navigation");
    const CShamburgerMenu = document.querySelector("#navigation .toggle");

    // Navigation toggle function
    CShamburgerMenu.addEventListener('click', function() {
        toggleClasses([
            [CShamburgerMenu, 'active'],
            [CSnavbarMenu, 'active'],
            [CSbody, 'cs-open']
        ]);
        ariaExpanded();
    });

    // Dropdown functionality
    const dropDowns = Array.from(document.querySelectorAll('#navigation .cs-dropdown'));
    dropDowns.forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('active'));
    });

    // Helper Functions
    function toggleClasses(elements) {
        elements.forEach(([element, className]) => {
            element.classList.toggle(className);
        });
    }

    function ariaExpanded() {
        const csUL = document.querySelector('#expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');
        csUL.setAttribute('aria-expanded', csExpanded === 'false' ? 'true' : 'false');
    }
}

// Search Module
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');
    const closeSearch = document.getElementById('close-search');

    // Add click handler to toggle search and button state
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBtn.classList.toggle('active');
        searchContainer.classList.toggle('active');
    });

    // Close search with X button
    closeSearch.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchBtn.classList.remove('active'); // Remove active state from button
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchBtn.contains(e.target)) {
            searchContainer.classList.remove('active');
            searchBtn.classList.remove('active'); // Remove active state from button
        }
    });

    // Close search with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchContainer.classList.remove('active');
            searchBtn.classList.remove('active'); // Remove active state from button
        }
    });
}

// Product Tabs Module
function initProductTabs() {
    document.querySelectorAll('.product-tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.product-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.product-tab-panel').forEach(panel => panel.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}

function toggleFilter(button) {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    content.classList.toggle('active');
}

function toggleFilterModal() {
    const sidebar = document.querySelector('.cs-sidebar');
    sidebar.classList.toggle('active');
}

function closeSidebar() {
    document.querySelector('.cs-sidebar').classList.remove('active');
  }


  // Get the shop button element  
// Function to handle the click event  
function navigateToCheckout(event) {  
    // Prevent the default action to manipulate the class first  
    event.preventDefault();  

    const shopButton = event.currentTarget; // Get the clicked button  
    shopButton.classList.add('active'); // Add the active class  

    // Store the state in local storage  
    localStorage.setItem('activeButton', 'shop-btn');  

    // Navigate after a short delay (200 milliseconds)  
    setTimeout(() => {  
        // Navigate to the checkout page  
        window.location.href = shopButton.href; // Navigate to the link  
    }, 200);   
}  

// Attach the event listener once the DOM is fully loaded  
document.addEventListener('DOMContentLoaded', () => {  
    const shopButton = document.getElementById('shop-btn');  
    shopButton.addEventListener('click', navigateToCheckout);  
});