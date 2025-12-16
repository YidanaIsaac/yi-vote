import { useState } from 'react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    platformName: 'Yi-Vote Platform',
    maintenanceMode: false,
    emailApiKey: '••••••••••••••••••••',
    smsApiKey: '••••••••••••••••••••',
    timezone: 'UTC-05:00',
    votingRules: 'One Vote Per User'
  });

  const [logoFile, setLogoFile] = useState(null);

  const handleSaveGeneral = () => {
    console.log('Saving general settings:', settings.platformName);
    alert('General settings saved successfully!');
  };

  const handleSaveIntegration = () => {
    console.log('Saving integration settings');
    alert('Integration settings saved successfully!');
  };

  const handleSaveVoting = () => {
    console.log('Saving voting defaults');
    alert('Voting defaults saved successfully!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(URL.createObjectURL(file));
      console.log('Logo file selected:', file.name);
    }
  };

  const handleBackupNow = () => {
    console.log('Starting backup...');
    alert('System backup initiated. This may take a few minutes.');
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
      {/* Page Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">settings</span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight mb-1">Platform Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-normal">
                Manage platform-wide settings and configurations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
          {/* General Settings Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-0.5">
                <span className="material-symbols-outlined text-xl text-blue-600 dark:text-blue-400">tune</span>
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight mb-1">General Settings</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Update the platform's name and branding
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Name */}
              <label className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2 flex items-center gap-2">
                  Platform Name
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  placeholder="Enter platform name"
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 h-11 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal leading-normal transition-all hover:border-gray-400 dark:hover:border-gray-600"
                />
              </label>

              {/* Platform Logo */}
              <div className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2">
                  Platform Logo
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div 
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-20 h-20 border-2 border-gray-200 dark:border-gray-700 p-1.5 bg-gray-100 dark:bg-gray-800 shadow-sm"
                      style={{ backgroundImage: logoFile ? `url(${logoFile})` : 'url("https://api.dicebear.com/7.x/shapes/svg?seed=yivote")' }}
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl">image</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label 
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className="flex items-center justify-center gap-2 px-4">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          cloud_upload
                        </span>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: Never</p>
              <button 
                onClick={handleSaveGeneral}
                className="flex items-center justify-center gap-2 rounded-lg h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold leading-normal px-6 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Integration Settings Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg mt-0.5">
                <span className="material-symbols-outlined text-xl text-purple-600 dark:text-purple-400">extension</span>
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight mb-1">Integration Settings</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Connect with third-party services
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Gateway API Key */}
              <label className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-gray-500">mail</span>
                  Email Gateway API Key
                </span>
                <div className="relative">
                  <input
                    type="password"
                    value={settings.emailApiKey}
                    onChange={(e) => setSettings({ ...settings, emailApiKey: e.target.value })}
                    placeholder="Enter your email API key"
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 h-11 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 pr-10 text-sm font-normal leading-normal transition-all hover:border-gray-400 dark:hover:border-gray-600"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">key</span>
                </div>
              </label>

              {/* SMS Gateway API Key */}
              <label className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-gray-500">sms</span>
                  SMS Gateway API Key
                </span>
                <div className="relative">
                  <input
                    type="password"
                    value={settings.smsApiKey}
                    onChange={(e) => setSettings({ ...settings, smsApiKey: e.target.value })}
                    placeholder="Enter your SMS API key"
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 h-11 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 pr-10 text-sm font-normal leading-normal transition-all hover:border-gray-400 dark:hover:border-gray-600"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">key</span>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">Keys are encrypted and stored securely</p>
              <button 
                onClick={handleSaveIntegration}
                className="flex items-center justify-center gap-2 rounded-lg h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold leading-normal px-6 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Voting Defaults Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg mt-0.5">
                <span className="material-symbols-outlined text-xl text-green-600 dark:text-green-400">ballot</span>
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight mb-1">Voting Defaults</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Set default configurations for new events
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Timezone */}
              <label className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-gray-500">schedule</span>
                  Default Timezone
                </span>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 h-11 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal leading-normal transition-all hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer"
                >
                  <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                  <option value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</option>
                  <option value="UTC+00:00">(UTC+00:00) Greenwich Mean Time</option>
                  <option value="UTC+01:00">(UTC+01:00) Central European Time</option>
                  <option value="UTC+08:00">(UTC+08:00) China Standard Time</option>
                </select>
              </label>

              {/* Default Voting Rules */}
              <label className="flex flex-col">
                <span className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-gray-500">rule</span>
                  Default Voting Rules
                </span>
                <select
                  value={settings.votingRules}
                  onChange={(e) => setSettings({ ...settings, votingRules: e.target.value })}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 h-11 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-sm font-normal leading-normal transition-all hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer"
                >
                  <option value="One Vote Per User">One Vote Per User</option>
                  <option value="Ranked Choice Voting">Ranked Choice Voting</option>
                  <option value="Points Allocation">Points Allocation</option>
                  <option value="Multiple Votes Allowed">Multiple Votes Allowed</option>
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">These settings apply to new contests</p>
              <button 
                onClick={handleSaveVoting}
                className="flex items-center justify-center gap-2 rounded-lg h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold leading-normal px-6 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* System Maintenance Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg mt-0.5">
                <span className="material-symbols-outlined text-xl text-orange-600 dark:text-orange-400">construction</span>
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight mb-1">System Maintenance</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Manage system status and backups
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-5">
              {/* Maintenance Mode Toggle */}
              <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-lg text-yellow-600 dark:text-yellow-400">warning</span>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-1">
                      Maintenance Mode
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                      Puts the platform in a temporary offline state. Users will see a maintenance message.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/30 dark:peer-focus:ring-blue-500/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* System Backup */}
              <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-lg text-blue-600 dark:text-blue-400">cloud_sync</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white text-sm font-semibold leading-normal mb-1">
                      System Backup
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-green-600 dark:text-green-400">check_circle</span>
                        Last backup: 24 hours ago
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>Next: in 1 hour</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleBackupNow}
                  className="flex items-center justify-center gap-2 rounded-lg h-9 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm font-semibold leading-normal px-4 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm transition-all ml-4"
                >
                  <span className="material-symbols-outlined text-lg">backup</span>
                  <span>Backup Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
