// Settings.js
import { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put('/api/settings', settings);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={settings.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address:</label>
          <textarea
            id="companyAddress"
            name="companyAddress"
            value={settings.companyAddress}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="companyPhone">Company Phone:</label>
          <input
            type="tel"
            id="companyPhone"
            name="companyPhone"
            value={settings.companyPhone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="companyEmail">Company Email:</label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={settings.companyEmail}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
