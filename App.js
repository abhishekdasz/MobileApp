import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100'); // Replace with your actual API endpoint
      const result = await response.json();
      setData(result.object || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <ScrollView>
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.mediaUrl }} style={styles.image} />
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>Price: ₹{item.variants[0].sellingPrice}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 16,
    marginTop: 8,
  },
});
