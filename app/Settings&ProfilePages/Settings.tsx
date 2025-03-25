
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');

  const handleClearData = () => {
    Alert.alert('Confirmation', 'Are you sure you want to clear your dream data?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => Alert.alert('Data Cleared!') }
    ]);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Please enter your feedback');
    } else {
      Alert.alert('Feedback Submitted!');
      setFeedback('');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => router.push('../auth/sign_in') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SETTINGS</Text>
      </View>

      <SettingRow label="Light Mode" value={isDarkMode} onValueChange={setIsDarkMode} />
      <SettingRow label="Notifications" value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} />

      {/* Data Management */}
      <TouchableOpacity style={styles.button} onPress={handleClearData}>
        <Text style={styles.buttonText}>Clear Dream Data</Text>
      </TouchableOpacity>



      <View style={styles.differentContainer}>
        {/* Feedback Section */}
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback..."
          placeholderTextColor="#ccc"
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>

      </View>
      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/HomeScreen')}>
        <Text style={styles.buttonText}>Back to Home Page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('./Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>



    </View>
  );
}

const SettingRow = ({ label, value, onValueChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      trackColor={{ false: '#1E293B', true: '#007bff' }}
      thumbColor={value ? '#fff' : '#ccc'}
      ios_backgroundColor="#1E293B"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2C123F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003554',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#003554',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,

    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#C41E3A',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#003554',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 2,
    marginTop: 5,
    width: '90%',
  },
  submitButton: {
    backgroundColor: '#8FBC8B',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    marginTop: 5,
    width: '90%',
  },
  differentContainer: {
    backgroundColor: '#003554',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

});
