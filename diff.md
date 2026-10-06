diff --git a/README.md b/README.md
index 0d638a1..2c4dbb1 100644
--- a/README.md
+++ b/README.md
@@ -5,9 +5,10 @@ This repository contains a professional portfolio website with separated fronten
 ## Repository structure
 
 - `frontend/`
-  - React + Vite portfolio application
+  - React + Vite portfolio application (public facing)
   - Public portfolio pages in `frontend/src/pages/`
-  - Admin portal pages in `frontend/src/admin/`
+- `frontend-admin/`
+  - React + Vite Admin dashboard application
 - `backend/`
   - Express API with authentication, project management, and message handling
 - `dist/`
@@ -17,9 +18,9 @@ This repository contains a professional portfolio website with separated fronten
 
 - `frontend/src/pages/`
   - Public portfolio pages: `Dashboard`, `About`, `Projects`, `Skills`, `Contact`, and more.
-- `frontend/src/admin/`
+- `frontend-admin/src/admin/`
   - Admin portal pages: `Login`, `Register`, `AdminDashboard`, `ManageProjects`, `ManageMessages`.
-- `frontend/src/layouts/`
+- `frontend*/src/layouts/`
   - Shared layout components for public pages and admin UI.
 
 ## Admin portal
@@ -48,6 +49,12 @@ Start frontend and backend together:
 npm run dev
 ```
 
+To start all three services (frontend, backend, AND the admin portal):
+
+```bash
+npm run dev:all
+```
+
 Seed the backend sample data and create the default admin user:
 
 ```bash
@@ -58,6 +65,7 @@ Or run individually:
 
 ```bash
 npm run dev:frontend
+npm run dev:admin
 npm run dev:backend
 ```
 
