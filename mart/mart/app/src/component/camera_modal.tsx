import React, { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

type CameraModalProps = {
  visible: boolean;
  onClose: () => void;
  onScan?: (payload: string) => void;
};

const CameraModal = ({ visible, onClose, onScan }: CameraModalProps) => {
  const [permission, requestPermission] = useCameraPermissions();

  const handleRequestPermission = useCallback(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      onScan?.(data);
      onClose();
    },
    [onClose, onScan],
  );

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        {permission?.granted ? (
          <>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={handleBarcodeScanned}
            />
            <View style={styles.dimLayer} />
            <View style={styles.topBar}>
              <Pressable style={styles.backButton} onPress={onClose}>
                <Ionicons name="arrow-back" size={22} color="#000" />
              </Pressable>
            </View>
            <View style={styles.scanArea}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />
              </View>
              <Text style={styles.scanTitle}>Scan Najeeb Mart QR Code</Text>
            </View>
            <Text style={styles.scanDescription}>
              Scan najeeb mart QR code to get 10% discount on medicine from najeeb pharmacy
            </Text>
          </>
        ) : (
          <View style={styles.permissionWrapper}>
            <Text style={styles.permissionText}>Camera access is required to scan QR codes.</Text>
            <Pressable style={styles.permissionButton} onPress={handleRequestPermission}>
              <Text style={styles.permissionButtonText}>Allow Camera</Text>
            </Pressable>
            <Pressable style={[styles.permissionButton, styles.permissionCancel]} onPress={onClose}>
              <Text style={styles.permissionCancelText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 260,
    height: 260,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: '#fff',
  },
  cornerTopLeft: {
    top: -4,
    left: -4,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  cornerTopRight: {
    top: -4,
    right: -4,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  cornerBottomLeft: {
    bottom: -4,
    left: -4,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  cornerBottomRight: {
    bottom: -4,
    right: -4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  scanTitle: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  scanDescription: {
    position: 'absolute',
    bottom: 80,
    paddingHorizontal: 32,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  permissionWrapper: {
    width: '85%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#111',
  },
  permissionButton: {
    backgroundColor: '#0a84ff',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    marginTop: 8,
  },
  permissionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  permissionCancel: {
    backgroundColor: '#f2f2f2',
  },
  permissionCancelText: {
    color: '#111',
    textAlign: 'center',
    fontWeight: '600',
  },
});