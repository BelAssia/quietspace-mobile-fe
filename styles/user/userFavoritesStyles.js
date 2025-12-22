// ==================== styles/userFavoritesStyles.js ====================
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
  favoriteCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#120217',
  },
  cardType: {
    fontSize: 11,
    color: '#5B6FF0',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 13,
    color: '#4b5f83',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardScore: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  cardDistance: {
    fontSize: 13,
    color: '#4b5f83',
  },
});
