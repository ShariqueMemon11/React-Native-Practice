import { View, Text, ImageBackground, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GiftedChat, IMessage, Bubble, InputToolbar, Composer, Send } from 'react-native-gifted-chat';
import axios from 'axios';
import Constants from 'expo-constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const Chatbot = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const insets = useSafeAreaInsets();

  const gptapikey = (Constants.expoConfig?.extra as any)?.OPENAI_API_KEY as string | undefined;

  const handleSend = async (newMessages: IMessage[] = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
      const messageText = userMessage.text;
      setIsTyping(true);

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'anthropic/claude-3-haiku',
          messages: [{ role: 'user', content: messageText }],
        },
        {
          headers: {
            Authorization: `Bearer ${gptapikey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = response.data.choices[0].message.content.trim();

      const botMessage: IMessage = {
        _id: new Date().getTime() + 1,
        text: reply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'SupportBot',
          avatar: require('../images/bot.png')
        },
      };

      setMessages(prevMessage => GiftedChat.append(prevMessage, [botMessage]));
    } catch (error: any) {
      console.log('Chatbot error', error?.response?.data || error.message);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop:33}} edges={[ 'bottom']}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#f5f5f5',
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ paddingVertical:0 , marginTop: 12 , marginBottom:-26 , marginRight:330}}>
           <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Chatbot</Text>
      </View>

      <ImageBackground
        source={require('../images/background.jpg')} // 👈 put your image in assets folder
        style={{ flex: 1 }}
        resizeMode='repeat'
      >
      {/* Chat UI */}
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
        isTyping={isTyping}
        bottomOffset={insets.bottom - 12}
        minComposerHeight={44}
        maxComposerHeight={120} // ✅ Expands roughly up to 5 lines
        minInputToolbarHeight={56}
        alwaysShowSend
        listViewProps={{
          contentContainerStyle: { paddingTop: 8 },
          keyboardShouldPersistTaps: 'handled',
        }}
        renderAvatar={(props) => {
          const raw: any = props.currentMessage?.user?.avatar;
          const source: ImageSourcePropType | undefined =
            typeof raw === 'string' ? { uri: raw } : (raw as ImageSourcePropType | undefined);
          return (
            <Image
              source={source}
              style={{
                width: 36,
                height: 36,
                borderRadius: 20, // circle
                marginRight: 5,
              }}
            />
          );
        }}
        renderBubble={props => {
          const { key, ...bubbleProps } = props as any;
          return (
          <Bubble
            {...bubbleProps}
            wrapperStyle={{
              left: {
                backgroundColor: '#e4e6eb',
                borderRadius: 20,
                padding: 5,
              },
              right: {
                backgroundColor: '#007AFF',
                borderRadius: 20,
                padding: 5,
              },
            }}
            textStyle={{
              right: { color: '#fff' },
            }}
          />
          );
        }}
        renderInputToolbar={props => {
            const { key, ...toolbarProps } = props as any;
            return (
          <InputToolbar
            {...toolbarProps}
            containerStyle={{
              borderTopWidth: 0,
              padding: 6,
              backgroundColor: '#fff', // ✅ Match chat background
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
            renderComposer={composerProps => {
              const { key: _composerKey, ...composerRest } = composerProps as any;
              return (
              <Composer
                {...composerRest}
                textInputStyle={{
                  backgroundColor: '#f2f2f2', // ✅ Make input background white
                  borderRadius: 25,
                  paddingHorizontal: 12,
                  paddingTop: 15,
                  marginRight: 1,
                  fontSize: 16,
                  maxHeight: 120,
                }}
                textInputProps={{
                  multiline: true,
                  blurOnSubmit: false,
                  // ✅ Prevent it from growing too tall
                }}
                placeholder="Type a message..."
              />
              );
            }}
            renderSend={sendProps => {
              const { key: _sendKey, ...sendRest } = sendProps as any;
              return (
              <Send {...sendRest}>
                <View
                  style={{
                    backgroundColor: '#007AFF',
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 2,
                  }}
                >
                  <Ionicons name="send" size={20} color="#fff" />
                </View>
              </Send>
              );
            }}
          />
            );
        }}
      />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Chatbot;
