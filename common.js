document.addEventListener('DOMContentLoaded', function() {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply dark mode if saved preference exists
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Add dark mode toggle to mobile sidebar if it exists
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        });
    }
    
    // Apply the theme colors
    document.documentElement.style.setProperty('--primary-color', localStorage.getItem('primaryColor'));
    document.documentElement.style.setProperty('--primary-light', localStorage.getItem('primaryLight'));
    document.documentElement.style.setProperty('--primary-dark', localStorage.getItem('primaryDark'));


    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.top = `${rect.bottom + 10}px`;
            tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
            tooltipEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltipEl.style.color = 'white';
            tooltipEl.style.padding = '5px 10px';
            tooltipEl.style.borderRadius = '4px';
            tooltipEl.style.fontSize = '12px';
            tooltipEl.style.zIndex = '1000';
        });

        tooltip.addEventListener('mouseleave', function() {
            const tooltipEl = document.querySelector('.tooltip');
            if (tooltipEl) {
                tooltipEl.remove();
            }
        });
    });

    // Update color scheme to match current theme
    document.querySelectorAll('.stat-icon, .activity-icon, .overview-icon').forEach(icon => {
        if (icon.style.backgroundColor === '#6884e7') {
            icon.style.backgroundColor = 'var(--primary-light)';
            icon.style.color = 'var(--primary-color)';
        }
    });

    // Update active tab indicator color
    document.querySelectorAll('.tab-btn.active').forEach(tab => {
        const indicator = tab.querySelector('::after');
        if (indicator) {
            indicator.style.backgroundColor = 'var(--primary-color)';
        }
    });
});