import { useState } from 'react';
import { 
  Paper, TextField, Button, Box, IconButton, Avatar, 
  Typography, ToggleButton, ToggleButtonGroup, Divider 
} from '@mui/material';
import { 
  PhotoCameraOutlined, InsertEmoticonOutlined, MenuOutlined, 
  CampaignOutlined, Close
} from '@mui/icons-material';

import { createPost } from '../services/api';

const CreatePost = ({ onPostCreated, user }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState('all');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (image) {
        formData.append('image', image);
      }
      
      const { data } = await createPost(formData);
      onPostCreated(data);
      setText('');
      setImage(null);
      setImagePreview('');
    } catch (err) {
      console.error('Error creating post:', err);
      alert(err.response?.data?.message || 'Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }} elevation={0} variant="outlined">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Create Post
        </Typography>
        <ToggleButtonGroup
          value={postType}
          exclusive
          onChange={(e, val) => val && setPostType(val)}
          size="small"
          sx={{ 
            bgcolor: '#f0f2f5', 
            borderRadius: '20px',
            '& .MuiToggleButton-root': {
              borderRadius: '20px',
              border: 'none',
              px: 2,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 500,
              '&.Mui-selected': {
                bgcolor: '#1976d2',
                color: '#fff',
                '&:hover': { bgcolor: '#1565c0' }
              }
            }
          }}
        >
          <ToggleButton value="all">All Posts</ToggleButton>
          <ToggleButton value="promotions">Promotions</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="What's on your mind?"
        variant="standard"
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{ disableUnderline: true, sx: { fontSize: '1rem' } }}
        sx={{ mb: 1 }}
      />
      
      {imagePreview && (
        <Box sx={{ mb: 2, position: 'relative' }}>
          <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
          <IconButton 
            size="small" 
            onClick={() => { setImage(null); setImagePreview(''); }}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}
      
      <Divider sx={{ mb: 1 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton size="small" color="primary" component="span">
              <PhotoCameraOutlined fontSize="small" />
            </IconButton>
          </label>
          <IconButton size="small" color="primary">
            <InsertEmoticonOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <MenuOutlined fontSize="small" />
          </IconButton>
          <Button 
            startIcon={<CampaignOutlined />} 
            size="small" 
            sx={{ color: '#1976d2', textTransform: 'none', fontWeight: 600 }}
          >
            Promote
          </Button>
        </Box>

        <Button 
          variant="contained" 
          size="small" 
          onClick={handleSubmit}
          disabled={loading || (!text && !image)}
          sx={{ 
            bgcolor: '#1976d2', 
            borderRadius: '20px', 
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#1565c0', boxShadow: 'none' }
          }}
        >
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;
