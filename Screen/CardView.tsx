import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardViewProps {
  item: {
    image: any; // This can be a require image or a URL
    title: string;
    description: string;
    status: string;
    statusColor: string; // Color for the availability circle
  };
}

const CardView: React.FC<CardViewProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Handling local image and remote URL */}
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.statusContainer}>
        <View style={[styles.statusCircle, { backgroundColor: item.statusColor }]} />
        <Text style={[styles.status, { color: item.statusColor }]}>{item.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    width: 400,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width:365,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6, // To make it a circle
  },
  status: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default CardView;









