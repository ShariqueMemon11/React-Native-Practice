import React, { useEffect, useState } from 'react'
import { Modal, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

const NotificationHistoryModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (e) {
        Alert.alert('Error', 'Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }
    if (visible) load()
  }, [visible])

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.4)', justifyContent:'center', padding:20 }}>
        <View style={{ backgroundColor:'white', borderRadius:16, maxHeight:'80%', padding:16 }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <Text style={{ fontSize:18, fontWeight:'600' }}>Notification History</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color:'#2f7acf', fontWeight:'600' }}>Close</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height:8 }} />}
              renderItem={({ item }) => (
                <View style={{ padding:12, borderRadius:10, backgroundColor:item.read ?'#f5faff' :'#c2d6eb'}}>
                  <Text style={{ fontWeight:'600', marginBottom:4 }}>{'Thank You! '+item.title || 'No title'}</Text>
                  <Text style={{ color:'#444' }}>{'Your request has been recived'}</Text>
                  <Text style={{ color:'#444' }}>{'Issue: '+item.body || 'No message'}</Text>
                  <Text style={{ color:'#888', fontSize:12 }}>
                    {item.createdAt && item.createdAt.toDate ? item.createdAt.toDate().toLocaleString() : 'No date'}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

export default NotificationHistoryModal