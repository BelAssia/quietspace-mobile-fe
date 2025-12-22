// ==================== styles/placeDetailsStyles.js ====================
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: '#F5F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#120217',
    marginBottom: 8,
  },
  type: {
    fontSize: 12,
    color: '#5B6FF0',
    fontWeight: '600',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#4b5f83',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#4b5f83',
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    color: '#120217',
    lineHeight: 22,
  },
});