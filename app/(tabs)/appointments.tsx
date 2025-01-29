import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppointments } from '@/context/AppointmentContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AppointmentsScreen() {
  const colorScheme = useColorScheme();
  const { appointments } = useAppointments();

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Your Appointments</Text>
      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.appointmentCard}>
          <Text style={styles.appointmentService}>{appointment.service}</Text>
          <Text style={styles.appointmentDate}>
            Date: {new Date(appointment.date).toLocaleDateString()}
          </Text>
          <Text style={styles.appointmentPrice}>Price: ${appointment.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentService: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appointmentDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  appointmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
