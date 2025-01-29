import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width: screenWidth } = Dimensions.get('window');
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const slides = [
    {
      img: require('@/assets/images/gamma-entrance.jpg'),
      title: 'Our offices',
      description: 'Comprehensive allergy screening with results in 15-20 minutes',
      price: '$75',
    },
    {
      img: require('@/assets/images/gamma.jpg'),
      title: 'For all your Patch Testing',
      description: 'Identify contact allergies with detailed analysis',
      price: '$100',
    },
    {
      img: require('@/assets/images/gl.jpg'),
      title: 'Gamma Labs',
      description: 'Complete respiratory assessment and diagnosis',
      price: '$150',
    },
  ];
  const ServicesCarousel = () => {
    return (
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(newIndex);
          }}
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image 
                source={slide.img} 
                style={styles.slideImage}
              />
              <View style={styles.slideContent}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDescription}>{slide.description}</Text>
                <Text style={styles.slidePrice}>{slide.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? Colors[colorScheme ?? 'light'].tint : '#ccc' }
              ]}
              onPress={() => {
                scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
                setCurrentIndex(index);
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  const WelcomeSection = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        Welcome to Gamma Labs
      </Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        Your Health, Our Priority
      </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <WelcomeSection />
      <ServicesCarousel />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },
  carouselContainer: {
    height: 350, // Increased height to ensure full visibility
    marginVertical: 20,
  },
  slide: {
    width: screenWidth,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  slideContent: {
    padding: 15,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slideDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  slidePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});