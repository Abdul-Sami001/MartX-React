import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useSearchStore from '../stores/useSearchStore'; // Import the search store
import { useNavigate } from 'react-router-dom'; 
const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const { fetchSearchResults, setQuery } = useSearchStore();
    const navigate = useNavigate();
    const handleSearch = () => {
        if (searchInput.trim()) {
            setQuery(searchInput);  // Set the search query in Zustand store
            fetchSearchResults(searchInput);  // Trigger search results
            navigate('/products');
        }
    };

    return (
        <Box maxW="400px" mx="auto">
            <InputGroup>
                <Input
                    placeholder="Search for products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <InputRightElement width="4.5rem">
                    <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleSearch}
                        bg={'#F47D31'}
                        color="white"
                        _hover={{ bg: '#0A0E27' }}
                    >
                        <SearchIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

export default SearchBar;
