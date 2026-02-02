import { useState } from 'react';
import { 
  Card, CardHeader, CardContent, CardActions, CardMedia, 
  Avatar, Typography, IconButton, Box, Button, Divider, TextField 
} from '@mui/material';
import { FavoriteBorder, Favorite, ChatBubbleOutline, ShareOutlined, Send } from '@mui/icons-material';
import { likePost, commentPost } from '../services/api';

const PostCard = ({ post, currentUser }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser.username));

  const handleLike = async () => {
    try {
      const { data } = await likePost(post._id);
      // Update state from DB response
      setLikes(data.likes);
      setIsLiked(data.likes.includes(currentUser.username));
    } catch (err) {
      console.error('Error liking post:', err);
      alert('Error liking post. Please try again.');
    }
  };

  const handleComment = async (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await commentPost(post._id, commentText);
      setComments(data.comments);
      setCommentText('');
    } catch (err) {
      console.error('Error commenting:', err);
      alert('Error adding comment. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', options)} • ${date.toLocaleTimeString('en-US', timeOptions)}`;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    return `${baseUrl}${imagePath}`;
  };

  return (
    <Card sx={{ mb: 2, border: '1px solid #eee' }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar 
            src={post.userAvatar} 
            sx={{ width: 48, height: 48, border: '1px solid #eee' }}
          >
            {post.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Button 
            variant="contained" 
            size="small" 
            sx={{ 
              bgcolor: '#1976d2', 
              px: 3, 
              py: 0.5,
              fontSize: '0.8rem',
              borderRadius: '20px' 
            }}
          >
            Follow
          </Button>
        }
        title={
          <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
            {post.username}
          </Typography>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary">
              @{post.username.toLowerCase().replace(/\s/g, '')}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#888', mt: 0.5 }}>
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="body1" sx={{ color: '#333', whiteSpace: 'pre-wrap' }}>
          {post.text}
        </Typography>
        {/* Dynamic Hashtag rendering */}
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {post.text.match(/#[a-z0-9_]+/gi)?.map((tag, idx) => (
            <Typography key={idx} sx={{ color: '#1976d2', fontSize: '0.9rem', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              {tag}
            </Typography>
          ))}
          {!post.text.includes('#') && ['#TaskPlanet', '#Social'].map(tag => (
            <Typography key={tag} sx={{ color: '#1976d2', fontSize: '0.9rem', cursor: 'pointer' }}>
              {tag}
            </Typography>
          ))}
        </Box>
      </CardContent>

      {post.image && (
        <CardMedia
          component="img"
          image={getImageUrl(post.image)}
          alt="Post content"
          sx={{ 
            width: '92%', 
            mx: '4%', 
            borderRadius: '12px',
            maxHeight: 400,
            objectFit: 'cover'
          }}
        />
      )}

      <CardActions sx={{ px: 2, py: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleLike} size="small" sx={{ color: isLiked ? '#ff5252' : '#666' }}>
            {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
          <Typography variant="body2" sx={{ ml: 0.5, color: '#666' }}>
            {likes.length}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowComments(!showComments)} size="small" sx={{ color: '#666' }}>
            <ChatBubbleOutline fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 0.5, color: '#666' }}>
            {comments.length}
          </Typography>
        </Box>

        <IconButton size="small" sx={{ color: '#666' }}>
          <ShareOutlined fontSize="small" />
        </IconButton>
      </CardActions>

      {showComments && (
        <>
          <Divider sx={{ mx: 2 }} />
          <CardContent sx={{ pt: 1, bgcolor: '#fafafa' }}>
            {comments.map((comment, index) => (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {comment.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.2 }}>
                  {comment.text}
                </Typography>
              </Box>
            ))}
            
            <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', mt: 2, alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment();
                  }
                }}
                sx={{ 
                  bgcolor: '#fff', 
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    pr: 0.5
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => handleComment()} size="small" color="primary" disabled={!commentText.trim()}>
                      <Send fontSize="small" />
                    </IconButton>
                  )
                }}
              />
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PostCard;
