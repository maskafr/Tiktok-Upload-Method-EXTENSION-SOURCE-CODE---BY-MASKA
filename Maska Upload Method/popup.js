document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('masterSwitch');
    const label = document.getElementById('masterLabel');
    
    if (!toggle || !label) return;

    const updateUI = (isActive) => {
        toggle.checked = isActive;
        if (isActive) {
            label.textContent = 'ENABLED';
            label.classList.add('active');
        } else {
            label.textContent = 'DISABLED';
            label.classList.remove('active');
        }
    };

    chrome.storage.local.get(['sysActive'], (res) => {
        updateUI(!!res.sysActive);
    });

    toggle.addEventListener('change', (e) => {
        const isActive = e.target.checked;
        
        updateUI(isActive);

        chrome.storage.local.set({ sysActive: isActive });
        
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    type: 'TOGGLE_STATE', 
                    enabled: isActive 
                });
            }
        });
    });
});