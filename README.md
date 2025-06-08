hostelmate/
├── .github/
│   └── workflows/
│       └── main.yml  (for CI/CD with AWS deployment)
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.js  (database config, JWT secrets, etc.)
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── studentController.js
│   │   │   ├── adminController.js
│   │   │   └── complaintController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  (JWT verification)
│   │   │   └── roleMiddleware.js  (authorization based on roles)
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── studentModel.js
│   │   │   ├── roomModel.js
│   │   │   ├── roomPreferenceModel.js
│   │   │   ├── allotmentModel.js
│   │   │   └── complaintModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── complaintRoutes.js
│   │   ├── utils/
│   │   │   ├── authUtils.js  (password hashing, JWT generation)
│   │   │   ├── validationUtils.js  (Express-validator/Joi schemas)
│   │   │   └── allocationLogic.js  (FCFS, Merit-Based logic)
│   │   ├── app.js  (Express application setup)
│   │   └── server.js  (entry point)
│   ├── .env  (environment variables for backend)
│   ├── package.json
│   ├── package-lock.json
│   └── README.md  (Backend specific README)
├── frontend/
│   ├── public/
│   │   └── images/  (for profile pictures, etc. if not using S3 directly in frontend)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.js
│   │   │   │   └── register/page.js
│   │   │   ├── (student)/
│   │   │   │   ├── dashboard/page.js
│   │   │   │   ├── profile/page.js
│   │   │   │   ├── rooms/page.js
│   │   │   │   ├── preferences/page.js
│   │   │   │   ├── allotment/page.js
│   │   │   │   └── complaints/page.js
│   │   │   ├── (admin)/
│   │   │   │   ├── dashboard/page.js
│   │   │   │   ├── rooms/page.js
│   │   │   │   ├── students/page.js
│   │   │   │   ├── allocations/page.js
│   │   │   │   └── complaints/page.js
│   │   │   ├── api/  (for Next.js API routes if any, though most API calls go to backend)
│   │   │   ├── layout.js  (Root layout)
│   │   │   └── page.js  (Home page)
│   │   ├── components/
│   │   │   ├── ui/  (Shadcn UI components, customized)
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   └── Navbar.js
│   │   │   ├── student/
│   │   │   │   ├── RoomCard.js
│   │   │   │   └── ComplaintForm.js
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboardMetrics.js
│   │   │   │   └── AllocationForm.js
│   │   ├── lib/
│   │   │   ├── api.js  (API client for backend calls)
│   │   │   ├── auth.js  (client-side auth utilities)
│   │   │   └── utils.js  (general utilities)
│   │   ├── styles/
│   │   │   └── globals.css  (Tailwind CSS imports and custom styles)
│   │   └── hooks/
│   │       └── useAuth.js
│   ├── .env.local  (environment variables for frontend)
│   ├── next.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── README.md  (Frontend specific README)
├── docs/
│   ├── database_schema.png  (Visual representation of the PostgreSQL database schema) 
│   └── api_endpoints.md  (Detailed API documentation)
├── .env.example  (example for all environment variables)
├── .gitignore
├── package.json  (Root package.json for workspace management if using Yarn/NPM workspaces)
├── README.md  (Main project README, comprehensive as per deliverables) 