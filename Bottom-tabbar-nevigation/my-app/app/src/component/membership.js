import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import ProgressButton from '../component/progressbtn'
import TierCard from '../component/TierCard';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const data = [
    {
      logo: require('../images/sana.png'),
      title: 'Become  SANA’s \n Community Silver Member',
      text: 'Join the Sindhi community across North America. Access events, scholarships, \nnetworking, and more.',
      price: '$40',
      features: [
        'Access to general news and community updates',
        'Browse upcoming public events',
        'View business and job listings (read-only)',
        'Limited access to SANA’s language and cultural resources',
        'View Goods from Marketplace'
      ],
      route:'/pricing/silver'
    },
    {
      logo: require('../images/sana.png'),
      title: 'Become  SANA’s \n Community Gold Member',
      text: 'Join the Sindhi community across North America. Access events, scholarships, \nnetworking, and more.',
      price: '$80',
      features: [
        'Register Your Business in SANA’s Online',
        'Exclusive SANA’s Convention Member',
        'Unlimited Business register and buying from market place',
        'Invitation to exclusive SANA matrimonial events',
        'Priority customer support',
      ],
      colors:{cardBg : '#ECC14E'},
      route:'/pricing/gold'
    },
    {
      logo: require('../images/sana.png'),
      title: 'Become  SANA’s \n Community Platinum Member',
      text: 'Join the Sindhi community across North America. Access events, scholarships, \nnetworking, and more.',
      price: '$120',
      features: [
        'Access to member-exclusive events and webinars',
        "Exclusive SANA’s Convention Member",
        'Unlimited Business register and buying from market place',
        'Invitation to exclusive SANA matrimonial events',
        'Priority customer support',
      ],
      colors:{cardBg : '#D9D9D9' ,headerText : 'black' , priceText : 'black'}
     , route:'/pricing/platinum'
    }
];

const Membership = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter()

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
          source={item.logo}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>
          {item.title}
        </Text>
        <Text style={styles.descriptionText}>
          {item.text}
        </Text>
        <TierCard
         title={item.title.includes('Silver') ? 'Silver' : item.title.includes('Gold') ? 'Gold' : 'Platinum'}
         subtitle={"Premium Experience for Sindhi\nConnections"}
         price={item.price}
         features={item.features}
         colors={item.colors}
         route={item.route}
         onPress={() => {
           if (onComplete) {
             onComplete();
           }
           setTimeout(() => {
             router.push(item.route);
           }, 50);
         }}
        />
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

  const profress =(currentIndex+1)/data.length

    return (
      <View style={styles.navigationContainer}>
        <ProgressButton
        progress={profress}
        onPress={goToPrev}
        disabled={currentIndex === 0}>
          <Image 
            source={require('../images/rightbtn.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </ProgressButton>
        <ProgressButton
        progress={profress}
        onPress={goToNext}
        disabled={currentIndex === data.length-1}>
          <Image 
            source={require('../images/leftbtn.png')} 
            style={styles.arrowIcon} 
            resizeMode="contain"
          />
        </ProgressButton>
      </View>
    );
  };


  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="black" barStyle="light-content" />
      
      <View style={styles.blackBorder}>
        <View style={styles.contentArea}>
          {renderItem({item: data[currentIndex], index: currentIndex})}
        </View>

        <View style={styles.bottomNavigationBar}>
     
          {renderDots()}
          
        
          {renderNavigationButtons()}
          
      
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
    width: width * 0.2,
    height: height * 0.3,
    marginBottom: -60,
    marginTop:-400
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#000000',
    marginBottom: 5,
    marginTop: -20,
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
    marginBottom:15
  },
  bottomNavigationBar: {
    backgroundColor: 'transparent', // No black background
    paddingTop: 80,
    paddingBottom: -5,
    paddingHorizontal: 20,
    minHeight: 200,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 7,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'red',
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  inactiveDot: {
    backgroundColor: 'red',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -20,
    paddingHorizontal: 20,
  },
  
  arrowIcon: {
    width: 60,
    height: 65,
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

export default Membership