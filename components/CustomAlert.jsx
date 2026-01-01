import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomAlert = ({ visible, type = 'info', title, message, onClose, buttons = [] }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return { name: 'checkmark-circle', color: '#10B981' };
      case 'error':
        return { name: 'close-circle', color: '#EF4444' };
      case 'warning':
        return { name: 'warning', color: '#F59E0B' };
      default:
        return { name: 'information-circle', color: '#5B6FF0' };
    }
  };

  const iconConfig = getIconConfig();

  const defaultButtons = buttons.length > 0 ? buttons : [
    {
      text: 'OK',
      onPress: onClose,
      style: 'primary',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={iconConfig.name} size={48} color={iconConfig.color} />
          </View>

          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}

          <View style={styles.buttonsContainer}>
            {defaultButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'secondary' ? styles.secondaryButton : styles.primaryButton,
                  defaultButtons.length > 1 && index === 0 && { marginRight: 8 },
                ]}
                onPress={() => {
                  button.onPress?.();
                  if (!button.preventClose) {
                    onClose();
                  }
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === 'secondary' && styles.secondaryButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#120217',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#4b5f83',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#5B6FF0',
  },
  secondaryButton: {
    backgroundColor: '#F5F7FF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#5B6FF0',
  },
});

export default CustomAlert;