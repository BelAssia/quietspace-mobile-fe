import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#120217',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  lieuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  lieuNom: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#120217',
    marginLeft: 12,
  },
  existingNoteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EBFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  existingNoteText: {
    fontSize: 14,
    color: '#5B6FF0',
    marginLeft: 8,
    fontWeight: '500',
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  starButton: {
    padding: 8,
  },
  motivationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    minHeight: 32,
  },
  motivationText: {
    fontSize: 18,
    color: '#BDBDBD',
    fontWeight: '500',
  },
  motivationTextActive: {
    color: '#FFC107',
    fontWeight: '600',
  },
  selectedNoteContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F7FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  selectedNoteLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  selectedNoteValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5B6FF0',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B6FF0',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 'auto',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  submitButtonLoading: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});