import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#120217',
  },
  subtitle: {
    fontSize: 14,
    color: '#5B6FF0',
    marginTop: 4,
    fontWeight: '600',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#120217',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: '#4b5f83',
    lineHeight: 20,
    marginBottom: 8,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#999',
  },
});
