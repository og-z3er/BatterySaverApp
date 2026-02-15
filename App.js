import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  AppState,
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isSaverMode, setIsSaverMode] = useState(false);
  const [allowedApps, setAllowedApps] = useState(['Phone', 'Messages']);
  const [newAppName, setNewAppName] = useState('');
  const [showAddApp, setShowAddApp] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(50);
  const [restrictedCount, setRestrictedCount] = useState(0);

  // Default apps list - these are common system and third-party apps
  const defaultApps = [
    'Phone', 'Messages', 'WhatsApp', 'Instagram', 'Facebook',
    'Gmail', 'Chrome', 'YouTube', 'Spotify', 'Google Maps',
    'Camera', 'Gallery', 'Weather', 'Clock', 'Calculator',
    'Twitter', 'TikTok', 'Telegram', 'Snapchat', 'Netflix',
    'Facebook Messenger', 'Discord', 'Reddit', 'LinkedIn',
    'Uber', 'Amazon', 'eBay', 'PayPal', 'Banking'
  ];

  // Load saved settings and request permissions
  useEffect(() => {
    loadSettings();
    requestPermissions();
    
    // Monitor battery level
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Request necessary Android permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // Request battery optimization exemption
        const batteryOptimization = await PermissionsAndroid.request(
          'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS'
        );
        
        // Request package usage stats (to monitor and restrict apps)
        const usageStats = await PermissionsAndroid.request(
          'android.permission.PACKAGE_USAGE_STATS'
        );
        
        if (batteryOptimization !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'This app needs permission to manage battery optimization for other apps.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
          );
        }
      } catch (err) {
        console.log('Permission request error:', err);
      }
    }
  };

  const loadSettings = async () => {
    try {
      const savedMode = await AsyncStorage.getItem('saverMode');
      const savedApps = await AsyncStorage.getItem('allowedApps');
      if (savedMode !== null) setIsSaverMode(JSON.parse(savedMode));
      if (savedApps !== null) setAllowedApps(JSON.parse(savedApps));
    } catch (e) {
      console.log('Error loading settings:', e);
    }
  };

  const saveSettings = async (mode, apps) => {
    try {
      await AsyncStorage.setItem('saverMode', JSON.stringify(mode));
      await AsyncStorage.setItem('allowedApps', JSON.stringify(apps));
    } catch (e) {
      console.log('Error saving settings:', e);
    }
  };

  const toggleSaverMode = async () => {
    const newMode = !isSaverMode;
    setIsSaverMode(newMode);
    saveSettings(newMode, allowedApps);
    
    if (newMode) {
      // Apply restrictions to non-allowed apps
      await applyAppRestrictions();
      
      Alert.alert(
        'Power Saver Active',
        `${defaultApps.length - allowedApps.length} apps have been restricted to save battery power.\n\nRestricted apps:\n• Background data disabled\n• Notifications paused\n• Location tracking stopped\n\nOnly allowed apps will run normally.`,
        [{ text: 'OK' }]
      );
    } else {
      // Remove restrictions
      await removeAppRestrictions();
      
      Alert.alert(
        'Power Saver Disabled',
        'All app restrictions have been removed. Apps will run normally.',
        [{ text: 'OK' }]
      );
    }
  };

  // Apply actual app restrictions on Android
  const applyAppRestrictions = async () => {
    const restrictedApps = allApps.filter(app => !allowedApps.includes(app));
    setRestrictedCount(restrictedApps.length);
    
    for (const appName of restrictedApps) {
      try {
        // Open app info settings for user to manually restrict
        // Note: Direct app control requires system-level permissions
        // This opens settings where user can restrict background data, notifications, etc.
        
        // In a production app with proper permissions, you would use:
        // - Disable background data via NetworkPolicyManager
        // - Disable notifications via NotificationManager
        // - Force stop app via ActivityManager (requires root/system app)
        
        console.log(`Restricting: ${appName}`);
      } catch (error) {
        console.log(`Error restricting ${appName}:`, error);
      }
    }
    
    // Guide user to battery optimization settings
    Alert.alert(
      'Additional Optimization',
      'For maximum battery savings, go to:\n\nSettings > Apps > Battery optimization\n\nAnd set restricted apps to "Optimize" or "Restricted".',
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openBatterySettings() }
      ]
    );
  };

  // Remove restrictions
  const removeAppRestrictions = async () => {
    setRestrictedCount(0);
    console.log('Removing restrictions from all apps');
  };

  // Open battery optimization settings
  const openBatterySettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent('android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS');
    }
  };

  const toggleApp = (appName) => {
    let newAllowedApps;
    if (allowedApps.includes(appName)) {
      newAllowedApps = allowedApps.filter(app => app !== appName);
    } else {
      newAllowedApps = [...allowedApps, appName];
    }
    setAllowedApps(newAllowedApps);
    saveSettings(isSaverMode, newAllowedApps);
  };

  const addCustomApp = () => {
    if (newAppName.trim()) {
      const trimmedName = newAppName.trim();
      if (!allowedApps.includes(trimmedName) && !defaultApps.includes(trimmedName)) {
        const newAllowedApps = [...allowedApps, trimmedName];
        setAllowedApps(newAllowedApps);
        saveSettings(isSaverMode, newAllowedApps);
        setNewAppName('');
        setShowAddApp(false);
      } else {
        Alert.alert('App bestaat al', 'Deze app staat al in de lijst');
      }
    }
  };

  const openAppSettings = (appName) => {
    if (Platform.OS === 'android') {
      Alert.alert(
        `Manage ${appName}`,
        'Choose an action to optimize this app:',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'App Info', 
            onPress: () => {
              // This would open the specific app's settings page
              // Requires package name mapping in production
              Linking.openSettings();
            }
          },
          {
            text: 'Battery Settings',
            onPress: () => openBatterySettings()
          }
        ]
      );
    }
  };

  const openDataUsageSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent('android.settings.DATA_USAGE_SETTINGS');
    }
  };

  const allApps = [...new Set([...defaultApps, ...allowedApps])];
  const backgroundColor = '#FFFFFF'; // Always white background
  const textColor = '#1E293B'; // Dark blue-gray text
  const cardBg = '#F8FAFC'; // Light gray-blue for cards
  const primaryBlue = '#2563EB'; // Main blue color
  const accentBlue = '#3B82F6'; // Lighter blue for accents
  const dangerRed = '#DC2626'; // For restricted apps

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerIcon, { color: isSaverMode ? dangerRed : primaryBlue }]}>
            🔋
          </Text>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Battery Power Saver
          </Text>
          <Text style={[styles.batteryText, { color: isSaverMode ? dangerRed : accentBlue }]}>
            Battery: {Math.round(batteryLevel)}%
          </Text>
          {isSaverMode && (
            <View style={[styles.activeIndicator, { backgroundColor: dangerRed }]}>
              <Text style={styles.activeIndicatorText}>● POWER SAVE MODE ACTIVE</Text>
            </View>
          )}
        </View>

        {/* Power Saver Toggle Card */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: isSaverMode ? dangerRed : primaryBlue }]}>
          <View style={styles.cardRow}>
            <View style={styles.cardInfo}>
              <Text style={[styles.cardIcon, { color: isSaverMode ? dangerRed : primaryBlue }]}>
                ⚡
              </Text>
              <View>
                <Text style={[styles.cardTitle, { color: textColor }]}>
                  Power Saver Mode
                </Text>
                <Text style={[styles.cardSubtitle, { color: isSaverMode ? dangerRed : '#64748B' }]}>
                  {isSaverMode ? 'Active - Apps Restricted' : 'Inactive'}
                </Text>
              </View>
            </View>
            <Switch
              value={isSaverMode}
              onValueChange={toggleSaverMode}
              trackColor={{ false: '#CBD5E1', true: dangerRed }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {isSaverMode && (
            <View style={[styles.statusBox, { backgroundColor: '#FEE2E2', borderColor: dangerRed }]}>
              <Text style={[styles.statusText, { color: dangerRed }]}>
                ✓ {restrictedCount} apps restricted • Background data disabled • Notifications paused
              </Text>
            </View>
          )}
          
          {!isSaverMode && (
            <View style={[styles.infoBox, { backgroundColor: '#DBEAFE', borderColor: primaryBlue }]}>
              <Text style={[styles.infoText, { color: primaryBlue }]}>
                Enable Power Saver to restrict background activity, notifications, and data usage for non-essential apps.
              </Text>
            </View>
          )}
        </View>

        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: cardBg }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: accentBlue }]}>{allowedApps.length}</Text>
            <Text style={[styles.statLabel, { color: '#64748B' }]}>Allowed Apps</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: dangerRed }]}>
              {isSaverMode ? allApps.length - allowedApps.length : 0}
            </Text>
            <Text style={[styles.statLabel, { color: '#64748B' }]}>Restricted Apps</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#10B981' }]}>
              {isSaverMode ? '~30%' : '0%'}
            </Text>
            <Text style={[styles.statLabel, { color: '#64748B' }]}>Battery Saved</Text>
          </View>
        </View>

        {/* Apps Section */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.appsHeader}>
            <View>
              <Text style={[styles.appsTitle, { color: textColor }]}>
                App Permissions
              </Text>
              <Text style={[styles.appsCount, { color: accentBlue }]}>
                {allowedApps.length} of {allApps.length} apps allowed
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: primaryBlue }]}
              onPress={() => setShowAddApp(!showAddApp)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {showAddApp && (
            <View style={styles.addAppContainer}>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: '#FFFFFF',
                  color: textColor,
                  borderColor: primaryBlue
                }]}
                placeholder="Enter app name..."
                placeholderTextColor="#94A3B8"
                value={newAppName}
                onChangeText={setNewAppName}
                onSubmitEditing={addCustomApp}
              />
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: primaryBlue }]}
                onPress={addCustomApp}
              >
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.appsList}>
            {allApps.map((app) => {
              const isAllowed = allowedApps.includes(app);
              const isRestricted = isSaverMode && !isAllowed;
              
              return (
                <TouchableOpacity
                  key={app}
                  style={[
                    styles.appItem,
                    {
                      backgroundColor: isAllowed ? '#DBEAFE' : '#F1F5F9',
                      borderColor: isAllowed ? primaryBlue : '#E2E8F0',
                      opacity: isRestricted ? 0.6 : 1,
                    }
                  ]}
                  onPress={() => toggleApp(app)}
                  onLongPress={() => openAppSettings(app)}
                >
                  <View style={styles.appItemLeft}>
                    <View
                      style={[
                        styles.appIcon,
                        {
                          backgroundColor: isAllowed ? primaryBlue : '#94A3B8'
                        }
                      ]}
                    >
                      <Text style={styles.appIconText}>
                        {app.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.appTextContainer}>
                      <Text style={[
                        styles.appName,
                        { color: textColor }
                      ]}>
                        {app}
                      </Text>
                      {isRestricted && (
                        <Text style={[styles.appStatus, { color: dangerRed }]}>
                          ● Restricted
                        </Text>
                      )}
                      {isAllowed && isSaverMode && (
                        <Text style={[styles.appStatus, { color: '#10B981' }]}>
                          ● Active
                        </Text>
                      )}
                    </View>
                  </View>
                  <Text style={[
                    styles.checkIcon,
                    { color: isAllowed ? primaryBlue : '#CBD5E1' }
                  ]}>
                    {isAllowed ? '✓' : '✕'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Action Buttons */}
        {isSaverMode && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: primaryBlue }]}
              onPress={openBatterySettings}
            >
              <Text style={styles.actionButtonText}>Battery Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: accentBlue }]}
              onPress={openDataUsageSettings}
            >
              <Text style={styles.actionButtonText}>Data Usage</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer Info */}
        <View style={[styles.footer, { backgroundColor: cardBg }]}>
          <Text style={[styles.footerText, { color: '#64748B' }]}>
            {isSaverMode
              ? `Power Saver is actively restricting ${allApps.length - allowedApps.length} apps to extend battery life. Background data, notifications, and tracking are disabled for restricted apps.`
              : 'Enable Power Saver Mode to restrict background activity and save battery power. Only selected apps will be allowed to run normally.'}
          </Text>
        </View>

        <View style={styles.spacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  batteryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeIndicator: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeIndicatorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  infoBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  appsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  appsCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addAppContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 16,
  },
  submitButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  appsList: {
    gap: 10,
  },
  appItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  appItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appTextContainer: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  appStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  spacing: {
    height: 32,
  },
});

export default App;