diff --git a/backend/package-lock.json b/backend/package-lock.json
index 0029f2c..edfd6f6 100644
--- a/backend/package-lock.json
+++ b/backend/package-lock.json
@@ -9,26 +9,27 @@
       "version": "1.0.0",
       "license": "ISC",
       "dependencies": {
+        "@types/bcrypt": "^6.0.0",
+        "@types/cors": "^2.8.19",
+        "@types/express": "^5.0.6",
+        "@types/jsonwebtoken": "^9.0.10",
+        "@types/multer": "^2.2.0",
+        "@types/node": "^26.1.2",
+        "@types/nodemailer": "^8.0.1",
         "bcrypt": "^6.0.0",
         "cloudinary": "^2.10.0",
         "cors": "^2.8.6",
         "dotenv": "^17.4.2",
         "express": "^5.2.1",
+        "express-rate-limit": "^8.7.0",
         "jsonwebtoken": "^9.0.3",
         "mongoose": "^9.9.0",
         "multer": "^2.2.0",
-        "nodemailer": "^9.0.3"
+        "nodemailer": "^9.0.3",
+        "typescript": "^7.0.2"
       },
       "devDependencies": {
-        "@types/bcrypt": "^6.0.0",
-        "@types/cors": "^2.8.19",
-        "@types/express": "^5.0.6",
-        "@types/jsonwebtoken": "^9.0.10",
-        "@types/multer": "^2.2.0",
-        "@types/node": "^26.1.2",
-        "@types/nodemailer": "^8.0.1",
-        "tsx": "^4.23.1",
-        "typescript": "^7.0.2"
+        "tsx": "^4.23.1"
       }
     },
     "node_modules/@esbuild/aix-ppc64": {
@@ -492,7 +493,6 @@
       "version": "6.0.0",
       "resolved": "https://registry.npmjs.org/@types/bcrypt/-/bcrypt-6.0.0.tgz",
       "integrity": "sha512-/oJGukuH3D2+D+3H4JWLaAsJ/ji86dhRidzZ/Od7H/i8g+aCmvkeCc6Ni/f9uxGLSQVCRZkX2/lqEFG2BvWtlQ==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*"
@@ -502,7 +502,6 @@
       "version": "1.19.6",
       "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
       "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/connect": "*",
@@ -513,7 +512,6 @@
       "version": "3.4.38",
       "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
       "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*"
@@ -523,7 +521,6 @@
       "version": "2.8.19",
       "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
       "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*"
@@ -533,7 +530,6 @@
       "version": "5.0.6",
       "resolved": "https://registry.npmjs.org/@types/express/-/express-5.0.6.tgz",
       "integrity": "sha512-sKYVuV7Sv9fbPIt/442koC7+IIwK5olP1KWeD88e/idgoJqDm3JV/YUiPwkoKK92ylff2MGxSz1CSjsXelx0YA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/body-parser": "*",
@@ -545,7 +541,6 @@
       "version": "5.1.2",
       "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-5.1.2.tgz",
       "integrity": "sha512-d3KvEXBSo/lOAMc2u6fkyDHBvetBHeqD7wm/AcXfLpSOQwlmG9D/aQ0SFswVjv05p7ullQS7Mjohj6/VdbZuTg==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*",
@@ -558,14 +553,12 @@
       "version": "2.0.5",
       "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
       "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/@types/jsonwebtoken": {
       "version": "9.0.10",
       "resolved": "https://registry.npmjs.org/@types/jsonwebtoken/-/jsonwebtoken-9.0.10.tgz",
       "integrity": "sha512-asx5hIG9Qmf/1oStypjanR7iKTv0gXQ1Ov/jfrX6kS/EO0OFni8orbmGCn0672NHR3kXHwpAwR+B368ZGN/2rA==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/ms": "*",
@@ -576,14 +569,12 @@
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/@types/ms/-/ms-2.1.0.tgz",
       "integrity": "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/@types/multer": {
       "version": "2.2.0",
       "resolved": "https://registry.npmjs.org/@types/multer/-/multer-2.2.0.tgz",
       "integrity": "sha512-3U1troeqGV8Ntp7Q3klwf4zr23VEoqYVocYXaswm9+8z3O9UHDYAqLxjJ/h550iRADTjKdOdhhasXw6gD6kYtg==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/express": "*"
@@ -593,7 +584,6 @@
       "version": "26.1.2",
       "resolved": "https://registry.npmjs.org/@types/node/-/node-26.1.2.tgz",
       "integrity": "sha512-Vu4a5UFA9rIIFJ7rB/Vaafh9lrCQszopTCx6KjFboXTGQbPNasehVR5TEiithSDGyd1DEiUByggTZsg8jukeIg==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "undici-types": "~8.3.0"
@@ -603,7 +593,6 @@
       "version": "8.0.1",
       "resolved": "https://registry.npmjs.org/@types/nodemailer/-/nodemailer-8.0.1.tgz",
       "integrity": "sha512-PxpaInm8V1JQDd4j0ds5HfvWQk8JupS1C0Picb96QJsrrRDjBH+DlK7L4ZdNSqNULhiZRQHc40nLVShaGxXAMw==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*"
@@ -613,21 +602,18 @@
       "version": "6.15.1",
       "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.15.1.tgz",
       "integrity": "sha512-GZHUBZR9hckSUhrxmp1nG6NwdpM9fCunJwyThLW1X3AyHgd9IlHb6VANpQQqDr2o/qQp6McZ3y/IA2rVzKzSbw==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/@types/range-parser": {
       "version": "1.2.7",
       "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
       "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/@types/send": {
       "version": "1.2.1",
       "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
       "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/node": "*"
@@ -637,7 +623,6 @@
       "version": "2.2.0",
       "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-2.2.0.tgz",
       "integrity": "sha512-8mam4H1NHLtu7nmtalF7eyBH14QyOASmcxHhSfEoRyr0nP/YdoesEtU+uSRvMe96TW/HPTtkoKqQLl53N7UXMQ==",
-      "dev": true,
       "license": "MIT",
       "dependencies": {
         "@types/http-errors": "*",
@@ -666,7 +651,6 @@
       "cpu": [
         "ppc64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -683,7 +667,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -700,7 +683,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -717,7 +699,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -734,7 +715,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -751,7 +731,6 @@
       "cpu": [
         "arm"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -768,7 +747,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -785,7 +763,6 @@
       "cpu": [
         "loong64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -802,7 +779,6 @@
       "cpu": [
         "mips64el"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -819,7 +795,6 @@
       "cpu": [
         "ppc64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -836,7 +811,6 @@
       "cpu": [
         "riscv64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -853,7 +827,6 @@
       "cpu": [
         "s390x"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -870,7 +843,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -887,7 +859,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -904,7 +875,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -921,7 +891,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -938,7 +907,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -955,7 +923,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -972,7 +939,6 @@
       "cpu": [
         "arm64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -989,7 +955,6 @@
       "cpu": [
         "x64"
       ],
-      "dev": true,
       "license": "Apache-2.0",
       "optional": true,
       "os": [
@@ -1429,6 +1394,25 @@
         "url": "https://opencollective.com/express"
       }
     },
+    "node_modules/express-rate-limit": {
+      "version": "8.7.0",
+      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-8.7.0.tgz",
+      "integrity": "sha512-hOwV7WOxXfjRpAM1DSJWZDXx3GhplwD8IfwuwvogD8i1Qnkgosw/H45s4ZnFAUHDAhPjlY9hLBvJhKmGMyY26g==",
+      "license": "MIT",
+      "dependencies": {
+        "debug": "^4.4.3",
+        "ip-address": "^10.2.0"
+      },
+      "engines": {
+        "node": ">= 16"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/express-rate-limit"
+      },
+      "peerDependencies": {
+        "express": ">= 4.11"
+      }
+    },
     "node_modules/finalhandler": {
       "version": "2.1.1",
       "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
@@ -1607,6 +1591,15 @@
       "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
       "license": "ISC"
     },
+    "node_modules/ip-address": {
+      "version": "10.7.3",
+      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.7.3.tgz",
+      "integrity": "sha512-A1kdq/tSb5QjvKvAMgIoEvDBIgL7qaqVP/jkvSwYYRZ9iEzvPpopxp2wQfu3SuZRHtpHNxMn8Fs0bS+gf5Xmwg==",
+      "license": "MIT",
+      "engines": {
+        "node": ">= 12"
+      }
+    },
     "node_modules/ipaddr.js": {
       "version": "1.9.1",
       "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
@@ -2432,7 +2425,6 @@
       "version": "7.0.2",
       "resolved": "https://registry.npmjs.org/typescript/-/typescript-7.0.2.tgz",
       "integrity": "sha512-8FYau96o3NKOhbjKi/qNvG/W5jhzxkbdm5sj9AbZ/5T5sWqn3hJgLfGx27sRKZWTvyzCP8dLRBTf5tBTSRVUNA==",
-      "dev": true,
       "license": "Apache-2.0",
       "bin": {
         "tsc": "bin/tsc"
@@ -2467,7 +2459,6 @@
       "version": "8.3.0",
       "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-8.3.0.tgz",
       "integrity": "sha512-j375ScV60dom+YkPFIfTLcOiPxkN/buHz5GobjLhixFuANaNs3C9l4GmrWqejgXWJ7BbJcFYpTEUkS1Ge8bpZQ==",
-      "dev": true,
       "license": "MIT"
     },
     "node_modules/unpipe": {
diff --git a/backend/package.json b/backend/package.json
index 431fb1d..3e16e46 100644
--- a/backend/package.json
+++ b/backend/package.json
@@ -27,6 +27,7 @@
     "cors": "^2.8.6",
     "dotenv": "^17.4.2",
     "express": "^5.2.1",
+    "express-rate-limit": "^8.7.0",
     "jsonwebtoken": "^9.0.3",
     "mongoose": "^9.9.0",
     "multer": "^2.2.0",
@@ -36,4 +37,4 @@
   "devDependencies": {
     "tsx": "^4.23.1"
   }
-}
\ No newline at end of file
+}
diff --git a/backend/src/controllers/authController.ts b/backend/src/controllers/authController.ts
index 7fa655a..0d2a2ff 100644
--- a/backend/src/controllers/authController.ts
+++ b/backend/src/controllers/authController.ts
@@ -35,11 +35,14 @@ export const registerUser = async (req: Request, res: Response): Promise<void> =
     return;
   }
 
+  const userCount = await User.countDocuments();
+  const isFirstUser = userCount === 0;
+
   const user = await User.create({
     name,
     email,
     password,
-    isAdmin: true, // First user is admin for portfolio setup
+    isAdmin: isFirstUser, // First user is admin, others are regular users
   });
 
   if (user) {
diff --git a/backend/src/controllers/mediaController.ts b/backend/src/controllers/mediaController.ts
index c48374b..b8ebb8a 100644
--- a/backend/src/controllers/mediaController.ts
+++ b/backend/src/controllers/mediaController.ts
@@ -18,18 +18,28 @@ export const getMedia = async (req: Request, res: Response): Promise<void> => {
 
 export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
   try {
-    const { fileUrl, folder } = req.body;
-    if (!fileUrl) {
+    const file = req.file;
+    const { folder } = req.body;
+    
+    if (!file) {
       res.status(400).json({ message: 'No file provided' });
       return;
     }
 
-    const result = await cloudinary.uploader.upload(fileUrl, {
-      folder: folder || 'portfolio',
-    });
+    const uploadStream = cloudinary.uploader.upload_stream(
+      { folder: folder || 'portfolio' },
+      (error, result) => {
+        if (error) {
+          console.error(error);
+          return res.status(500).json({ message: 'Cloudinary upload failed' });
+        }
+        res.json(result);
+      }
+    );
 
-    res.json(result);
+    uploadStream.end(file.buffer);
   } catch (error) {
+    console.error(error);
     res.status(500).json({ message: 'Server Error' });
   }
 };
diff --git a/backend/src/controllers/messageController.ts b/backend/src/controllers/messageController.ts
index 306931a..2a4d158 100644
--- a/backend/src/controllers/messageController.ts
+++ b/backend/src/controllers/messageController.ts
@@ -22,7 +22,11 @@ export const sendMessage = async (req: Request, res: Response): Promise<void> =>
 // @route   GET /api/messages
 // @access  Private/Admin
 export const getMessages = async (req: Request, res: Response): Promise<void> => {
-  const messages = await Message.find({}).sort({ createdAt: -1 });
+  const page = Number(req.query.page) || 1;
+  const limit = 20;
+  const skip = (page - 1) * limit;
+
+  const messages = await Message.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
   res.json(messages);
 };
 
diff --git a/backend/src/controllers/projectController.ts b/backend/src/controllers/projectController.ts
index 7f982b1..54f5b6f 100644
--- a/backend/src/controllers/projectController.ts
+++ b/backend/src/controllers/projectController.ts
@@ -5,7 +5,11 @@ import Project from '../models/Project';
 // @route   GET /api/projects
 // @access  Public
 export const getProjects = async (req: Request, res: Response): Promise<void> => {
-  const projects = await Project.find({}).sort({ createdAt: -1 });
+  const page = Number(req.query.page) || 1;
+  const limit = 20;
+  const skip = (page - 1) * limit;
+
+  const projects = await Project.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
   res.json(projects);
 };
 
diff --git a/backend/src/routes/mediaRoutes.ts b/backend/src/routes/mediaRoutes.ts
index a3eb322..ae4f51b 100644
--- a/backend/src/routes/mediaRoutes.ts
+++ b/backend/src/routes/mediaRoutes.ts
@@ -1,14 +1,17 @@
 import express from 'express';
+import multer from 'multer';
 import { getMedia, uploadMedia, deleteMedia } from '../controllers/mediaController';
 import { protect, admin } from '../middlewares/authMiddleware';
 
 const router = express.Router();
 
+const upload = multer({ storage: multer.memoryStorage() });
+
 router.route('/')
   .get(protect, admin, getMedia);
 
 router.route('/upload')
-  .post(protect, admin, uploadMedia);
+  .post(protect, admin, upload.single('file'), uploadMedia);
 
 router.delete('/*path', protect, admin, deleteMedia);
 
diff --git a/backend/src/routes/messageRoutes.ts b/backend/src/routes/messageRoutes.ts
index 8fa6b23..b79fa15 100644
--- a/backend/src/routes/messageRoutes.ts
+++ b/backend/src/routes/messageRoutes.ts
@@ -1,12 +1,19 @@
 import express from 'express';
+import rateLimit from 'express-rate-limit';
 import { sendMessage, getMessages, markMessageAsRead } from '../controllers/messageController';
 import { protect, admin } from '../middlewares/authMiddleware';
 import { validateMessage } from '../middlewares/validationMiddleware';
 
 const router = express.Router();
 
+const messageLimiter = rateLimit({
+  windowMs: 15 * 60 * 1000, // 15 minutes
+  max: 5, // Limit each IP to 5 requests per windowMs
+  message: { message: 'Too many messages sent from this IP, please try again after 15 minutes' }
+});
+
 router.route('/')
-  .post(validateMessage, sendMessage)
+  .post(messageLimiter, validateMessage, sendMessage)
   .get(protect, admin, getMessages);
 
 router.route('/:id/read')
diff --git a/frontend-admin/src/admin/MediaLibrary.tsx b/frontend-admin/src/admin/MediaLibrary.tsx
index d93e663..4ca94a8 100644
--- a/frontend-admin/src/admin/MediaLibrary.tsx
+++ b/frontend-admin/src/admin/MediaLibrary.tsx
@@ -5,7 +5,7 @@ import { Loader2, Copy, Trash2, UploadCloud, Image as ImageIcon } from 'lucide-r
 export const MediaLibrary: React.FC = () => {
   const [media, setMedia] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
-  const [uploadUrl, setUploadUrl] = useState('');
+  const [fileInput, setFileInput] = useState<File | null>(null);
   const [isUploading, setIsUploading] = useState(false);
   const [filter, setFilter] = useState('all');
 
@@ -26,11 +26,19 @@ export const MediaLibrary: React.FC = () => {
 
   const handleUpload = async (e: React.FormEvent) => {
     e.preventDefault();
-    if (!uploadUrl) return;
+    if (!fileInput) return;
     setIsUploading(true);
     try {
-      await api.post('/media/upload', { fileUrl: uploadUrl, folder: 'portfolio' });
-      setUploadUrl('');
+      const formData = new FormData();
+      formData.append('file', fileInput);
+      formData.append('folder', 'portfolio');
+      
+      await api.post('/media/upload', formData, {
+        headers: {
+          'Content-Type': 'multipart/form-data',
+        },
+      });
+      setFileInput(null);
       fetchMedia();
     } catch (error) {
       console.error(error);
@@ -80,10 +88,10 @@ export const MediaLibrary: React.FC = () => {
       </div>
 
       <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
-        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UploadCloud size={20} /> Upload from URL</h3>
-        <form onSubmit={handleUpload} className="flex gap-4">
-          <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)} placeholder="https://example.com/image.png" required className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
-          <button type="submit" disabled={isUploading} className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shrink-0">
+        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UploadCloud size={20} /> Upload Image</h3>
+        <form onSubmit={handleUpload} className="flex gap-4 items-center">
+          <input type="file" accept="image/*" onChange={(e) => setFileInput(e.target.files ? e.target.files[0] : null)} required className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
+          <button type="submit" disabled={isUploading || !fileInput} className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shrink-0">
             {isUploading ? <Loader2 className="animate-spin" size={18} /> : 'Upload'}
           </button>
         </form>
