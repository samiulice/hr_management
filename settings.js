document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Toggle password visibility for API key
    const showApiKeyBtn = document.querySelector('.api-key-display .secondary-btn');
    if (showApiKeyBtn) {
        showApiKeyBtn.addEventListener('click', function() {
            const apiKeyInput = document.querySelector('.api-key-display input');
            const buttonText = this.querySelector('span:not(.material-symbols-outlined)');
            
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                this.querySelector('.material-symbols-outlined').textContent = 'visibility_off';
                buttonText.textContent = 'Hide';
            } else {
                apiKeyInput.type = 'password';
                this.querySelector('.material-symbols-outlined').textContent = 'visibility';
                buttonText.textContent = 'Show';
            }
        });
    }

    // Copy API key
    const copyApiKeyBtn = document.querySelector('.api-key-display .secondary-btn:nth-child(3)');
    if (copyApiKeyBtn) {
        copyApiKeyBtn.addEventListener('click', function() {
            const apiKeyInput = document.querySelector('.api-key-display input');
            
            // Change input type to text temporarily if it's password
            const isPassword = apiKeyInput.type === 'password';
            if (isPassword) {
                apiKeyInput.type = 'text';
            }
            
            // Select and copy
            apiKeyInput.select();
            document.execCommand('copy');
            
            // Restore input type
            if (isPassword) {
                apiKeyInput.type = 'password';
            }
            
            // Show feedback
            alert('API key copied to clipboard');
        });
    }

    // Add CSS for settings page
    const style = document.createElement('style');
    style.textContent = `
        .settings-section {
            background-color: white;
            border-radius: 8px;
            box-shadow: var(--shadow);
            margin-bottom: 20px;
            padding: 20px;
        }
        .settings-section h3 {
            margin-bottom: 20px;
            font-size: 18px;
        }
        .settings-form {
            margin-bottom: 20px;
        }
        .form-actions {
            margin-top: 20px;
        }
        .table-actions {
            margin-top: 15px;
        }
        .user-info-cell {
            display: flex;
            align-items: center;
        }
        .user-avatar-small {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .notification-settings {
            margin-bottom: 20px;
        }
        .notification-group {
            margin-bottom: 20px;
        }
        .notification-group h4 {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .notification-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }
        .notification-item:last-child {
            border-bottom: none;
        }
        .notification-info {
            flex: 1;
        }
        .notification-info h5 {
            margin-bottom: 5px;
            font-size: 14px;
        }
        .notification-info p {
            color: var(--text-muted);
            font-size: 12px;
        }
        .notification-toggle {
            margin-left: 20px;
        }
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        input:checked + .slider {
            background-color: var(--primary-color);
        }
        input:focus + .slider {
            box-shadow: 0 0 1px var(--primary-color);
        }
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        .slider.round {
            border-radius: 24px;
        }
        .slider.round:before {
            border-radius: 50%;
        }
        .integrations-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
        }
        .integration-card {
            display: flex;
            align-items: center;
            background-color: var(--light-color);
            border-radius: 8px;
            padding: 20px;
        }
        .integration-logo {
            width: 50px;
            height: 50px;
            margin-right: 15px;
        }
        .integration-logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .integration-info {
            flex: 1;
        }
        .integration-info h4 {
            margin-bottom: 5px;
        }
        .integration-info p {
            color: var(--text-muted);
            font-size: 12px;
            margin-bottom: 5px;
        }
        .integration-status {
            margin-bottom: 5px;
        }
        .integration-actions {
            display: flex;
            gap: 10px;
            margin-left: 15px;
        }
        .api-settings {
            margin-top: 15px;
        }
        .api-key-section {
            margin: 20px 0;
            padding: 15px;
            background-color: var(--light-color);
            border-radius: 8px;
        }
        .api-key-section h4 {
            margin-bottom: 10px;
        }
        .api-key-display {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        .api-key-display input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-family: monospace;
        }
        .api-key-actions {
            display: flex;
            gap: 10px;
        }
        .api-documentation {
            margin-top: 20px;
        }
        .api-documentation h4 {
            margin-bottom: 10px;
        }
        .api-documentation p {
            margin-bottom: 15px;
        }
        .data-management-options {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .data-option {
            background-color: var(--light-color);
            border-radius: 8px;
            padding: 15px;
        }
        .data-option h4 {
            margin-bottom: 10px;
        }
        .data-option p {
            margin-bottom: 15px;
            color: var(--text-muted);
        }
        .export-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .system-info {
            background-color: var(--light-color);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }
        .info-item:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 500;
        }
        .system-actions {
            display: flex;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);

    // Add event listeners for department actions
    document.querySelectorAll('.action-btn.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            alert(`Editing ${name}`);
        });
    });

    document.querySelectorAll('.action-btn.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            if (confirm(`Are you sure you want to delete ${name}?`)) {
                alert(`${name} deleted successfully`);
            }
        });
    });

    // Save changes buttons
    document.querySelectorAll('.primary-btn').forEach(button => {
        if (button.textContent.trim() === 'Save Changes') {
            button.addEventListener('click', function() {
                alert('Changes saved successfully');
            });
        }
    });

    // Add department/location buttons
    const addDepartmentBtn = document.querySelector('.table-actions .primary-btn');
    if (addDepartmentBtn && addDepartmentBtn.textContent.includes('Add Department')) {
        addDepartmentBtn.addEventListener('click', function() {
            alert('Add Department functionality will be implemented here');
        });
    }

    const addLocationBtn = document.querySelectorAll('.table-actions .primary-btn')[1];
    if (addLocationBtn && addLocationBtn.textContent.includes('Add Location')) {
        addLocationBtn.addEventListener('click', function() {
            alert('Add Location functionality will be implemented here');
        });
    }

    // Add user button
    const addUserBtn = document.querySelector('#users-tab .table-actions .primary-btn');
    if (addUserBtn && addUserBtn.textContent.includes('Add User')) {
        addUserBtn.addEventListener('click', function() {
            alert('Add User functionality will be implemented here');
        });
    }

    // Add role button
    const addRoleBtn = document.querySelector('#users-tab .table-actions:nth-of-type(2) .primary-btn');
    if (addRoleBtn && addRoleBtn.textContent.includes('Add Role')) {
        addRoleBtn.addEventListener('click', function() {
            alert('Add Role functionality will be implemented here');
        });
    }

    // Connect integration buttons
    document.querySelectorAll('.integration-card .primary-btn').forEach(button => {
        if (button.textContent.trim() === 'Connect') {
            button.addEventListener('click', function() {
                const card = this.closest('.integration-card');
                const name = card.querySelector('h4').textContent;
                alert(`Connecting to ${name}...`);
            });
        }
    });

    // Configure integration buttons
    document.querySelectorAll('.integration-card .secondary-btn').forEach(button => {
        if (button.textContent.trim() === 'Configure') {
            button.addEventListener('click', function() {
                const card = this.closest('.integration-card');
                const name = card.querySelector('h4').textContent;
                alert(`Configuring ${name} integration`);
            });
        }
    });

    // Disconnect integration buttons
    document.querySelectorAll('.integration-card .secondary-btn:nth-child(2)').forEach(button => {
        if (button.textContent.trim() === 'Disconnect') {
            button.addEventListener('click', function() {
                const card = this.closest('.integration-card');
                const name = card.querySelector('h4').textContent;
                if (confirm(`Are you sure you want to disconnect ${name}?`)) {
                    alert(`${name} disconnected successfully`);
                }
            });
        }
    });

    // API key buttons
    const generateKeyBtn = document.querySelector('.api-key-actions .primary-btn');
    if (generateKeyBtn && generateKeyBtn.textContent.includes('Generate New Key')) {
        generateKeyBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to generate a new API key? This will invalidate the existing key.')) {
                alert('New API key generated successfully');
            }
        });
    }

    const revokeKeyBtn = document.querySelector('.api-key-actions .secondary-btn');
    if (revokeKeyBtn && revokeKeyBtn.textContent.includes('Revoke Key')) {
        revokeKeyBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
                alert('API key revoked successfully');
            }
        });
    }

    // Data management buttons
    const purgeDataBtn = document.querySelector('.danger-btn');
    if (purgeDataBtn && purgeDataBtn.textContent.includes('Purge Data')) {
        purgeDataBtn.addEventListener('click', function() {
            const dataType = document.getElementById('purge-data-type').value;
            const olderThan = document.getElementById('purge-older-than