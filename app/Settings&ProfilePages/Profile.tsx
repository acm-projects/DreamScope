import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  const handleProfilePicChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  };
  const handleDeleteAccount = () => {
    Alert.alert('Account Deletion', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => Alert.alert('Account Deleted!') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MY PROFILE</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Profile Picture */}
        <TouchableOpacity style={styles.profilePicContainer} onPress={handleProfilePicChange}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Text style={styles.profilePicText}>Add Profile Pic</Text>
          )}
        </TouchableOpacity>

        {/* Bio */}
        <TextInput
          style={styles.largeInput}
          placeholder="Add a short bio..."
          placeholderTextColor="white"
          value={bio}
          onChangeText={setBio}
        />
        {/*will change to actual values after integrating with backend*/}

        <Text style={styles.statsText}>Joined on: 03-24-2025 </Text>
        <Text style={styles.statsText}>Total Dreams: 0</Text>
        <Text style={styles.statsText}>Thorough Logs: 0</Text>
        <Text style={styles.statsText}>Fragmented Logs: 0</Text>

      </View>

      {/* Dream Log */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/DreamTimeline')}>
        <Text style={styles.buttonText}> My Dream Timeline</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../tabs/HomeScreen')}>
        <Text style={styles.buttonText}>Back to Home Page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#2C123F',
    padding: 20,
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
  profilePicContainer: {
    backgroundColor: '#7D7CF9',
    padding: 15,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  profilePicText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'fantasy',
    fontSize: 15,
    textAlign: 'center',
  },
  largeInput: {
    backgroundColor: '#7D7CF9',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    height: 70,
    textAlignVertical: 'top',
    marginBottom: 15,
    width: '90%',
  },
  button: {
    backgroundColor: '#003554',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#C41E3A',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  statsContainer: {
    backgroundColor: '#003554',
    padding: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    width: '90%',
    alignItems: 'center',
    marginBottom: 45,
  },

  statsText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 5,

  },
});