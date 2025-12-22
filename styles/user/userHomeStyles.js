import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#4b5f83',
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FF',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#120217',
  },
  filters: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F7FF',
    marginRight: 8,
    gap: 6,
  },
  filterActive: {
    backgroundColor: '#5B6FF020',
  },
  filterText: {
    fontSize: 14,
    color: '#4b5f83',
    fontWeight: '500',
  },
  filterTextActive: {
    fontSize: 14,
    color: '#5B6FF0',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#120217',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  placeCard: {
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
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#120217',
  },
  placeType: {
    fontSize: 11,
    color: '#5B6FF0',
    fontWeight: '600',
    marginBottom: 8,
  },
  placeAddress: {
    fontSize: 13,
    color: '#4b5f83',
    marginBottom: 12,
  },
  placeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#4b5f83',
    marginLeft: 2,
  },
  distance: {
    fontSize: 13,
    color: '#4b5f83',
    fontWeight: '500',
  },
});
