const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get('/users/liked-posts');
        setLikedPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchLikedPosts();
  }, []);

  if (loading) {
    return <div>Loading liked posts...</div>; // Loading state message
  }

  if (!Array.isArray(likedPosts) || likedPosts.length === 0) {
    return (
      <div className={NoContentStyles.container}>
        <h2 className={NoContentStyles.message}>You have not liked any posts yet.</h2>
        <img className={NoContentStyles.logo} src={logo} alt="Logo" />
        <h2 className={NoContentStyles.message}>
          <Link to='/'>Click Here</Link> to discover posts you may like
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className={likeStyles.title}>Liked Posts</h2>
      <Container className={likeStyles.container}>
        <ul className={likeStyles.ul}>
          {likedPosts.map((post) => (
            <li className={likeStyles.container} key={post.id}>
              <div className={likeStyles.post}>
                <h3>
                  <Link className={likeStyles.username} to={`/profile/${post.owner}`}>
                    {post.owner}
                  </Link>
                </h3>
                <img className={likeStyles.img} src={post.image} alt={`Post ${post.id}`} />
                <p className={likeStyles.caption}><b>{post.owner}</b>: {post.caption}</p>
                <div className={likeStyles.interactions}>
                  <LikeButton postId={post.id} currentUser={currentUser} />
                  <Comments postId={post.id} currentUser={currentUser} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
