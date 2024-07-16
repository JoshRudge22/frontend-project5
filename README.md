<h1>Quick Pics</h1>
<p>Quick pics is a social media app where users can post pictures, like posts that they find interesting, comment to give their opinion on someone’s post and also follow other user.</p>
<p>You can view the app by clicking here https://frontend-project5-8507d8b525c6.herokuapp.com/</p>
<h2>Front End</h2>
<h3>Data Model</h3>
<p>Here is a flowchart that help me create the app</p>

![Flow Chart](https://github.com/user-attachments/assets/7cee5a6e-4c81-4a4d-aac5-e50adefc9214)

<p>The flow chart shows all the pages in the app and what some of them do when they are clicked on. I highlighted them in different colours to explain how they are accessible starting with Yellow, these only appear in the page when the user is not logged in. For Blue these pages are available when the user has either signed up or logged in. The Green are available regardless of if the user has logged in or not and lastly the red is for when the user has type in a page in the url that doesn't exist.</p>
<p>The Arrows then show where the pages will take the user. They start off with the Discover Feed whenever they enter the app/site, when the user either logs in or signs up they are then taken to their own profile page. Next we have is the Contact Form once the user has submitted the form they will be directed to the form submitted page. If the user was to use the search bar they will be taken to any other users page where they can see that users profile and another page to see their posts. When the user either signs out or deletes their account they get redirected to the Sign In Page.</p>

<h3>Design</h3>
<h4>Font</h4>
<p>For the font I used Google Fonts Oswald with sans-serif as a backup should Oswald not load, this was used for the titles of the page</p>

![Google Font](https://github.com/user-attachments/assets/b87e3b77-1846-407b-bb87-0ef0feba178a)

<h4>Colours</h4>
<p>For my background colours I have used css colours #A9C9FF #646363 with the background colour style being <b>background: linear-gradient(to bottom right</b></p>

![background style](https://github.com/user-attachments/assets/b2dc065f-e790-4e0f-a145-63c65e6adaa5)

![A9C9FF](https://github.com/user-attachments/assets/9eaa8bdf-9ef4-454b-9a7b-19e815f915b7)

![646363](https://github.com/user-attachments/assets/291696f7-bf01-42a4-af41-c58b413bc4cf)

<h4>Logo</h4>
<p>I created my logo by using shopifys logo creator which is used for my favicon.</p>

![facebook_profile_image](https://github.com/user-attachments/assets/408cad02-7e19-4835-89de-8a4c5cf0ad48)

<h4>Site Structure</h4>
<p>Quick Pics gets split into two parts depending on if the user is logged in or not. First part is when the user is not logged in the user can only see the discover feed but does not have access to create a comment or like the post. The user can only see the Discover Feed, Sign In, Sign Out and Contact Form. For when the user is logged in the user then has access to both feeds, their own profile, posts, comments and likes list page, followers and following page and a delete account and sign out.</p>

<h5>Logged In</h5>

![Navbar - Signed in](https://github.com/user-attachments/assets/c53471d7-e800-468d-8af9-4bfe7b581965)

<h5>Signed Out</h5>

![Navbar - Signed out](https://github.com/user-attachments/assets/80313ac9-fc60-458b-9497-eee5ea8099f9)

<h4>Pages</h4>
<ul>
<li><h4>Discover Feed</h4></li>
<p>Here is my Discover Feed this is the home page of the app. This is where the user is able to see all the other users posts. I used the InfiniteScroll to show 5 posts at a time. When the user has viewed all the posts in that feed a message will show at the bottom of the page saying "No more posts". If the user would like to leave a comment or a like they would need to log in until then they are provided with a message asking them to log in. The Following Feed is pretty much the same however it only shows posts that the current user is following, the user can not get access the page unless they sign in.</p>

![Discover Feed](https://github.com/user-attachments/assets/48fd25ab-9521-4a03-97fd-3514f40c1f75)

![Discover Feed - logged out](https://github.com/user-attachments/assets/7f830b2d-12ef-442f-84ff-91e1a3603e6e)


![feed page](https://github.com/user-attachments/assets/296c4e39-763f-4c95-8bb4-c95c1e4edcfd)

<li><h4>Sign In</h4></li>
<p>Sign In page shows an image, has a link to the sign up if the user has yet to create an account and is also provided with an error message should I not have the details.</p>

![Sign in page](https://github.com/user-attachments/assets/0b2eb661-343d-4e2e-b8ce-2c75874e85d2)

<li><h4>Sign Up</h4></li>
<p>Sign Out page shows an image, has a link to the sign In if the user already has an account and is also provided with an error message should the details not match example being the passwords.</p>

![Sign Up](https://github.com/user-attachments/assets/917ba54e-6fb4-40b6-9108-33e9105f8cdf)


<p>The Contact Form is available for the user regardless if they are logged in. The form after the user has filled this out gets sent to both an email address and the admin panel. After the user has submitted the form they are then taken to a form submitted page, in this page it explains other ways for users to get in contact should they not here back</p>

![Contact Form](https://github.com/user-attachments/assets/b5697edb-47e3-40cc-9001-fa087b6dfbb1)

![Form Submitted](https://github.com/user-attachments/assets/5cd3ce82-3e45-4340-8c15-4d4a95799a78)


<li><h4>Create Posts</h4></li>
<p>Here is where the user can create a post and add a caption. Once the user has created their post they will have a message that says posts successful and be taken to the discover feed to see their posts being created. After that the post is then also add to the current users post list which is pretty much the same as the Following Feed but only shows their post.</p>

![Create Post](https://github.com/user-attachments/assets/097ff4e0-a2ef-410e-bad5-cd0781185bde)

<li><h4>Profile</h4></li>
<p>Here is where the user is taken to after they have either logged in or signed up. They can then edit their name, bio and location and they can also get an up to date count of how may users are either following the current user or how many the user the current user is following. The user is given a default image when they first sign up.</p>

![Edit Profile](https://github.com/user-attachments/assets/f07167f0-37fa-45a4-847d-e34e080ecde8)

![default image](https://github.com/user-attachments/assets/3f5f925d-7387-4978-9144-c55690f2fc7d)

<li><h4>Comments and Likes List</h4></li>
<p>I have a comments and like list, both pages will bring up all the posts you have ever liked or left a comment. From this as well you can look into which user did like the post by clicking on View Likes</p>

![Liked List](https://github.com/user-attachments/assets/360d1203-b3e1-40a3-afbd-a2732294a05d)

![Liked](https://github.com/user-attachments/assets/6a25fce7-8375-41f4-9040-9dad1d587b6e)

<li><h4>UsersPage</h4></li>
<p>The users page is just like the profile page for the current user but you see other users details. From here you will be able to view the posts that user has created and be able to follow or unfollow the user with the button updating when you click follow.</p>

![other users](https://github.com/user-attachments/assets/089f3413-21f5-4591-b214-b30c1d988ed3)

![other post list](https://github.com/user-attachments/assets/4aeaa63f-c53a-4947-9ed7-562f87b1d77d)

<li><h4>Followers and Following</h4></li>
<p>These pages are where the user is able to go into more detail in regards to who they are either following or who is following the current user. With a count that updates every time a user does get a new follower or is following someone else.</p>

![Followers Page](https://github.com/user-attachments/assets/ffa8e990-1227-42f7-8757-2d3ff9e9be31)

![Following](https://github.com/user-attachments/assets/97a6676b-9400-411f-81fa-48be3e77c3c4)

<li><h4>Delete Account</h4></li>
<p>This is where the user can delete their account should they no longer what their information on the app. By clicking on the button the user will get a prompt warning message just to double check they want to go ahead with this, once the user has confirmed all their images, comments, likes, followers, following and profile is deleted and then they are redirected to the sign in page.</p>

![Delete Post](https://github.com/user-attachments/assets/9abe4330-357e-48d4-852e-59ac65eae32b)

![delete message](https://github.com/user-attachments/assets/554d75f5-d1a9-44fb-ab24-af10066f5523)

<li><h4>NavBar</h4></li>
<p>Here is the Navbar that contains the search bar. When the user has logged in they can then access all the pages by clicking the dropdown menu.</p>

![Navbar - Signed out](https://github.com/user-attachments/assets/1c39b38f-4c82-435b-a3db-af280e53688a)

![Navbar - Signed in](https://github.com/user-attachments/assets/3e127c47-ae5d-45eb-b0d0-f3d678dd2a09)

</ul>
<h3>Agile</h3>
I used the github projects to manage the app whilst using the Agile Method. I created 16 user stories to explain what I need to add for me to create the app. You can (https://github.com/users/JoshRudge22/projects/7) to view them.

<h3>Database Schema</h3>
All the models have been set up in a separate DRF repository. Link backend read me to view the repository or link Heroku url to view the deployed API.

<h4>Create the Heroku App</h4>
<ul>
<li> Log in to Heroku or create an account.</li>
<li> On the main page click the button labelled New in the top right corner and from the drop-down menu select "Create New App".</li>
<li> Enter a unique and meaningful app name.</li>
<li> Next select your region.</li>
<li> Click on the Create App button</li>
In your GitPod workspace, create an env.py file in the main directory.
Add the DATABASE_URL value and your chosen SECRET_KEY value to the env.py file.
Update the settings.py file to import the env.py file and add the SECRETKEY and DATABASE_URL file paths.
Comment out the default database configuration.
Save files and make migrations.
Add the STATIC files settings - the url, storage path, directory path, root path, media url and default file storage path.
Link the file to the templates directory in Heroku.
Change the templates directory to TEMPLATES_DIR
Add Heroku to the ALLOWED_HOSTS list the format ['app_name.heroku.com', 'localhost']
</ul>

<h3>Connect React Frontend to the API backend</h3>
Once you have set up the workspace and done a basic deploy to Heroku, you can connect the react workspace to your API, in order to send data to the API

In the Heroku dashboard, go into the API application settings
In 'Settings' add a new Config Var called 'CLIENT_ORIGIN' and set that to the URL for your deployed React application. In my case, this would be [https://happening-react.herokuapp.com](https://frontend-project5-8507d8b525c6.herokuapp.com/).
Then add another Config Var called 'CLIENT_ORIGIN_DEV' and enter the URL of your Gitpod preview link, remembering to remove the trailing slash at the end. Gitpod occasionally changes this URL so keep an eye on it, as you are working on your project.
Go back into your frontend Gitpod workspace, and install the Axios library using the command 'npm install axios'.
Create a folder called 'API' and inside it create a file called 'axiosDefaults'.
import axios at the top of the file
Define your baseURL which is the unique URL of your deployed API project. In my case this would be https://api-backend-project-3eba949b1615.herokuapp.com/
Set the content-type header to multi-part/form-data as the API will need to deal with images as well as text in it's requests.
In order to avoid any CORS issues, set withCredentials to True.
Import this file into App.js to be used across all pages

<h3>Testing</h3>

![Am I](https://github.com/user-attachments/assets/d574db68-c39f-4bd9-b06c-185365c07bb8)

<p>Checked all CSS pages</p>

![CSS Vaildator](https://github.com/user-attachments/assets/89e2e739-17e9-4a65-bb74-74f2c39827b4)

<p>Checked the HTML page</p>
![HTML Vaildator](https://github.com/user-attachments/assets/619443b3-8d9b-4a33-b623-8ea4779ff034)

<p>Checked all pages with JS just came back about warnings for browser</p>

![image](https://github.com/user-attachments/assets/3aba9ee4-335b-4c1c-9693-59c6cbc39a8b)

<h3>Technologies Used - Frontend</h3>
<h4>Languages</h4>
<ul>
<li>HTML5 - Provides the content and structure for the website.</li>
<li>CSS3 - Provides the styling for the website. </li>
<li>JavaScript - Provides interactive elements of the website</li>
<li>React.js - Provides the base for the frontend components</li>
</ul>

<h3>Frameworks & Software</h3>
<ul>
  <li>React Bootstrap</li>
  <li>Responsive</li>
  <li>Github </li>
  <li>Lucidchart</li>
  <li>Cloudinary</li>
  <li>Google Chrome DevTools</li>
  <li>Shopify</li>
  <li>HTML Validation</li>
  <li>CSS Validation</li>
  <li>JSHint Validation</li>
</ul>


<h3>Credits</h3>
<ul>
  <li>Stack Overflow</li>
  <li>Code Institutes - Moments Walkthrough</li>
  <li>Code Institutes Tutors</li>
  <li>react-bootstrap</li>
  <li>react.dev</li>
  <li>Slack Community</li>
  <li>W3School</li>
  <li>My mentor Antonio</li>
</ul>
