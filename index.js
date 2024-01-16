// // const express = require ("express")
// // const app = express()
// // const PORT = 8000


// // app.get("/", (req,res) =>{
// //     res.send("Work in progress");
// // })

// // const users = require("./data/users");
// // const posts = require("./data/posts");


// // app.use(express.urlencoded({extended:true}))
// // app.use(express.json({extended:true}))


// // //Read all users
// // app.get('/api/users', (req,res) =>{
// //     res.json(users);
// // })

// // //Read one user

// // app.get('/api/users/:id', (req,res,next) =>{
// //     const user = users.find((u)=> u.id == req.params.id);
// //     if (user) {
// //         res.json(user);
// //     }else{
// //     next();

// //     }
// // });

// // app.get('/api/posts', (req,res) => {
// //     res.json(posts);
// // })

// // app.use((req, res, next) =>{
// //     res.send(404).json({ error: 'Resource not Found'});

// // });
// // app.listen(PORT, ()=> {
// //     console.log(`Server is running on PORT : ${PORT}`)
// // })


// const express = require('express');
// const app = express();
// const PORT = 8000;

// //Importing the data from our fake database file
// // The require function will go and fetch the module.exports of whatever file you put in the argument
// const users = require('./data/users');
// const posts = require('./data/posts');

// // Body-parser middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));

// // Logger Middleware
// // New logging middleware to help us keep track of
// // requests during testing!
// app.use((req, res, next) => {
//   const time = new Date();

//   console.log(
//     `-----
// ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
//   );
//   if (Object.keys(req.body).length > 0) {
//     console.log('Containing the data:');
//     console.log(`${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// app
//   .route('/api/users')
//   // Read All Users
//   // Creating a GET route for the entire users database.
//   // This would be impractical in larger data sets.
//   .get((req, res) => {
//     res.json(users);
//   })
//   .post((req, res) => {
//     // Within the POST request route, we create a new
//     // user with the data given by the client.
//     // We should also do some more robust validation here,
//     // but this is just an example for now.
//     if (req.body.name && req.body.username && req.body.email) {
//       if (users.find((u) => u.username == req.body.username)) {
//         res.json({ error: 'Username Already Taken' });
//         return;
//       }

//       // Creating the new user object
//       const user = {
//         id: users[users.length - 1].id + 1,
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//       };

//       // Adding the new user to the fake database
//       users.push(user);
//       // Sending the client the newly created user
//       res.json(users[users.length - 1]);
//     } else res.json({ error: 'Insufficient Data' });
//   });

// app
//   .route('/api/users/:id')
//   // Read One User
//   // Creating a simple GET route for individual users,
//   // using a route parameter for the unique id.
//   .get((req, res, next) => {
//     const user = users.find((u) => u.id == req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       next();
//     }
//   })
//   .patch((req, res, next) => {
//     // Within the PATCH request route, we allow the client
//     // to make changes to an existing user in the database.
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         for (const key in req.body) {
//           // req.body[key] is the value that we want to update too
//           // users[i][key] is the old value in our database that we are reassigning
//           users[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   })
//   .delete((req, res, next) => {
//     // The DELETE request route simply removes a resource.
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         users.splice(i, 1);
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   });

// // Read All Posts
// // Creating a GET route for the entire posts database.
// // This would be impractical in larger data sets.
// app
//   .route('/api/posts')
//   .get((req, res) => {
//     res.json(posts);
//   })
//   .post((req, res) => {
//     // Within the POST request route, we create a new
//     // post with the data given by the client.
//     if (req.body.userId && req.body.title && req.body.content) {
//       const post = {
//         id: posts[posts.length - 1].id + 1,
//         userId: req.body.userId,
//         title: req.body.title,
//         content: req.body.content,
//       };

//       posts.push(post);
//       res.json(posts[posts.length - 1]);
//     } else res.json({ error: 'Insufficient Data' });
//   });

// app
//   .route('/api/posts/:id')
//   .get((req, res, next) => {
//     const post = posts.find((p) => p.id == req.params.id);
//     if (post) res.json(post);
//     else next();
//   })
//   .patch((req, res, next) => {
//     // Within the PATCH request route, we allow the client
//     // to make changes to an existing post in the database.
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         for (const key in req.body) {
//           posts[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   })
//   .delete((req, res, next) => {
//     // The DELETE request route simply removes a resource.
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         posts.splice(i, 1);
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   });

// app.get('/', (req, res) => {
//   res.send('Work in progress...');
// });

