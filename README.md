Blog App (Next.js + JSON Server)
A simple blog application built with Next.js (App Router) and JSON Server.
You can create, edit, delete, and view blogs. Images are stored in Base64 format.
Features
Add new blog
Edit existing blog
Delete blog with animation + toast message
View blog details
Responsive blog cards
JSON Server as backend
Dynamic routes
Toast notifications
Clean UI
Tech Stack
Next.js 14
React 18
JSON Server
Axios
react-hot-toast


app/
  page.js                → Home page
  blogCard/BlogCard.js   → Blog list + edit/delete
  [BlogDetails]/page.js  → Blog details page
  CreateNewBlog/page.js  → Create/Edit blog form
db.json                  → JSON Server database



How the App Works

Home Page → Shows all blogs

Create Blog → Add title, description, image

Edit Blog → Loads blog details using query ?id=

Delete Blog → Shows confirmation + toast + animation

Blog Details Page → Server component, displays full blog

Future Enhancements

Pagination

Search / filters

Categories

Rich text editor

Dark mode

License

Free to use for learning and projects.
