import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useState, useRef } from 'react'

const { width, height } = Dimensions.get('window');

const data = [
    {
      image: require('../images/group.png'),
      title: 'Welcome to Fidsor',
      text: 'Empowering Your Digital Journey, From web and mobile app development to design and automation, we build powerful solutions that elevate your business.',
      bg: 'white',
    },
    {
      image: require('../images/screen2.png'),
      title: 'Smart Solutions, \nSeamless Experience',
      text: 'Our team delivers user-focused products,\n combining technology and creativity to \nsolve real-world problems effectively.',
      bg: 'white',
    },
    {
      image: require('../images/screen3.png'),
      title: 'Your Vision, Our \nExpertise',
      text: "Partner with a team that turns ideas into \nreality—faster, smarter, and with the \nquality your brand deserves.",
      bg: 'white',
    },
];

const Onboard = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Smooth transition animation
  const animateTransition = (direction) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? -50 : 50,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset animations
      slideAnim.setValue(0);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      animateTransition('next');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    } else {
      onComplete();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      animateTransition('prev');
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 150);
    }
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      const direction = index > currentIndex ? 'next' : 'prev';
      animateTransition(direction);
      setTimeout(() => {
        setCurrentIndex(index);
      }, 150);
    }
  };

  const renderItem = ({item, index}) => {
    return(
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <Image 
          style={styles.mainImage} 
          source={item.image}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>
          {item.title}
        </Text>
        <Text style={styles.descriptionText}>
          {item.text}
        </Text>
      </Animated.View>
    )
  }

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.disabledButton
          ]}
          onPress={goToPrev}
          disabled={currentIndex === 0}
        >
          <Image 
            source={require('../images/rightbtn.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToNext}
        >
          <Image 
            source={require('../images/leftbtn.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="black" barStyle="light-content" />
      
      {/* Black border around entire screen */}
      <View style={styles.blackBorder}>
        {/* Main content area with white background */}
        <View style={styles.contentArea}>
          {renderItem({item: data[currentIndex], index: currentIndex})}
        </View>

        {/* Bottom navigation bar - no black background */}
        <View style={styles.bottomNavigationBar}>
          {/* Dots */}
          {renderDots()}
          
          {/* Navigation Buttons */}
          {renderNavigationButtons()}
          
          {/* Skip Button */}
          {renderSkipButton()}
        </View>
      </View>
    </View>
  )
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  blackBorder: {
    flex: 1,
    margin: 2, // Creates black border effect
    backgroundColor: 'white',
    borderRadius: 0,
    overflow: 'hidden',
  },
  contentArea: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Account for status bar
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 32,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat',
    color: '#030303',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  bottomNavigationBar: {
    backgroundColor: 'transparent', // No black background
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
    minHeight: 200,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 7,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  inactiveDot: {
    backgroundColor: '#007AFF',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
  },
  arrowIcon: {
    width: 54,
    height: 54,
    // Removed tintColor to show original image colors
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
};

export default Onboard