// // Custom 404 (not found) middleware.
// // Since we place this last, it will only process
// // if no other routes have already sent a response!
// // We also don't need next(), since this is the
// // last stop along the request-response cycle.
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Resource Not Found' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });


//// Above code is learning from Joshua


/// Below code is for Assignment


const express = require('express');
const app = express();
const PORT = 3001;

// Existing routes...

// Additional route: GET /api/users/:id/posts
app.get('/api/users/:id/posts', (req, res) => {
  const userId = req.params.id;

  // Assuming you have some data structure to store posts, replace this with your actual data retrieval logic.
  const userPosts = posts.filter(post => post.userId === userId);

  res.json(userPosts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 2nd

// Additional route: GET /api/posts?userId=<VALUE>
app.get('/api/posts', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId parameter is required' });
  }

  // Assuming you have some data structure to store posts, replace this with your actual data retrieval logic.
  const userPosts = posts.filter(post => post.userId === userId);

  res.json(userPosts);
});

// 3rd

// Placeholder arrays for data
const users = [];
const posts = [];
const comments = []; // Add this line for comments

// Existing routes...

// Additional route: GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});



//4th

// Additional route: POST /comments
app.post('/comments', express.json(), (req, res) => {
  const { userId, postId, body } = req.body;

  if (!userId || !postId || !body) {
    return res.status(400).json({ error: 'userId, postId, and body are required fields' });
  }

  // Generate a unique identifier for the comment
  const commentId = Math.random().toString(36).substring(7);

  // Create a new comment object
  const newComment = {
    id: commentId,
    userId,
    postId,
    body,
  };

  // Assuming you have an array to store comments, replace this with your actual data storage logic.
  comments.push(newComment);

  res.status(201).json(newComment);
});


// Additional route: GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const commentId = req.params.id;

  // Find the comment with the specified id
  const comment = comments.find(comment => comment.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.json(comment);
});


//6

// Additional route: PATCH /comments/:id
app.patch('/comments/:id', express.json(), (req, res) => {
  const commentId = req.params.id;
  const updatedBody = req.body.body;

  // Find the index of the comment with the specified id
  const commentIndex = comments.findIndex(comment => comment.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Update the comment's body
  comments[commentIndex].body = updatedBody;

  res.json(comments[commentIndex]);
});


//7

// Additional route: DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const commentId = req.params.id;

  // Find the index of the comment with the specified id
  const commentIndex = comments.findIndex(comment => comment.id === commentId);

  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Remove the comment from the array
  const deletedComment = comments.splice(commentIndex, 1)[0];

  res.json(deletedComment);
});


//8

// Additional route: GET /comments?userId=<VALUE>
app.get('/comments', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId parameter is required' });
  }

  // Filter comments by the user with the specified userId
  const userComments = comments.filter(comment => comment.userId === userId);

  res.json(userComments);
});

//9

// Additional route: GET /comments?postId=<VALUE>
app.get('/comments', (req, res) => {
  const postId = req.query.postId;

  if (!postId) {
    return res.status(400).json({ error: 'postId parameter is required' });
  }

  // Filter comments made on the post with the specified postId
  const postComments = comments.filter(comment => comment.postId === postId);

  res.json(postComments);
});

//10

// Additional route: GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;

  // Filter comments made on the post with the specified postId
  const postComments = comments.filter(comment => comment.postId === postId);

  res.json(postComments);
});

//11

// Additional route: GET /users/:id/comments
app.get('/users/:id/comments', (req, res) => {
  const userId = req.params.id;

  // Filter comments made by the user with the specified userId
  const userComments = comments.filter(comment => comment.userId === userId);

  res.json(userComments);
});


//12

// Additional route: GET /posts/:id/comments?userId=<VALUE>
app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'userId parameter is required' });
  }

  // Filter comments made on the post with the specified postId by a user with the specified userId
  const postCommentsByUser = comments.filter(comment => comment.postId === postId && comment.userId === userId);

  res.json(postCommentsByUser);
});

//13

// Additional route: GET /users/:id/comments?postId=<VALUE>
app.get('/users/:id/comments', (req, res) => {
  const userId = req.params.id;
  const postId = req.query.postId;

  if (!postId) {
    return res.status(400).json({ error: 'postId parameter is required' });
  }

  // Filter comments made by the user with the specified userId on the post with the specified postId
  const userCommentsOnPost = comments.filter(comment => comment.userId === userId && comment.postId === postId);

  res.json(userCommentsOnPost);
});
