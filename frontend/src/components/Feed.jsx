import { useState, useEffect } from 'react';
import { 
  Container, Box, CircularProgress, Typography, 
  Paper, InputBase, IconButton, Avatar, Tabs, Tab, Fab
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { fetchPosts } from '../services/api';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const getPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.username?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 1) return matchesSearch; // Most Liked logic can be sorting instead
    if (filter === 2) return matchesSearch; // Most Commented
    return matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (filter === 1) return b.likes.length - a.likes.length;
    if (filter === 2) return b.comments.length - a.comments.length;
    if (filter === 3) return new Date(b.createdAt) - new Date(a.createdAt);
    return 0; // Default (Recent from API)
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2, position: 'relative' }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Paper
          elevation={0}
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1, 
            bgcolor: '#f0f2f5',
            borderRadius: '25px',
            border: '1px solid #eee'
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, fontSize: '0.9rem' }}
            placeholder="Search promotions, users,"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton sx={{ p: '8px', color: '#fff', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, m: 0.5 }}>
            <Search fontSize="small" />
          </IconButton>
        </Paper>
        <Avatar 
          src={user?.avatar} 
          sx={{ width: 40, height: 40, border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
        />
      </Box>

      {/* Create Post Section */}
      <CreatePost onPostCreated={handlePostCreated} user={user} />

      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, overflowX: 'auto' }}>
        <Tabs 
          value={filter} 
          onChange={(e, val) => setFilter(val)} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 'auto',
              px: 2,
              mx: 0.5,
              borderRadius: '20px',
              border: '1px solid #eee',
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#1976d2',
                color: '#fff',
                border: 'none'
              }
            },
            '& .MuiTabs-indicator': { display: 'none' }
          }}
        >
          <Tab label="All Post" />
          <Tab label="Most Liked" />
          <Tab label="Most Commented" />
          <Tab label="Recent" />
        </Tabs>
      </Box>

      {/* Posts List */}
      {sortedPosts.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          {searchQuery ? "No results found for your search." : "No posts yet. Be the first to post!"}
        </Typography>
      ) : (
        sortedPosts.map((post) => (
          <PostCard key={post._id} post={post} currentUser={user} />
        ))
      )}

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ 
          position: 'fixed', 
          bottom: 80, 
          right: 16, 
          bgcolor: '#1976d2',
          zIndex: 1000 
        }}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default Feed;
