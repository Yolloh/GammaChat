import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the Bill type
type Bill = {
  id: number;
  serviceName: string;
  date: string;
  basePrice: number;
  totalCharge: number;
};
export default function BillsScreen() {
  const colorScheme = useColorScheme();
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const storedBills = await AsyncStorage.getItem('bills');
      if (storedBills) {
        setBills(JSON.parse(storedBills));
      }
    } catch (error) {
      console.error('Error loading bills:', error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      const updatedBills = bills.filter((bill) => bill.id !== id);
      await AsyncStorage.setItem('bills', JSON.stringify(updatedBills));
      setBills(updatedBills);
    } catch (error) {
      console.error('Error removing bill:', error);
    }
  };

  const proceedToCheckout = async () => {
    const total = bills.reduce((sum, bill) => sum + bill.totalCharge, 0);

    const paymentData = {
      amount: total,
      reference: `GAMMA-${Date.now()}`,
      returnUrl: 'your-app-scheme://payment-complete',
      resultUrl: 'your-backend-url/payment-callback',
      authemail: 'customer@email.com',
      status: 'Message'
    };

    try {
      const response = await fetch('https://www.paynow.co.zw/interface/initiatetransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Success', 'Payment initiated successfully');
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment initiation failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Your Bills
        </Text>
      </View>

      {bills.map((bill) => (
        <View key={bill.id} style={styles.billCard}>
          <View style={styles.billInfo}>
            <Text style={styles.serviceName}>{bill.serviceName}</Text>
            <Text style={styles.dateText}>
              {new Date(bill.date).toLocaleDateString()}
            </Text>
            <Text style={styles.priceText}>
              Service: ${bill.basePrice}
            </Text>
            <Text style={styles.priceText}>
              Appointment: $20
            </Text>
            <Text style={styles.totalText}>
              Total: ${bill.totalCharge}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(bill.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      {bills.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={proceedToCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout (${bills.reduce((sum, bill) => sum + bill.totalCharge, 0)})
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  billCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  billInfo: {
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    color: Colors.light.icon,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: Colors.light.tint,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});