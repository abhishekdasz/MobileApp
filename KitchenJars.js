// KitchenJarsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const KitchenJarsScreen = () => {
  const [data, setData] = useState([]);

  // Assume you have a function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100'); // Replace with your actual API endpoint
      const result = await response.json();

      // Assuming the API response has a structure similar to the provided data
      setData(result.object || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.mediaUrl }} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Price: ${item.variants[0].sellingPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // Add additional FlatList props like onEndReached for pagination
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop:300,
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

export default KitchenJarsScreen;
