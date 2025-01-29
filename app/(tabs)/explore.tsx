import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppointments } from '@/context/AppointmentContext';

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const services: Service[] = [
  { id: 1, title: 'Patch Test', description: 'Identify contact allergies', price: 75 },
  { id: 2, title: 'Medical Drug Allergy Test', description: 'Screen for drug allergies', price: 100 },
  { id: 3, title: 'Autoimmune Screen', description: 'Comprehensive autoimmune testing', price: 150 },
];

const ServiceCard: React.FC<{
  service: Service;
  onBook: () => void;
}> = ({ service, onBook }) => {
  return (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>
      <Text style={styles.servicePrice}>${service.price}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={onBook}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const { addAppointment } = useAppointments();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [date, setDate] = useState(new Date());

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && selectedService) {
      setDate(selectedDate);
      bookAppointment(selectedService, selectedDate);
    }
  };
  const bookAppointment = (service: Service, date: Date) => {
    const appointmentCharge = 20;
    const totalCharge = service.price + appointmentCharge;

    const newAppointment = {
      id: Date.now(),
      service: service.title,
      date: date.toISOString(),
      price: totalCharge,
      type: 'appointment' as const
    };

    addAppointment(newAppointment);

    Alert.alert(
      "Appointment Booked",
      `Service: ${service.title}\nDate: ${date.toLocaleDateString()}\nPrice: $${totalCharge}`,
      [{ text: "OK" }]
    );
  };

  const handleBookPress = (service: Service) => {
    setSelectedService(service);
    setShowDatePicker(true);
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {services.map((service) => (
        <ServiceCard 
          key={service.id}
          service={service}
          onBook={() => handleBookPress(service)}
        />
      ))}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});